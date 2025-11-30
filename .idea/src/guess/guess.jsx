import React, { useState, useEffect } from 'react';
import CharSearch from './charSearch';
import getDailyChar from './dailyChar';
import characters from "./character_data.json"
import "./guess.css"
import { AuthState } from '../login/authState';
import { GameEvent, GameNotifier } from '../notifier';


export function Guess({ authState }) {
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(null);
  const [celebEmoji, setCelebEmoji] = React.useState(null);

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
    try {
      getScore("/api/scores");
    } catch (err) {
      console.error('Error in /scores:', err);
      res.status(500).send({ msg: 'Server error' });
    }

  }, []);

  const findCharacterByName = (name) => {
    return characters.find(c => c.name === name);
  };

  const handleGuess = (name) => {
    if (gameOver) return;
    const dailyChar = getDailyChar();

    const guessedCharacter = findCharacterByName(name);
    if (!guessedCharacter) return;

    if (guessedCharacter.name === dailyChar.name) {
      setGameOver(true);
      sendScore("/api/score");
      alert(`${celebEmoji} Congratulations! ${celebEmoji}`);
    }
    if (guesses.length >= 4) {
      setGameOver(true);
    }
    const color = {
      name: guessedCharacter.name === dailyChar.name ? 'green' : 'red',
      school: guessedCharacter.school === dailyChar.school ? 'green' : 'red',
      position: guessedCharacter.position === dailyChar.position ? 'green' : 'red',
      number: guessedCharacter.number === dailyChar.number ? 'green' : (Number(dailyChar.number) > Number(guessedCharacter.number) ? 'lightblue' : 'yellow')
    };


    setGuesses(prevGuesses => [{ character: guessedCharacter, color }, ...prevGuesses]);

  };

  async function sendScore(endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ score: guesses.length + 1, type: "guess" }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.changed) {
        GameNotifier.broadcastEvent(data.userName, GameEvent.Highscore, guesses.length+1);
        setHighScore(data.highScore);
        console.log('hello');
      }
    } else {
      console.error('Failed to send score', response.status)
    }
  }

  async function getScore(endpoint) {
    const url = new URL(endpoint, window.location.origin);
    url.searchParams.append('type', 'guess')
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
      <div className="box">
        <h1 style={{ marginTop: "15px" }}>HAIKYUUDLE</h1>
        <h2>Guessing</h2>
        <h2>Eric Jensen</h2>
        <p><a href="https://github.com/Sc1borg/startup/">GitHub repo</a></p>
        {authState === AuthState.Authenticated && (<div>High Score: {highScore} </div>)}
      </div>
      <main>
        <div className="categories"><CharSearch onGuess={handleGuess} /></div>
        <span className="categories">
          <div className="id">Photo</div>
          <div className="id">Name</div>
          <div className="id">School</div>
          <div className="id">Position</div>
          <div className="id">Number</div>
        </span>
      </main>
      <div>
        {/* display the guesses with the highest one being most recent */}
        {guesses.length > 0 ? guesses.map((guess, index) => (
          <div key={index} className="guess" style={{ display: 'flex', marginBottom: '10px' }}>
            {/* The little boxes represent the individual parts of the character data.
            I created a "correctness pair" that allows me to remember which pieces were correct even as 
            I move on to new guesses */}
            <div className="littlebox" style={{ backgroundColor: guess.color.name }}>
              <img src={guess.character.photo} alt={guess.character.name} style={{ height: "90%", width: "90%", borderRadius: "15px" }} />
            </div>
            {/* The name and photo use the same check because they should always be the same */}
            <div className="littlebox" style={{ backgroundColor: guess.color.name }}>
              {guess.character.name}
            </div>
            {/* Right now, I only have one schoool, so this will always be green */}
            <div className="littlebox" style={{ backgroundColor: guess.color.school }}>
              {guess.character.school}
            </div>
            {/* This one probably gives you the most information. Everything else is rather unique */}
            <div className="littlebox" style={{ backgroundColor: guess.color.position }}>
              {guess.character.position}
            </div>
            {/* With this one the blue and yellow might be a bit confusing, I'll need to add an explanation thingybob */}
            <div className="littlebox" style={{ backgroundColor: guess.color.number }}>
              {guess.character.number}
              {guess.color.number === 'green' ? "" : guess.color.number === 'lightblue' ? "\n ↑↑" : "\n ↓↓"}
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
}