import React, { useState } from 'react';
import "./emoji.css";
import CharSearch from "../guess/charSearch";
import getDailyChar from "../guess/dailyChar";
import characters from "../guess/character_data.json";

export function Emoji() {
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const findCharacterByName = (name) => {
    return characters.find(c => c.name === name);
  };

  const handleGuess = (name) => {
    if (gameOver) return;
    const dailyCharName = getDailyChar();
    const dailyChar = findCharacterByName(dailyCharName);

    const guessedCharacter = findCharacterByName(name);
    if (!guessedCharacter) return;

    if (guessedCharacter.name === dailyCharName) {
      setGameOver(true);
      alert("Congratulations");
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
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Statistics(placeholder)</a>
      </div>
      <div className='categories'>
        <div className='emoji'>🐦‍⬛</div>
        <div className='emoji'>🏐</div>
        <div className='emoji'>🍙</div>
        <div className='emoji'>🚲</div>
      </div>

      <div className="categories"><CharSearch onGuess={handleGuess} /></div>
      <div className="guesses">
        {guesses.length > 0 && guesses.map((guess, index) => (
            <div className="littlebox" style={{ backgroundColor: guess.correctness.name ? 'green' : 'red' }}>
              <img src={guess.character.photo} alt={guess.character.name} width="50" />
          </div>
        ))}
      </div>
    </div>
  );
}