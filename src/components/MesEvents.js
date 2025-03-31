import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuHorizontal from "./MenuHorizontal";
import MenuVertical from "./MenuVertical";
import { useNavigate } from "react-router-dom";

function MesEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [participants, setParticipants] = useState([]); // Ajoute un état pour les participants
  const navigate = useNavigate();

  // Fonction pour récupérer les événements depuis le backend
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Aucun token trouvé. L'utilisateur doit être connecté.");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/client/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des événements.");
      console.error("Erreur :", err);
    }
  };

  // Charger les événements au montage du composant
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fonction pour récupérer les participants de l'événement
  const fetchParticipants = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Aucun token trouvé. L'utilisateur doit être connecté.");
        return;
      }

      // Envoi de la requête GET pour récupérer les participants de l'événement
      const response = await axios.get(`http://localhost:8080/api/client/events/${eventId}/participants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setParticipants(response.data); // Stocke les participants dans l'état
      console.log(response.data); // Affiche les participants dans la console (utile pour déboguer)
    } catch (err) {
      setError("Erreur lors du chargement des participants.");
      console.error("Erreur :", err);
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/events/${eventId}/edit`); // Redirige vers la page de modification de l'événement
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Aucun token trouvé. L'utilisateur doit être connecté.");
        return;
      }

      // Envoi de la requête POST pour supprimer l'événement
      await axios.post(
        "http://localhost:8080/api/client/events/delete",
        { id: eventId }, // Envoi l'ID de l'événement dans le body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Mise à jour de la liste des événements après suppression
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (err) {
      setError("Erreur lors de la suppression de l'événement.");
      console.error("Erreur :", err);
    }
  };

  // Fonction pour voir les participants d'un événement
  const handleViewParticipants = (eventId) => {
    fetchParticipants(eventId); // Appel la fonction fetchParticipants pour récupérer les participants
    navigate(`/events/${eventId}/participants`); // Redirige vers la page des participants
  };

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

        {/* Section principale avec le tableau des événements */}
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Mes Événements</h4>
            </div>
            <div className="card-body">
              {/* Afficher un message d'erreur s'il y en a */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Vérifier si les événements existent et les afficher dans un tableau */}
              {events && events.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Date</th>
                      <th>Lieu</th>
                      <th>Catégorie</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td>{event.title}</td>
                        <td>{event.date.split("T")[0]}</td> {/* Format de la date */}
                        <td>{event.location}</td>
                        <td>{event.category?.name}</td>
                        <td>
                          {/* Boutons d'action Modifier, Supprimer et Voir les participants */}
                          <button
                            className="btn btn-warning mr-2"
                            onClick={() => handleEdit(event.id)}
                          >
                            Modifier
                          </button>
                          <button
                            className="btn btn-danger mr-2"
                            onClick={() => handleDelete(event.id)}
                          >
                            Supprimer
                          </button>
                          <button
                            className="btn btn-info"
                            onClick={() => handleViewParticipants(event.id)}
                          >
                            Voir les participants
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Vous n'avez pas encore créé d'événements.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MesEvents;
