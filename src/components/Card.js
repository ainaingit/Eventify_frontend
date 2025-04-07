// src/components/Card.js
import React from 'react';
import { Link } from 'react-router-dom';

function Card({ event }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
        <img
          src={event.images[0] || "https://via.placeholder.com/300"}
          className="card-img-top"
          alt={event.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-primary">{event.title}</h5>
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
        <div className="card-footer text-center">
          {/* Lien vers les détails de l'événement avec passage de l'événement dans le state */}
          <Link
  to={`/event/${event.id}`}
  state={{ event }} // Passage de l'objet event dans l'état
  className="btn btn-primary w-100"
>
  Voir
</Link>

        </div>
      </div>
    </div>
  );
}

export default Card;
