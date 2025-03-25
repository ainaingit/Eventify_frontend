import React from "react";
import MenuHorizontal from "./MenuHorizontal";
import MenuVertical from "./MenuVertical";
import Card from "./Card"; // Import du composant Card

export default function MesParticipations() {
  const tableau = [
    {
      title: "Conférence React",
      date: "2025-04-10",
      description: "Apprenez les dernières nouveautés de React.",
      images: ["https://via.placeholder.com/300"],
      location: "Paris",
      category: { name: "Développement Web" },
      organizer: { username: "TechEvents" }
    },
    {
      title: "Hackathon",
      date: "2025-05-20",
      description: "Un hackathon pour créer des projets innovants.",
      images: ["https://via.placeholder.com/300"],
      location: "Lyon",
      category: { name: "Innovation" },
      organizer: { username: "HackersTeam" }
    }
  ];

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

        {/* Section principale avec les cartes d'événements */}
        <div className="col-md-9 p-4">
          <h2 className="text-xl font-bold mb-4">Mes Participations</h2>
          <div className="row">
            {tableau.length > 0 ? (
              tableau.map((event, index) => <Card key={index} event={event} />)
            ) : (
              <p>Aucune participation trouvée.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
