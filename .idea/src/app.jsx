import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Emoji } from './emoji/emoji';
import { Guess } from './guess/guess';
import { Quote } from './quote/quote';
import { Wordle } from './wordle/wordle';
import { Login } from './login/login';
import { AuthState } from './login/authState';
import { Players } from './players';
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
            <div><NavLink className="buttonheaderbutton" to="login">{authState === AuthState.Authenticated ? (`${userName}`) : ("Login")}</NavLink></div>
          </div>
        </nav>
      </header>
      <div className="body">
        <main><Routes>
          <Route path='/' element={
            <Guess
              authState={authState}
            />}
            exact />
          <Route path='/wordle' element={
            <Wordle
              authState={authState}
            />}
          />
          <Route path='/quote' element={
            <Quote
              authState={authState}
            />}
          />
          <Route path='/emoji' element={
            <Emoji
              authState={authState}
            />}
          />
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
        <footer><Players userName={userName} /></footer>
      </div>
    </BrowserRouter>);
}
function NotFound() {
  return <main className="box">404: Return to sender. Address unknown.</main>;
}