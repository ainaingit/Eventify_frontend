// src/App.js
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Accueil from './components/Accueil';
import './App.css';
import EventCalendar from './components/EventCalendar';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/event-calendar" element={<EventCalendar />} />
        <Route path="/search-events" element={<Search />} /> {/* Route pour Search Events */}
        {/* Ajoute d'autres routes ici */}
      </Routes>
      
    </div>
  );
}

export default App;
