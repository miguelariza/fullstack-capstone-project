import React from 'react';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                {/* Brand */}
                <a className="navbar-brand" href="#">
                    <i className="bi bi-gift"></i> GiftLink
                </a>

                {/* Toggler for mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="/home.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/app">Gifts</a>
                        </li>
                    </ul>

                    {/* Search Button */}
                    <a href="/app/search" className="btn btn-search">Search</a>
                </div>
            </div>
        </nav>
    );
}
