import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom"
import './authenticated.css'

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('username');
        props.onLogout();
    }

    return (
        <div>
            <div className='playerName'>{props.userName}</div>
            <Button variant='primary' onClick={() => navigate('/')}>Main</Button>
            <Button variant='secondary' onClick={() => logout()}>Logout</Button>
        </div>
    )
}