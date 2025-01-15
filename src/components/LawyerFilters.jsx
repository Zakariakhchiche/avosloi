import { useState } from 'react';
import PropTypes from 'prop-types';

const specialties = [
  "Droit du travail",
  "Droit des affaires",
  "Droit immobilier",
  "Droit pénal",
  "Droit de la famille",
  "Propriété intellectuelle",
  "Droit fiscal",
  "Droit des startups"
];

const cities = [
  "Paris",
  "Lyon",
  "Marseille",
  "Bordeaux",
  "Toulouse",
  "Lille",
  "Nantes",
  "Strasbourg"
];

const LawyerFilters = ({ onFilterChange }) => {
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
    onFilterChange({ specialty: e.target.value, city, priceRange });
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    onFilterChange({ specialty, city: e.target.value, priceRange });
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    onFilterChange({ specialty, city, priceRange: e.target.value });
  };

  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Spécialité</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={specialty}
            onChange={handleSpecialtyChange}
          >
            <option value="">Toutes les spécialités</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Ville</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={city}
            onChange={handleCityChange}
          >
            <option value="">Toutes les villes</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Budget (€/heure)</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={priceRange}
            onChange={handlePriceRangeChange}
          >
            <option value="">Tous les budgets</option>
            <option value="0-200">Moins de 200€</option>
            <option value="200-300">200€ - 300€</option>
            <option value="300-400">300€ - 400€</option>
            <option value="400+">Plus de 400€</option>
          </select>
        </div>
      </div>
    </div>
  );
};

LawyerFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default LawyerFilters;
