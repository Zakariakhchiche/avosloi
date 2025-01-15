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

  const removeFavorite = (lawyerId) => {
    const updatedFavorites = favorites.filter(lawyer => lawyer.id !== lawyerId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteLawyers', JSON.stringify(updatedFavorites));
  };

  const handleRating = (lawyerId, rating) => {
    const updatedFavorites = favorites.map(lawyer => 
      lawyer.id === lawyerId ? { ...lawyer, rating } : lawyer
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteLawyers', JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center p-6 bg-base-200 rounded-lg">
        <FaHeart className="mx-auto text-4xl text-gray-400 mb-4" />
        <p className="text-gray-600">Vous n'avez pas encore d'avocats favoris</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {favorites.map((lawyer) => (
        <div key={lawyer.id} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h3 className="card-title">{lawyer.name}</h3>
              <button
                onClick={() => removeFavorite(lawyer.id)}
                className="btn btn-ghost btn-circle btn-sm">
                <FaTrash className="text-red-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600">{lawyer.speciality}</p>
            <p className="text-sm">{lawyer.cabinet}</p>
            <div className="mt-2">
              <LawyerRating
                lawyerId={lawyer.id}
                initialRating={lawyer.rating}
                onRate={handleRating}
              />
            </div>
            <div className="card-actions justify-end mt-4">
              <a
                href={`mailto:${lawyer.email}`}
                className="btn btn-primary btn-sm">
                Contacter
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteLawyers;
