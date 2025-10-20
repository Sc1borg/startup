import React from 'react';
import CharSearch from './charSearch';

export function Guess() {
  return (
    <div>
    <div className="box">
    <header>
      <h1>HAIKYUUDLE</h1>
      <h2>Guessing</h2>
      <h2>Eric Jensen</h2>
      <p><a href = "https://github.com/Sc1borg/startup/">GitHub repo</a></p>
      <a href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ">Statistics(placeholder)</a>
    </header>
    </div>
    <main>
    <span className = "categories">
      <div className="id">Photo</div>
      <div className="id">Name</div>
      <div className="id">School</div>
      <div className="id">Position</div>
      <div className="id">Number</div>
    </span>
    </main>
    <div className = "categories"><CharSearch /></div>
    <div className = "guess">
      <div className= "littlebox"><img src = "https://s3-alpha.figma.com/hub/file/1067843952/a3ababe3-969e-49f4-b3cb-6acbb724368d-cover.png" width = "100px" border-radius = '20px'></img></div>
      <div className= "littlebox">Hinata Shoyo</div>
      <div className= "littlebox">Karasuno High</div>
      <div className= "littlebox">Middle Blocker</div>
      <div className= "littlebox">10</div>
    </div>
    </div>
  );
}