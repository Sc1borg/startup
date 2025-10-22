import React, { useEffect, useState } from 'react';
import "./wordle.css"
import getDailyChar from './dailyChar';
import { characters } from './dailyChar';

export function Wordle() {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const boxesCounter = React.useRef({});
  const boxSize = 60;
  const dailyCharName = getDailyChar();
  const numLetters = dailyCharName.length;
  const [won, setWon] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (won) return;
      if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
        const letter = event.key.toUpperCase();
        const boxCounter = boxesCounter.current[`${currentRow}-${currentCol}`];
        if (boxCounter) {
          boxCounter.textContent = letter;
        }
        if (currentCol < numLetters) {
          setCurrentCol(currentCol + 1);
        }
      }
      if (event.key === 'Backspace') {
        if (currentCol > 0) {
          setCurrentCol(currentCol - 1);
          const newCol = currentCol - 1;
          const boxCounter = boxesCounter.current[`${currentRow}-${newCol}`];
          if (boxCounter) {
            boxCounter.textContent = null;
          }
        }


      }
      if (event.key === 'Enter' && currentCol === numLetters) {
        const rowLetters = [];
        for (let col = 0; col < numLetters; col++) {
          const boxCounter = boxesCounter.current[`${currentRow}-${col}`];
          if (boxCounter) {
            rowLetters.push(boxCounter.textContent);
          }
        }
        const word = rowLetters.join('');
        if (characters.includes(word.toLowerCase())) {
          handleGuess(word)
          setCurrentRow(currentRow + 1);
          setCurrentCol(0);
        }
        else {
          console.log("Invalid Guess");
        }
      }
    };

    const findCharacterByName = (name) => {
      return characters.find(c => c === name);
    };

    const handleGuess = (name) => {
      if (name.toLowerCase() === dailyCharName) {
        setWon(true);
        alert("Congratulations!");
      }
      for (let i = 0; i < name.length; i++) {
        const boxRef = boxesCounter.current[`${currentRow}-${i}`];
        if (boxRef) {
          if (name[i].toLowerCase() === dailyCharName[i]) {
            boxRef.style.backgroundColor = 'green';
          } else if (dailyCharName.includes(name[i].toLowerCase())) {
            boxRef.style.backgroundColor = 'yellow';
          } else {
            boxRef.style.backgroundColor = 'gray';
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentRow, currentCol]);



  return (
    <div>
      <div className="box">
        <h1>HAIKYUUDLE</h1>
        <h2>Wordle</h2>
        <h2>Eric Jensen</h2>
        <p><a href="https://github.com/Sc1borg/startup/">GitHub repo</a></p>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Statistics(placeholder)</a>
      </div>
      <div className='wordle' style={{ width: `${boxSize * numLetters}px` }}>
        {Array(6).fill().map((_, rowIndex) => (
          <div className='wordleRow' key={rowIndex}>
            {Array(numLetters).fill().map((_, colIndex) => (
              <div
                key={colIndex}
                className='wordleBox'
                style={{ fontSize: "20px", display: "flex", fontWeight: "bold", justifyContent: "center", alignItems: "center" }}
                ref={(el) => (boxesCounter.current[`${rowIndex}-${colIndex}`] = el)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}