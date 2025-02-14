// FavoriteLawyers.jsx
import { useState, useEffect } from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import LawyerRating from './LawyerRating';

const FavoriteLawyers = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteLawyers');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.length > 0 ? (
        favorites.map((lawyer) => (
          <div key={lawyer.id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h3 className="card-title">{lawyer.name}</h3>
                <button onClick={() => setFavorites(favorites.filter(l => l.id !== lawyer.id))} className="btn btn-ghost btn-circle">
                  <FaTrash className="text-red-500" />
                </button>
              </div>
              <p className="text-sm text-gray-600">{lawyer.speciality}</p>
              <p className="text-sm">{lawyer.cabinet}</p>
              <LawyerRating lawyerId={lawyer.id} initialRating={lawyer.rating} onRate={(id, rating) => {
                setFavorites(favorites.map(l => l.id === id ? { ...l, rating } : l));
              }} />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-6 bg-base-200 rounded-lg">
          <FaHeart className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-600">Aucun favori enregistré.</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteLawyers;