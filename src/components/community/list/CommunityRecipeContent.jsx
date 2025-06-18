import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import RecipeIngredients from '../../recipeDetails/RecipeIngredients';  // 🔧 FIX: Use display component
import RecipeInstructions from '../../recipeDetails/RecipeInstructions'; // 🔧 FIX: Use display component

function CommunityRecipeContent({ recipe }) {
  if (!recipe) {
    return (
      <div className="text-center p-4">
        <p className="text-muted">Recipe details loading...</p>
      </div>
    );
  }

  const ingredientsCount = recipe.ingredients?.length || 0;
  const instructionsCount = recipe.instructions?.length || 0;

  return (
    <Tabs defaultActiveKey="ingredients" className="recipe-tabs">
      <Tab 
        eventKey="ingredients" 
        title={`Ingredients (${ingredientsCount})`}
      >
        <div className="tab-content-area">
          <RecipeIngredients 
            recipeDetails={recipe}
            isCommunityRecipe={true}
          />
        </div>
      </Tab>

      <Tab 
        eventKey="instructions" 
        title={`Instructions (${instructionsCount})`}
      >
        <div className="tab-content-area">
          <RecipeInstructions 
            recipeDetails={recipe}
            isCommunityRecipe={true}
          />
        </div>
      </Tab>
    </Tabs>
  );
}

export default CommunityRecipeContent;