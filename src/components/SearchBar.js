// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState(''); // Nouveau champ pour la location
  const [description, setDescription] = useState(''); // Nouveau champ pour la description

  const handleSubmit = (e) => {
    e.preventDefault();

    // Préparer l'objet des filtres pour l'envoyer au composant parent
    const filters = {
      date,
      genre,
      location,
      description
    };

    // Appeler la fonction onSearch passée en prop
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column flex-md-row align-items-start mb-4">
      <div className="form-group mb-3 mb-md-0 mr-md-3 w-100">
        <label htmlFor="date" className="mr-2">Date</label>
        <input
          type="date"
          id="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group mb-3 mb-md-0 mr-md-3 w-100">
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

      <div className="form-group mb-3 mb-md-0 mr-md-3 w-100">
        <label htmlFor="location" className="mr-2">Location</label>
        <input
          type="text"
          id="location"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., New York"
        />
      </div>

      <div className="form-group mb-3 mb-md-0 mr-md-3 w-100">
        <label htmlFor="description" className="mr-2">Description</label>
        <input
          type="text"
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A fun music concert"
        />
      </div>

      <div className="d-flex justify-content-center mt-3 mt-md-0">
        <button type="submit" className="btn btn-primary w-100 w-md-auto">Search</button>
      </div>
    </form>
  );
}

export default SearchBar;
