import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, className = '' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className="text-yellow-500 fill-current" />
      ))}
      {/* Note: lucide-react doesn't have a half-star, so we simulate or just round for now. Here we'll just use a full star if there's a fraction. */}
      {hasHalfStar && <Star size={16} className="text-yellow-500 fill-current" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300 fill-current" />
      ))}
    </div>
  );
};

export default Rating;
