// src/components/Accueil.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importer axios
import MenuHorizontal from './MenuHorizontal';
import MenuVertical from './MenuVertical';
import SearchBar from './SearchBar';

function Accueil() {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // Pour stocker tous les événements récupérés

  // Fonction pour récupérer les événements depuis le backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/client/events', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajout du token d'authentification
        },
      });
      setAllEvents(response.data); // Stocke tous les événements dans l'état
      setFilteredEvents(response.data); // Initialiser les événements filtrés avec tous les événements
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Effectuer la récupération des événements lors du chargement du composant
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle search functionality
  const handleSearch = (filters) => {
    console.log("Search filters:", filters);

    const filtered = allEvents.filter(event => {
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
            {filteredEvents.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Genre</th>
                    <th>Event Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map(event => (
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>{event.date}</td>
                      <td>{event.genre}</td>
                      <td>{event.eventType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No events found based on the filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
