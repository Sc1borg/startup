import React, { useState } from 'react';
import "./quote.css";
import getDailyQuote from './dailyQuote';
import quotes from "../guess/character_data.json"
import CharSearch from '../guess/charSearch';
import { AuthState } from '../login/authState';
import { GameNotifier, GameEvent } from '../notifier';

export function Quote({ authState }) {
  const quote = getDailyQuote()
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
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
    getScore("/api/scores");
  }, []);

  const findCharacterByName = (name) => {
    return quotes.find(c => c.name === name);
  };

  const handleGuess = (name) => {
    if (gameOver) return;

    const guessedCharacter = findCharacterByName(name);
    if (!guessedCharacter) return;

    if (guessedCharacter.name === quote.name) {
      setGameOver(true);
      sendScore("/api/score");
      alert(`${celebEmoji} Congratulations! ${celebEmoji}`);
    }
    if (guesses.length >= 4) {
      setGameOver(true);
    }
    const correctness = {
      name: guessedCharacter.name === quote.name
    };

    setGuesses(prevGuesses => [{ character: guessedCharacter, correctness }, ...prevGuesses]);
  };

  async function sendScore(endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ score: guesses.length + 1, type: "quote" }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.changed) {
        GameNotifier.broadcastEvent(data.userName, GameEvent.Highscore, guesses.length+1, 'Quote');
        setHighScore(data.highScore);
      }
    } else {
      console.error('Failed to send score', response.status)
    }
  }

  async function getScore(endpoint) {
    const url = new URL(endpoint, window.location.origin);
    url.searchParams.append('type', 'quote')
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

  return (
    <div>
      <div className="bigBox">
        <h1>HAIKYUUDLE</h1>
        <h2>Quote</h2>
        <h2>Eric Jensen</h2>
        <p><a href="https://github.com/Sc1borg/startup">GitHub repo</a></p>
        {authState === AuthState.Authenticated && (<div>High Score: {highScore} </div>)}
        <p className='quote'>{quote.quote}</p>
      </div>
      <div className="categories"><CharSearch onGuess={handleGuess} /></div>
      <div className="guesses">
        {guesses.length > 0 && guesses.map((guess) => (
          <div className="littlebox" style={{ backgroundColor: guess.correctness.name ? 'green' : 'red' }}>
            <img src={guess.character.photo} alt={guess.character.name} style={{ height: "90%", width: "90%", borderRadius: "15px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}