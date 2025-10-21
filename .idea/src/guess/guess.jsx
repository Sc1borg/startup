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
  const [guessedChar, setGuessedChar] = useState(null);


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

    setGuessedChar(guessedCharacter);

    setNameRes(guessedCharacter.name === dailyChar.name ? 'green' : 'red')
    setSchoolRes(guessedCharacter.school === dailyChar.school ? 'green' : 'red')
    setPosRes(guessedCharacter.position === dailyChar.position ? 'green' : 'red')
    setNumRes(guessedCharacter.number === dailyChar.number ? 'green' : 'red')

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
      {guessedChar ? (
        <>
      <div className="guess">
        <div className="littlebox"style={{backgroundColor:nameRes}}>{guessedChar.photo}</div>
        <div className="littlebox"style={{backgroundColor:nameRes}}>{guessedChar.name}</div>
        <div className="littlebox"style={{backgroundColor:schoolRes}}>{guessedChar.school}</div>
        <div className="littlebox"style={{backgroundColor:posRes}}>{guessedChar.position}</div>
        <div className="littlebox"style={{backgroundColor:numRes}}>{guessedChar.number}</div>
      </div>
      </>
      ) : (null)}
    </div>
  );
}