// src/components/Card.js
import React from 'react';

function Card({ event }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow">
        <img
          src={event.images[0] || "https://via.placeholder.com/300"}
          className="card-img-top"
          alt={event.title}
        />
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text">{event.description || "Aucune description disponible."}</p>
          <p className="card-text">
            <small className="text-muted">Date : {new Date(event.date).toLocaleDateString()}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">Lieu : {event.location}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">Catégorie : {event.category?.name}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">Organisateur : {event.organizer?.username}</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
