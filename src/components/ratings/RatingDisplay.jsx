import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import StarRating from './StarRating';
import { ratingsAPI } from '../../services/api';

function RatingDisplay({ 
  recipeId, 
  isCommunityRecipe = false,
  size = 'xs',
  className = '',
  showOnHover = false 
}) {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState({ average: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(!showOnHover);

  useEffect(() => {
    if (recipeId && isCommunityRecipe && visible && isAuthenticated) {
      fetchRating();
    } else if (!isAuthenticated && isCommunityRecipe) {
      setRating({ average: 0, count: 0 });
    }
  }, [recipeId, isCommunityRecipe, visible, isAuthenticated]);

  const fetchRating = async () => {
    try {
      setLoading(true);
      const response = await ratingsAPI.getRating(recipeId);
      setRating({
        average: response.data.average_rating || 0,
        count: response.data.total_ratings || 0
      });
    } catch (error) {
      console.error('Error fetching rating:', error);
      setRating({ average: 0, count: 0 });
    } finally {
      setLoading(false);
    }
  };

  if (!isCommunityRecipe) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!loading && rating.count === 0 && !showOnHover) {
    return null;
  }

  const content = (
    <div className={`rating-display ${className}`}>
      {loading ? (
        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
          Loading...
        </div>
      ) : (
        <div className="d-flex align-items-center gap-1">
          <StarRating
            value={rating.average}
            readonly={true}
            size={size}
          />
          {rating.count > 0 && (
            <small className="text-muted">
              ({rating.count})
            </small>
          )}
        </div>
      )}
    </div>
  );

  if (showOnHover) {
    return (
      <div 
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {visible ? content : null}
      </div>
    );
  }

  return content;
}

export default RatingDisplay;