import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Emoji } from './emoji/emoji';
import { Guess } from './guess/guess';
import { Quote } from './quote/quote';
import { Wordle } from './wordle/wordle';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body">
            <nav className ="topnav">
                <div><NavLink className='buttonheaderbutton' to='/'>Main</NavLink></div>
                <div><NavLink className="buttonheaderbutton" to="wordle">Wordle</NavLink></div>
                <div><NavLink className="buttonheaderbutton" to="quote">Quote</NavLink></div>
                <div><NavLink className="buttonheaderbutton" to="emoji">Emoji</NavLink></div>
                <div className = "login">
                    <input type="text" placeholder="Enter Username"/>
                    <input type="password" placeholder="Password"/>
                </div>
            </nav>
            <div className="box">
                <main><Routes>
                    <Route path='/' element={<Guess />} exact />
                    <Route path='/wordle' element={<Wordle />} />
                    <Route path='/quote' element={<Quote />} />
                    <Route path='/emoji' element={<Emoji />} />
                    <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        <footer><a className="footerlink" href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ">Real Time communication here</a></footer>
    </div>
  </BrowserRouter>);
}
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}