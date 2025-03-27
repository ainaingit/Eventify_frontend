import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        throw new Error('Échec de la connexion');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/accueil');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{
      background: 'url(https://source.unsplash.com/1600x900/?event,party) no-repeat center center/cover'
    }}>
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.9)' }}>
        <div className="text-center mb-4">
          <h3 className="text-primary">Gestion d'Événements</h3>
          <p className="text-muted">Connectez-vous pour gérer vos événements</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="fw-bold">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="fw-bold">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Se connecter</button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-1">Vous n'avez pas de compte ? <Link to="/register" className="text-primary">S'inscrire</Link></p>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;