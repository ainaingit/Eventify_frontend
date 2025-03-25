import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Participants() {
  const { eventId } = useParams(); // Récupérer l'ID de l'événement à partir de l'URL
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les participants de l'événement
  const fetchParticipants = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Aucun token trouvé. L'utilisateur doit être connecté.");
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/events/${eventId}/participants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setParticipants(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des participants.");
      console.error("Erreur :", err);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [eventId]);

  return (
    <div className="container mt-5">
      <h4>Participants pour l'événement {eventId}</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      {participants.length > 0 ? (
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun participant trouvé.</p>
      )}
    </div>
  );
}

export default Participants;
