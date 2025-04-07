import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function EventDetails() {
  const location = useLocation();
  const event = location.state?.event;

  if (!event) {
    return <div>Événement introuvable.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
        <img
          src={event.images[0] || "https://via.placeholder.com/600"}
          className="card-img-top"
          alt={event.title}
          style={{ height: '300px', objectFit: 'cover' }}
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
          <Link to="/events" className="btn btn-secondary w-100">
            Retour à la liste des événements
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
