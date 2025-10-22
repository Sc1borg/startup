import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Emoji } from './emoji/emoji';
import { Guess } from './guess/guess';
import { Quote } from './quote/quote';
import { Wordle } from './wordle/wordle';
import { Login } from './login/login';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  return (
    <BrowserRouter>
      <header>
        <nav className="topnav">
          <div><NavLink className='buttonheaderbutton' to='/'>Main</NavLink></div>
          <div><NavLink className="buttonheaderbutton" to="wordle">Wordle</NavLink></div>
          <div><NavLink className="buttonheaderbutton" to="quote">Quote</NavLink></div>
          <div><NavLink className="buttonheaderbutton" to="emoji">Emoji</NavLink></div>
          <div className="login">
            <div><NavLink className="buttonheaderbutton" to="login">User</NavLink></div>
          </div>
        </nav>
      </header>
      <div className="body">
        <main><Routes>
          <Route path='/' element={<Guess />} exact />
          <Route path='/wordle' element={<Wordle />} />
          <Route path='/quote' element={<Quote />} />
          <Route path='/emoji' element={<Emoji />} />
          <Route path='/login' element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </main>
        <footer><a className="footerlink" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Real Time communication here</a></footer>
      </div>
    </BrowserRouter>);
}
function NotFound() {
  return <main className="box">404: Return to sender. Address unknown.</main>;
}