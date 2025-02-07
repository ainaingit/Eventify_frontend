// src/components/Search.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuHorizontal from "./MenuHorizontal";
import MenuVertical from "./MenuVertical";
import SearchBar from "./SearchBar"; // Importer le composant SearchBar

function Search() {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // Pour stocker tous les événements récupérés

  // Fonction pour récupérer les événements depuis le backend
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Aucun token trouvé, l'utilisateur doit se connecter.");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/client/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Données reçues :", response.data);

      setAllEvents(response.data); // Stocke tous les événements dans l'état
      setFilteredEvents(response.data); // Initialise les événements filtrés avec tous les événements
    } catch (error) {
      console.error("Erreur lors du chargement des événements:", error);
    }
  };

  // Fonction pour gérer la recherche et filtrer les événements
  const handleSearch = (filters) => {
    const filtered = allEvents.filter(event => {
      return (
        (!filters.date || event.date === filters.date) &&
        (!filters.genre || event.genre.toLowerCase().includes(filters.genre.toLowerCase())) &&
        (!filters.eventType || event.eventType.toLowerCase().includes(filters.eventType.toLowerCase()))
      );
    });

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {/* Affichage du Menu Horizontal */}
      <MenuHorizontal />

      <div className="container mt-4">
        <div className="row">
          {/* Menu Vertical */}
          <div className="col-md-3">
            <MenuVertical />
          </div>

          {/* Section principale avec la recherche */}
          <div className="col-md-9">
            <div className="card shadow mb-4">
              
              <div className="card-body">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>

            {/* Affichage des événements filtrés */}
            <div className="mt-4">
              <h3>Événements Trouvés</h3>
              {filteredEvents.length > 0 ? (
                <div className="row">
                  {filteredEvents.map(event => (
                    <div className="col-md-4 mb-3" key={event.id}>
                      <div className="card shadow">
                        <div className="card-body">
                          <h5 className="card-title">{event.title}</h5>
                          <p className="card-text">
                            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}<br />
                            <strong>Lieu:</strong> {event.location}<br />
                            <strong>Catégorie:</strong> {event.category?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Aucun événement trouvé avec les filtres appliqués.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
