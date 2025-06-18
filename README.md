# MoodMeals Frontend

A modern React application for discovering recipes that match your mood and dietary preferences. Built with **Vite**, **React 18**, and **Bootstrap 5**.

---

## Project Structure

```
src/
├── components/           
│   ├── admin/           
│   │   ├── AdminApprovalControls.jsx
│   │   ├── AdminHeader.jsx
│   │   ├── AdminPendingRecipes.jsx
│   │   ├── AdminRecipeCard.jsx
│   │   ├── AdminRecipeList.jsx
│   │   └── AdminStats.jsx
│   ├── auth/            
│   │   ├── AuthModal.jsx
│   │   ├── LoginButton.jsx
│   │   ├── LoginForm.jsx
│   │   ├── LogoutButton.jsx
│   │   ├── Profile.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── SignupForm.jsx
│   ├── community/       
│   │   ├── list/
│   │   │   ├── CommunityControls.jsx
│   │   │   ├── CommunityHeader.jsx
│   │   │   ├── CommunityRecipeContent.jsx
│   │   │   ├── CommunityRecipeHeader.jsx
│   │   │   ├── CommunityRecipeImage.jsx
│   │   │   ├── CommunityRecipeMeta.jsx
│   │   │   ├── CommunityRecipeNavigation.jsx
│   │   │   ├── CreateRecipeForm.jsx
│   │   │   ├── CreateRecipeModal.jsx
│   │   │   └── RecipeNotes.jsx
│   │   └── shared/
│   │       ├── EditRecipeModal.jsx
│   │       ├── RecipeDetails.jsx
│   │       ├── RecipeIngredientsList.jsx
│   │       ├── RecipeInstructionsList.jsx
│   │       └── RecipeMoodSelector.jsx
│   ├── favorites/       
│   │   ├── FavoritesControls.jsx
│   │   ├── FavoritesHeader.jsx
│   │   └── RecipeNotesModal.jsx
│   ├── filterPanel/     
│   │   ├── AllergySelector.jsx
│   │   ├── DietSelector.jsx
│   │   ├── FilterModal.jsx
│   │   └── MoodSelector.jsx
│   ├── global/          
│   │   ├── FavoriteButton.jsx
│   │   ├── Footer.jsx
│   │   ├── MoodBadge.jsx
│   │   ├── Navbar.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeDetails.jsx
│   │   ├── RecipeList.jsx
│   │   ├── SearchBar.jsx
│   │   └── SearchFilterControls.jsx
│   ├── ratings/         
│   │   ├── RatingDisplay.jsx
│   │   ├── RecipeRating.jsx
│   │   └── StarRating.jsx
│   ├── recipeDetails/   
│   │   ├── RecipeDescription.jsx
│   │   ├── RecipeHeader.jsx
│   │   ├── RecipeIngredients.jsx
│   │   ├── RecipeInstructions.jsx
│   │   ├── RecipeMeta.jsx
│   │   ├── RecipeNotes.jsx
│   │   └── RecipeNutrition.jsx
│   └── account/         
│       ├── recipes/
│       │   └── MyRecipes.jsx
│       └── settings/
│           ├── AccountInfoCard.jsx
│           ├── DietaryRestrictionsCard.jsx
│           └── ProfileSettingsForm.jsx
├── contexts/            
│   └── AuthContext.jsx  
├── hooks/               
│   ├── useAdminRecipes.js
│   ├── useCommunityRecipe.js
│   ├── useHomeModals.js
│   ├── useMoodAssignment.js
│   ├── useRecipeFilters.js
│   ├── useRecipeInteractions.js
│   ├── useRecipeNotes.js
│   └── useUserProfile.js
├── pages/               
│   ├── AccountPage.jsx
│   ├── AdminPage.jsx
│   ├── AdminCommunityRecipePage.jsx
│   ├── AdminRecipeReviewPage.jsx
│   ├── CommunityPage.jsx
│   ├── CommunityRecipePage.jsx
│   └── FavoritesPage.jsx
├── services/            
│   └── api.js           
├── styles/              
│   ├── admin/
│   ├── community/
│   ├── favorites/
│   ├── filterMenu/
│   ├── global/
│   ├── home/
│   ├── pages/
│   └── rating/
├── App.jsx              
├── App.css              
├── Home.jsx             
├── index.css            
└── main.jsx             
```

---

## Features

### Mood-Based Recipe Discovery

- **Happy** – Bright, cheerful dishes  
- **Cozy** – Warm, comforting meals  
- **Relaxed** – Calm, soothing dishes  
- **Energetic** – Bold, spicy meals  

### Advanced Search & Filtering

- Real-time search with debouncing  
- Filter by diet types (Vegetarian, Vegan, Keto, etc.)  
- Allergy filtering with auto-exclusion  
- Infinite scroll for seamless browsing  

### Community Features

- Submit and share original recipes  
- Recipe approval workflow  
- Rate and review community recipes (1–5 stars)  
- Personal recipe management  

### Personalization

- User profiles with allergy preferences  
- Automatic allergy filtering  
- Favorite recipes collection  
- Personal notes for recipes  

### Admin Dashboard

- Recipe moderation system  
- Pending submissions review  
- User management  
- Analytics and statistics  

---

## Tech Stack

- **Vite** – Lightning-fast build tool  
- **React 18** – Modern React with hooks  
- **Bootstrap 5** – Responsive UI components  
- **React Router DOM** – Client-side routing  
- **Axios** – HTTP client with interceptors  
- **React Icons** – Beautiful icons (Feather)  
- **JWT Authentication** – Secure user sessions  

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)  
- npm or yarn  
- Backend API running on port `5000`  

### Installation

```bash
git clone https://github.com/your-username/moodmeals-frontend.git
cd moodmeals-frontend
npm install
# or
yarn install
```

### Environment Setup

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key
```

### Run the App

```bash
npm run dev
# or
yarn dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## Key Components

### Authentication System

- JWT-based login/register  
- Token stored in localStorage  
- Axios interceptors for auth headers  
- Auto logout on invalid token  

### State Management

- React Context API for auth  
- Custom hooks for filters, profile, and recipes  
- Efficient re-renders via useMemo/useCallback  

### UI/UX

- Bootstrap grid system  
- CSS variables for consistent theming  
- Responsive & mobile-first design  

### Color Palette

```css
:root {
  --main: #FF6B6B;
  --happy: #FFD93D;
  --cozy: #FFE5B4;
  --relaxed: #CDB4DB;
  --energetic: #FFAD69;
  --dark: #011627;
}
```

---

## 🔌 API Integration

### Spoonacular API

- Recipe search & details  
- Nutrition information  
- Ingredient data  

### Custom Backend API

- User authentication  
- Community recipes  
- Favorites, notes, and ratings  

---

## Data Flows

### Recipe Discovery Flow

1. User enters query or applies filters  
2. Debounced input triggers API call  
3. Recipes are mood-tagged  
4. Allergy filters apply  
5. Infinite scroll loads more  

### Community Recipe Flow

1. User submits recipe  
2. Recipe marked as `pending`  
3. Admin approves via dashboard  
4. Recipe becomes public  
5. Users can rate, note, favorite  

--- 

### Code Style

- Functional components + hooks  
- Semantic naming  
- Comment complex logic  
- Prettier formatting  

---

## 📄 License

MIT © MoodMeals Team


