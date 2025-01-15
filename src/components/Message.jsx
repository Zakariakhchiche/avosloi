import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart, FaPhone, FaEnvelope, FaBuilding, FaGavel } from 'react-icons/fa';
import LawyerRating from './LawyerRating';

const Message = ({ message }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (lawyer) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === lawyer.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== lawyer.id);
      } else {
        return [...prevFavorites, { ...lawyer, rating: 0 }];
      }
    });
  };

  // Extraction des informations des avocats du message
  const lawyers = [];
  if (message.role === 'assistant' && message.content) {
    const lines = message.content.split('\n');
    let currentLawyer = null;

    for (const line of lines) {
      if (line.startsWith('AVOCAT')) {
        if (currentLawyer) {
          lawyers.push(currentLawyer);
        }
        currentLawyer = { id: lawyers.length + 1 };
      } else if (currentLawyer) {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          const key = line.substring(0, colonIndex).trim().toLowerCase();
          const value = line.substring(colonIndex + 1).trim();
          
          switch (key) {
            case 'nom et prénom':
              currentLawyer.name = value;
              break;
            case 'cabinet':
              currentLawyer.cabinet = value;
              break;
            case 'spécialité principale':
              currentLawyer.speciality = value;
              break;
            case 'téléphone':
              currentLawyer.phone = value;
              break;
            case 'email':
              currentLawyer.email = value;
              break;
            case 'langues parlées':
              currentLawyer.languages = value;
              break;
            case 'honoraires':
              currentLawyer.honoraires = value;
              break;
          }
        }
      }
    }
    if (currentLawyer) {
      lawyers.push(currentLawyer);
    }
  }

  return (
    <div className={`chat ${message.role === 'assistant' ? 'chat-start' : 'chat-end'}`}>
      <div className={`chat-bubble shadow-lg p-6`}>
        <div className="prose prose-lg max-w-none">
          {message.role === 'user' ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            <>
              {message.content.includes('Analyse des besoins') ? (
                <div className="analyse-section">
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )}
            </>
          )}
        </div>
        {message.role === 'assistant' && lawyers.length > 0 && (
          <div className="mt-8 space-y-8 divide-y divide-neutral/20">
            {lawyers.map((lawyer) => (
              <div key={lawyer.id} className="pt-6 first:pt-0">
                <div className="bg-base-200 p-6 rounded-xl shadow-md border border-neutral/20">
                  {/* En-tête avec nom et bouton favori */}
                  <div className="flex justify-between items-center border-b border-neutral/20 pb-4">
                    <h3 className="text-xl font-bold text-neutral">{lawyer.name}</h3>
                    <button
                      onClick={() => toggleFavorite(lawyer)}
                      className="btn btn-ghost btn-circle"
                    >
                      {favorites.some(fav => fav.id === lawyer.id) ? (
                        <FaHeart className="text-red-500 text-xl" />
                      ) : (
                        <FaRegHeart className="text-neutral text-xl" />
                      )}
                    </button>
                  </div>

                  {/* Informations principales */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {lawyer.cabinet && (
                        <div className="flex items-center gap-4">
                          <div className="bg-neutral/10 p-3 rounded-xl">
                            <FaBuilding className="text-neutral text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral/70">Cabinet</p>
                            <p className="text-base font-semibold text-neutral">{lawyer.cabinet}</p>
                          </div>
                        </div>
                      )}
                      {lawyer.speciality && (
                        <div className="flex items-center gap-4">
                          <div className="bg-neutral/10 p-3 rounded-xl">
                            <FaGavel className="text-neutral text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral/70">Spécialité</p>
                            <p className="text-base font-semibold text-neutral">{lawyer.speciality}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {lawyer.phone && (
                        <div className="flex items-center gap-4">
                          <div className="bg-neutral/10 p-3 rounded-xl">
                            <FaPhone className="text-neutral text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral/70">Téléphone</p>
                            <p className="text-base font-semibold text-neutral">{lawyer.phone}</p>
                          </div>
                        </div>
                      )}
                      {lawyer.email && (
                        <div className="flex items-center gap-4">
                          <div className="bg-neutral/10 p-3 rounded-xl">
                            <FaEnvelope className="text-neutral text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral/70">Email</p>
                            <a href={`mailto:${lawyer.email}`} className="text-base font-semibold hover:text-primary">
                              {lawyer.email}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Informations supplémentaires */}
                  <div className="mt-6 pt-6 border-t border-neutral/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {lawyer.languages && (
                        <div className="bg-base-100 p-4 rounded-lg">
                          <p className="text-sm font-semibold text-neutral/70 mb-2">Langues parlées</p>
                          <p className="text-base font-semibold text-neutral">{lawyer.languages}</p>
                        </div>
                      )}
                      {lawyer.honoraires && (
                        <div className="bg-base-100 p-4 rounded-lg">
                          <p className="text-sm font-semibold text-neutral/70 mb-2">Honoraires</p>
                          <p className="text-base font-semibold text-neutral">{lawyer.honoraires}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Note */}
                  <div className="mt-6 pt-6 border-t border-neutral/20">
                    <p className="text-sm font-semibold text-neutral/70 mb-3">Note</p>
                    <LawyerRating
                      lawyerId={lawyer.id}
                      initialRating={favorites.find(f => f.id === lawyer.id)?.rating || 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
