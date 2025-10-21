import React, { useState } from 'react';
import CharSearch from './charSearch';
import getDailyChar from './dailyChar';
import characters from "./character_data.json"
import "./guess.css"


export function Guess() {
  const [nameRes, setNameRes] = useState('');
  const [schoolRes, setSchoolRes] = useState('');
  const [posRes, setPosRes] = useState('');
  const [numRes, setNumRes] = useState('');
  const [guesses, setGuesses] = useState([]);

  const findCharacterByName = (name) => {
    return characters.find(c => c.name === name);
  };

  const handleGuess = (name) => {
    const dailyCharName = getDailyChar();
    const dailyChar = findCharacterByName(dailyCharName);

    const guessedCharacter = findCharacterByName(name);
    console.log(guessedCharacter.name);
    console.log(dailyChar === guessedCharacter);
    if (!guessedCharacter) return;

    const correctness = {
      name: guessedCharacter.name === dailyChar.name,
      school: guessedCharacter.school === dailyChar.school,
      position: guessedCharacter.position === dailyChar.position,
      number: guessedCharacter.number === dailyChar.number
    };

    setGuesses(prevGuesses => [{ character: guessedCharacter, correctness }, ...prevGuesses]);

  };

  return (
    <div>
      <div className="box">
        <header>
          <h1 style={{ marginTop: "15px" }}>HAIKYUUDLE</h1>
          <h2>Guessing</h2>
          <h2>Eric Jensen</h2>
          <p><a href="https://github.com/Sc1borg/startup/">GitHub repo</a></p>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Statistics(placeholder)</a>
        </header>
      </div>
      <main>
        <span className="categories">
          <div className="id">Photo</div>
          <div className="id">Name</div>
          <div className="id">School</div>
          <div className="id">Position</div>
          <div className="id">Number</div>
        </span>
      </main>
      <div className="categories"><CharSearch onGuess={handleGuess} /></div>
      <div>
        {guesses.length > 0 && guesses.map((guess, index) => (
          <div key={index} className="guess" style={{ display: 'flex', marginBottom: '10px' }}>
            <div className="littlebox" style={{ backgroundColor: guess.correctness.name ? 'green' : 'red' }}>
              <img src={guess.character.photo} alt={guess.character.name} width="50" />
            </div>
            <div className="littlebox" style={{ backgroundColor: guess.correctness.name ? 'green' : 'red' }}>
              {guess.character.name}
            </div>
            <div className="littlebox" style={{ backgroundColor: guess.correctness.school ? 'green' : 'red' }}>
              {guess.character.school}
            </div>
            <div className="littlebox" style={{ backgroundColor: guess.correctness.position ? 'green' : 'red' }}>
              {guess.character.position}
            </div>
            <div className="littlebox" style={{ backgroundColor: guess.correctness.number ? 'green' : 'red' }}>
              {guess.character.number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}