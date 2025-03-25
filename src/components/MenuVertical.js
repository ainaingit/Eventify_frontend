// src/components/MenuVertical.js
import React from 'react';
import { Link } from 'react-router-dom';

function MenuVertical() {
  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ height: '100vh' }}>
      <h3>Eventify</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/create-event">Create Event</Link> {/* Ajout de Create Event */}
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/manage-events">Manage Events</Link> {/* Ajout de Manage Events */}
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/suggestions">Suggestions</Link> {/* Ajout de Suggestions */}
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/mesparticipations">Je participe</Link> {/* Ajout de Suggestions */}
        </li>
        
      </ul>
    </div>
  );
}

export default MenuVertical;
