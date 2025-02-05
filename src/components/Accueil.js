// src/components/Accueil.js
import React, { useState } from 'react';
import MenuHorizontal from './MenuHorizontal';
import MenuVertical from './MenuVertical';
import SearchBar from './SearchBar';

function Accueil() {
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Handle search functionality
  const handleSearch = (filters) => {
    console.log("Search filters:", filters);

    // Exemple : List of events (this can come from API or DB)
    const events = [
      { id: 1, name: 'Music Concert', date: '2025-05-15', genre: 'Music', eventType: 'Concert' },
      { id: 2, name: 'Tech Conference', date: '2025-06-20', genre: 'Technology', eventType: 'Conference' },
      // Add more events...
    ];

    const filtered = events.filter(event => {
      return (
        (!filters.date || event.date === filters.date) &&
        (!filters.genre || event.genre.toLowerCase().includes(filters.genre.toLowerCase())) &&
        (!filters.eventType || event.eventType.toLowerCase().includes(filters.eventType.toLowerCase()))
      );
    });

    setFilteredEvents(filtered);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Horizontal Menu (Header or Navigation Bar) */}
        <div className="col-12">
          <MenuHorizontal />
        </div>
      </div>

      <div className="row mt-4">
        {/* Vertical Menu (Sidebar or Navigation) */}
        <div className="col-md-3">
          <MenuVertical />
        </div>

        {/* Right section: Search Bar and Accueil */}
        <div className="col-md-9">
          {/* Search Bar placed at the top of the right section */}
          <div className="row mt-4 justify-content-center">
            <div className="col-md-8">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Accueil Section */}
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-header bg-info text-white">
                  <h4 className="mb-0">Accueil</h4>
                </div>
                <div className="card-body">
                  <p>Bienvenue sur la plateforme d'événements !</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtered Events */}
          <div className="mt-4">
            <h3>Filtered Events</h3>
            <ul>
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <li key={event.id}>
                    <h4>{event.name}</h4>
                    <p>{event.date} | {event.genre} | {event.eventType}</p>
                  </li>
                ))
              ) : (
                <p>No events found based on the filters.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
