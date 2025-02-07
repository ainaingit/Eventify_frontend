// src/components/Accueil.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importer axios
import MenuHorizontal from './MenuHorizontal';
import MenuVertical from './MenuVertical';
import Card from './Card'; // Importer le composant Card

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
        withCredentials: true,  // Si tu utilises des cookies, ajoute ceci
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

        {/* Right section: Accueil */}
        <div className="col-md-9">
          {/* Accueil Section */}
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-header bg-info text-white">
                  <h4 className="mb-0">Explorer les événements</h4>
                </div>
                <div className="card-body">
                  <p>Découvrez les événements disponibles sur la plateforme !</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtered Events */}
          <div className="row mt-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <Card key={event.id} event={event} /> // Afficher chaque événement sous forme de carte
              ))
            ) : (
              <p>Aucun événement trouvé.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
