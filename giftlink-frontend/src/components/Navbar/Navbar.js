import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {

    const { isLoggedIn, setIsLoggedIn, userName , setUserName } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const authTokenFromSession = sessionStorage.getItem('token');
        const nameFromSession = sessionStorage.getItem('name');

        if(authTokenFromSession && nameFromSession) {
            setIsLoggedIn(true);
            setUserName(nameFromSession);
        } else if (!authTokenFromSession && isLoggedIn) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('email');
            setIsLoggedIn(false);
        }
    }, [isLoggedIn, setIsLoggedIn, setUserName]);

    const handleLogout = (() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate('/app');
    });

    const profileSection = (() => {
        navigate('/app/profile');
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                {/* Brand */}
                <a className="navbar-brand" href="/app">
                    <i className="bi bi-gift"></i> GiftLink
                </a>

                {/* Toogle for mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar-links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/home.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/app">Gifts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/app/search">Search</a>
                        </li>
                        {isLoggedIn ? (
                                <>
                                <li className="nav-item">
                                    <span className="nav-link" style={{color: "black", cursor:"pointer"}} onClick={profileSection}>Welcome, {userName}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link login-btn" onClick={handleLogout}>Logout</button>
                                </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                    <a className="nav-link" href="/app/register">Register</a>
                                    </li>
                                    {/* Login */}
                                    <a href="/app/login" className="btn btn-search">Login</a>
                                </>                        
                            )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
