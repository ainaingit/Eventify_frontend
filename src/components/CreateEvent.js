import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateEventForm = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxParticipants: '',
    categoryId: '',
    images: [],  // Liste des images
  });

  const [categories, setCategories] = useState([]);
  const [organizerId, setOrganizerId] = useState(null);
  const [imageError, setImageError] = useState('');  // Message d'erreur pour les images

  // Récupérer la liste des catégories depuis l'API
  useEffect(() => {
    const token = localStorage.getItem('token');  // Récupérer le token JWT
    if (token) {
      axios.get('http://localhost:8080/api/event_categorie', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setCategories(response.data);  // Assurez-vous que la réponse contient les catégories
        })
        .catch(error => {
          console.error('Erreur lors du chargement des catégories:', error);
        });
    } else {
      console.log('Token non trouvé');
    }
  }, []);


  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  // Gestion du changement des fichiers (images)
  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    // Vérification du nombre d'images téléchargées
    if (selectedImages.length + event.images.length > 5) {
      setImageError('Vous ne pouvez télécharger que 5 images maximum.');
    } else {
      setImageError('');
      setEvent({
        ...event,
        images: [...event.images, ...selectedImages],  // Ajouter les nouvelles images à l'état
      });
    }
  };

  // Soumission du formulaire pour créer un événement
  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = new FormData();
    
    // Ajout des données de l'événement (JSON)
    eventData.append('event', new Blob([JSON.stringify({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      maxParticipants: event.maxParticipants ? parseInt(event.maxParticipants) : null,
      category: { id: event.categoryId },
      organizerId: organizerId,
    })], { type: 'application/json' }));
    
    // Ajout des images
    event.images.forEach((image) => {
      eventData.append('images', image);
    });

    // Envoi des données au backend via POST
    axios.post('http://localhost:8080/api/client/events/events-with-image', eventData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        console.log('Événement créé avec succès:', response.data);
        // Réinitialisation du formulaire après la soumission
        setEvent({
          title: '',
          description: '',
          date: '',
          location: '',
          maxParticipants: '',
          categoryId: '',
          images: [],
        });
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'événement:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Créer un événement</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            {/* Section des champs du formulaire */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Titre de l'événement</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={event.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={event.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date de l'événement</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                className="form-control"
                value={event.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">Lieu</label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-control"
                value={event.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="maxParticipants" className="form-label">Nombre maximum de participants</label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                className="form-control"
                value={event.maxParticipants}
                onChange={handleChange}
              />
            </div>

            {/* Sélection de la catégorie */}
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">Catégorie</label>
              <select
                id="categoryId"
                name="categoryId"
                className="form-control"
                value={event.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-4">
            {/* Section des images */}
            <div className="mb-3">
              <label htmlFor="images" className="form-label">Télécharger des images (jusqu'à 5)</label>
              <input
                type="file"
                id="images"
                name="images"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              {imageError && <div className="text-danger mt-2">{imageError}</div>}
              {event.images.length > 0 && (
                <div className="mt-3">
                  <h6>Images sélectionnées :</h6>
                  <div className="d-flex flex-wrap">
                    {event.images.map((image, index) => (
                      <div key={index} className="p-2">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
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
  );
};

export default CreateEventForm;
