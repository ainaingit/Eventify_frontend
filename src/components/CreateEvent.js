import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuHorizontal from './MenuHorizontal';
import MenuVertical from './MenuVertical';

const CreateEventForm = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxParticipants: '',
    categoryId: '',
    images: [], 
  });

  const [categories, setCategories] = useState([]);
  const [organizerId, setOrganizerId] = useState(null);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      axios.get('http://localhost:8080/api/event_categorie', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setCategories(response.data))
        .catch(error => console.error('Erreur chargement des catégories:', error));
    }
  }, []);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length + event.images.length > 5) {
      setImageError('Vous ne pouvez télécharger que 5 images maximum.');
    } else {
      setImageError('');
      setEvent({ ...event, images: [...event.images, ...selectedImages] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = new FormData();
    
    eventData.append('event', new Blob([JSON.stringify({
      ...event,
      maxParticipants: event.maxParticipants ? parseInt(event.maxParticipants) : null,
      category: { id: event.categoryId },
      organizerId,
    })], { type: 'application/json' }));

    event.images.forEach((image) => {
      eventData.append('images', image);
    });

    axios.post('http://localhost:8080/api/client/events/events-with-image', eventData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        console.log('Événement créé:', response.data);
        alert('Événement créé avec succès !');
        setEvent({ title: '', description: '', date: '', location: '', maxParticipants: '', categoryId: '', images: [] });
      })
      .catch(error => console.error('Erreur création événement:', error));
  };

  return (
    <div className="container mt-5">
      {/* Menu horizontal en haut */}
      <MenuHorizontal />

      <div className="row mt-4">
        {/* Menu vertical à gauche */}
        <div className="col-md-3">
          <MenuVertical />
        </div>

        {/* Formulaire principal à droite */}
        <div className="col-md-9">
          <h2 className="text-center mb-4">Créer un événement</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                {/* Champs du formulaire */}
                <div className="mb-3">
                  <label className="form-label">Titre de l'événement</label>
                  <input type="text" name="title" className="form-control" value={event.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea name="description" className="form-control" value={event.description} onChange={handleChange} rows="4" required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Date de l'événement</label>
                  <input type="datetime-local" name="date" className="form-control" value={event.date} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Lieu</label>
                  <input type="text" name="location" className="form-control" value={event.location} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Nombre max de participants</label>
                  <input type="number" name="maxParticipants" className="form-control" value={event.maxParticipants} onChange={handleChange} />
                </div>

                {/* Sélection de la catégorie */}
                <div className="mb-3">
                  <label className="form-label">Catégorie</label>
                  <select name="categoryId" className="form-control" value={event.categoryId} onChange={handleChange} required>
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section des images */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Télécharger des images (max 5)</label>
                  <input type="file" name="images" className="form-control" accept="image/*" multiple onChange={handleFileChange} />
                  {imageError && <div className="text-danger mt-2">{imageError}</div>}

                  {/* Aperçu des images */}
                  {event.images.length > 0 && (
                    <div className="mt-3">
                      <h6>Images sélectionnées :</h6>
                      <div className="d-flex flex-wrap">
                        {event.images.map((image, index) => (
                          <div key={index} className="p-2">
                            <img src={URL.createObjectURL(image)} alt={image.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary">Créer l'événement</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventForm;
