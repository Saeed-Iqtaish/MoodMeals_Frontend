import React from 'react';

function CommunityRecipeImage({ recipe, className = '' }) {
  if (!recipe?.image_data) {
    return null;
  }

  const imageUrl = `${import.meta.env.VITE_API_URL}/community/${recipe.id}/image`;

  return (
    <div className={`recipe-image-container ${className}`}>
      <img
        src={imageUrl}
        alt={recipe.title}
        className="recipe-image"
        onError={(e) => {
          console.error('Error loading recipe image:', e.target.src);
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
}

export default CommunityRecipeImage;