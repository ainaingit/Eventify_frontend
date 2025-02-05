// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const [eventType, setEventType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Préparer l'objet des filtres pour l'envoyer au composant parent
    const filters = {
      date,
      genre,
      eventType
    };

    // Appeler la fonction onSearch passée en prop
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center mb-4">
      <div className="form-group mr-3">
        <label htmlFor="date" className="mr-2">Date</label>
        <input
          type="date"
          id="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group mr-3">
        <label htmlFor="genre" className="mr-2">Genre</label>
        <input
          type="text"
          id="genre"
          className="form-control"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="e.g., Music"
        />
      </div>

      <div className="form-group mr-3">
        <label htmlFor="eventType" className="mr-2">Event Type</label>
        <input
          type="text"
          id="eventType"
          className="form-control"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          placeholder="e.g., Concert"
        />
      </div>

      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
}

export default SearchBar;
