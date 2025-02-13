import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuHorizontal from "./MenuHorizontal";
import MenuVertical from "./MenuVertical";

function MesEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

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

  // Fonction pour modifier un événement
  const handleEdit = (eventId) => {
    // Logique pour éditer l'événement, par exemple, rediriger vers un formulaire d'édition
    console.log("Modifier l'événement avec l'ID :", eventId);
  };

  // Fonction pour supprimer un événement
  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Aucun token trouvé. L'utilisateur doit être connecté.");
        return;
      }

      const response = await axios.delete(`http://localhost:8080/api/client/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Supprimer l'événement de l'état local après la suppression réussie
        setEvents(events.filter(event => event.id !== eventId));
        alert("Événement supprimé avec succès !");
      }
    } catch (err) {
      setError("Erreur lors de la suppression de l'événement.");
      console.error("Erreur :", err);
    }
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
                          {/* Boutons d'action Modifier et Supprimer */}
                          <button
                            className="btn btn-warning mr-2"
                            onClick={() => handleEdit(event.id)}
                          >
                            Modifier
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(event.id)}
                          >
                            Supprimer
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
