import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const LawyerRating = ({ lawyerId, initialRating = 0, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);

  const handleRate = (currentRating) => {
    setRating(currentRating);
    if (onRate) {
      onRate(lawyerId, currentRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name={`rating-${lawyerId}`}
              value={ratingValue}
              className="hidden"
              onClick={() => handleRate(ratingValue)}
            />
            <FaStar
              className="transition-colors duration-200"
              color={ratingValue <= (hover || rating) ? "#fbbf24" : "#64748b"}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      {rating > 0 && (
        <span className="text-sm font-medium text-base-content ml-2">
          {rating}/5
        </span>
      )}
    </div>
  );
};

LawyerRating.propTypes = {
  lawyerId: PropTypes.string.isRequired,
  initialRating: PropTypes.number,
  onRate: PropTypes.func,
};

export default LawyerRating;
