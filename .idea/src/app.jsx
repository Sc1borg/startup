import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div className="body">
        <nav className ="topnav">
            <div><a className="buttonheaderbutton" href ="index.html">Main</a></div>
            <div><a className="buttonheaderbutton" href = "wordle.html">Wordle</a></div>
            <div><a className="buttonheaderbutton" href = "quote.html">Quote</a></div>
            <div><a className="buttonheaderbutton">3rd Party Placeholder</a></div>
            <div className = "login">
                <input type="text" placeholder="Enter Username"/>
                <input type="password" placeholder="Password"/>
            </div>
        </nav>
        <div className="box">
            <header>
                <h1>HAIKYUUDLE</h1>
                <h2>Page Content goes here</h2>
                <h2>Eric Jensen</h2>
                <p><a href = "https://github.com/Sc1borg/startup">GitHub repo</a></p>
                <a href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ">Statistics(placeholder)</a>
            </header>
        </div>
    <footer><a className="footerlink" href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ">Real Time communication here</a></footer>
  </div>);
}