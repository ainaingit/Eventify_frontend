// src/components/Accueil.js
import React from 'react';

function Accueil() {
  // Récupère le token depuis le localStorage
  const token = localStorage.getItem('token');

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">Accueil</h4>
        </div>
        <div className="card-body">
          <p>Vous êtes connecté ! Voici votre token :</p>
          <pre>{token}</pre>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
