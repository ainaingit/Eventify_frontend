import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import MenuHorizontal from "./MenuHorizontal";
import MenuVertical from "./MenuVertical";

function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState(""); // Etat pour le message de succès ou d'erreur

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

      const formattedEvents = response.data.map(event => {
        if (!event.date) return null;

        return {
          title: event.title, // Nom de l'événement
          start: event.date.split("T")[0], // Transformer "2025-02-10T00:00:00" en "2025-02-10"
          description: `Lieu : ${event.location}, Catégorie : ${event.category?.name}`,
        };
      }).filter(event => event !== null);

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Erreur lors du chargement des événements:", error);
      setMessage("Erreur lors du chargement des événements."); // Message d'erreur
    }
  };

  
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mt-5">
      {/* Barre de navigation horizontale */}
      <div className="row">
        <div className="col-12">
          <MenuHorizontal />
        </div>
      </div>

      <div className="row mt-4">
        {/* Menu vertical (sidebar) */}
        <div className="col-md-3">
          <MenuVertical />
        </div>

        {/* Section principale avec le calendrier */}
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Calendrier des Événements</h4>
            </div>
            <div className="card-body">
              {/* Affichage du message de succès ou d'erreur */}
              {message && (
                <div
                  style={{
                    color: message.includes("Erreur") ? "red" : "green",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {message}
                </div>
              )}

              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events} // Affichage des événements
                eventContent={(info) => (
                  <div>
                    <b>{info.event.title}</b>
                    <p style={{ fontSize: "10px" }}>{info.event.extendedProps.description}</p>
                  </div>
                )}
                dateClick={(info) => alert(`Clique sur la date : ${info.dateStr}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCalendar;

// Dans ce composant EventCalendar, nous avons ajouté une fonction handleAddEvent pour ajouter un événement à la liste des événements. Cette fonction utilise axios.post pour envoyer une requête POST au backend avec les données de l'événement à créer. Si la requête réussit, nous ajoutons l'événement à la liste des événements et affichons un message de succès. Sinon, nous affichons un message d'erreur.