// src/components/MenuHorizontal.js
import React from 'react';
import { Link } from 'react-router-dom';

function MenuHorizontal() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Eventify</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* ms-auto pour aligner à droite */}
            <li className="nav-item">
              <Link className="nav-link" to="/event-calendar">Event Calendar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/event-feedback">Feedback & Reviews</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search-events">Search Events</Link> {/* Redirection vers Search */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">Log Out</Link> {/* Ajout de Log Out */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuHorizontal;
