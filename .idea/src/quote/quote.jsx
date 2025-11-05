import React, { useState } from 'react';
import "./quote.css";
import getDailyQuote from './dailyQuote';
import quotes from "../guess/character_data.json"
import CharSearch from '../guess/charSearch';

export function Quote() {
  const quote = getDailyQuote()
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
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

  return (
    <div>
      <div className="bigBox">
        <h1>HAIKYUUDLE</h1>
        <h2>Quote</h2>
        <h2>Eric Jensen</h2>
        <p><a href="https://github.com/Sc1borg/startup">GitHub repo</a></p>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Statistics(placeholder)</a>
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