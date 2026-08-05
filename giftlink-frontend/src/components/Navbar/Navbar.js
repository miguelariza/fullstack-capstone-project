import React from 'react';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                {/* Brand */}
                <a className="navbar-brand" href="#">
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
                            <a className="nav-link" href="/app/register">Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/app/search">Search</a>
                        </li>
                    </ul>

                    {/* Login */}
                    <a href="/app/login" className="btn btn-search">Login</a>
                </div>
            </div>
        </nav>
    );
}
