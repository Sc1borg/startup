import React, { useState } from 'react';
import "./emoji.css";
import CharSearch from "../guess/charSearch";
import getDailyChar from "../guess/dailyChar";
import characters from "../guess/character_data.json";
import regex from "emoji-regex"
import { AuthState } from '../login/authState';

export function Emoji({ authState }) {
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const dailyChar = getDailyChar();
  const [celebEmoji, setCelebEmoji] = React.useState(null);
  const [highScore, setHighScore] = React.useState(null);

  React.useEffect(() => {
    fetch("https://emojihub.yurace.pro/api/random/category/smileys-and-people")
      .then((response) => response.json())
      .then((data) => {
        const unicodeStr = data.unicode[0];
        const hexCode = unicodeStr.replace('U+', '');
        const codePoint = parseInt(hexCode, 16);
        setCelebEmoji(String.fromCodePoint(codePoint));
      })
      .catch();
    getScore("/api/scores")
  }, []);


  let reg = regex()
  let emojis = dailyChar.emoji.match(reg);

  const findCharacterByName = (name) => {
    return characters.find(c => c.name === name);
  };

  async function sendScore(endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ score: guesses.length + 1, type: "emoji" }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      const data = await response.json();
    } else {
      console.error('Failed to send score', response.status)
    }
  }

  async function getScore(endpoint) {
    const url = new URL(endpoint, window.location.origin);
    url.searchParams.append('type', 'emoji')
    const response = await fetch(url, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setHighScore(data.highScore);
    }
  }

  const handleGuess = (name) => {
    if (gameOver) return;


    const guessedCharacter = findCharacterByName(name);
    if (!guessedCharacter) return;

    if (guessedCharacter.name === dailyChar.name) {
      setGameOver(true);
      sendScore("/api/score");
      getScore("/api/scores");
      alert(`${celebEmoji} Congratulations! ${celebEmoji}`);
    }
    if (guesses.length >= 4) {
      setGameOver(true);
    }
    const correctness = {
      name: guessedCharacter.name === dailyChar.name
    };

    setGuesses(prevGuesses => [{ character: guessedCharacter, correctness }, ...prevGuesses]);
  };


  return (
    <div>
      <div className="box">
        <h1>HAIKYUUDLE</h1>
        <h2>Emoji</h2>
        <h2>Eric Jensen</h2>
        <p><a href="https://github.com/Sc1borg/startup/">GitHub repo</a></p>
        {authState === AuthState.Authenticated && (<div>High Score: {highScore} </div>)}
      </div>
      <div className='categories'>
        <div className='emoji'>{emojis[0]}</div>
        {guesses.length > 0 || gameOver ? <div className='emoji'>{emojis[1]}</div> : <div className='blank'><img src='https://d1n4g61i0rktvy.cloudfront.net/data/gallery/assets/hidden-clue.webp'></img></div>}
        {guesses.length > 1 || gameOver ? <div className='emoji'>{emojis[2]}</div> : <div className='blank'><img src='https://d1n4g61i0rktvy.cloudfront.net/data/gallery/assets/hidden-clue.webp'></img></div>}
        {guesses.length > 2 || gameOver ? <div className='emoji'>{emojis[3]}</div> : <div className='blank'><img src='https://d1n4g61i0rktvy.cloudfront.net/data/gallery/assets/hidden-clue.webp'></img></div>}
      </div>

      <div className="categories"><CharSearch onGuess={handleGuess} /></div>
      <div className="guesses">
        {guesses.length > 0 && guesses.map((guess, index) => (
          <div className="littlebox" style={{ backgroundColor: guess.correctness.name ? 'green' : 'red' }}>
            <img src={guess.character.photo} alt={guess.character.name} style={{ height: "90%", width: "90%", borderRadius: "15px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}