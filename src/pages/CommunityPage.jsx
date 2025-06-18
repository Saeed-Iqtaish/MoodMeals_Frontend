import React, { useState, useCallback, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "../components/auth/AuthModal";
import CommunityHeader from "../components/community/list/CommunityHeader";
import CommunityControls from "../components/community/list/CommunityControls";
import FilterModal from "../components/filterPanel/FilterModal";
import RecipeList from "../components/global/RecipeList";
import CreateRecipeModal from "../components/community/list/CreateRecipeModal";
import RecipeDetails from "../components/global/RecipeDetails"
import useRecipeFilters from "../hooks/useRecipeFilters .js";
import "../styles/global/global.css";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 COMMUNITY PAGE ERROR:', error);
    console.error('🚨 ERROR INFO:', errorInfo);
    console.error('🚨 STACK TRACE:', error.stack);
    
    // Prevent infinite refresh by storing error in sessionStorage
    sessionStorage.setItem('communityPageError', JSON.stringify({
      message: error.message,
      stack: error.stack,
      timestamp: Date.now()
    }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5">
          <div className="alert alert-danger">
            <h4>Something went wrong with the Community Page</h4>
            <p><strong>Error:</strong> {this.state.error?.message}</p>
            <details>
              <summary>Stack Trace</summary>
              <pre>{this.state.error?.stack}</pre>
            </details>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => {
                sessionStorage.removeItem('communityPageError');
                window.location.reload();
              }}
            >
              Reload Page
            </button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

function CommunityPage() {
  const renderCount = useRef(0);
  renderCount.current++;
  
  console.log(`🔍 CommunityPage render #${renderCount.current}`);
  console.log('🔍 Render timestamp:', new Date().toISOString());
  
  // Check for previous errors
  useEffect(() => {
    const storedError = sessionStorage.getItem('communityPageError');
    if (storedError) {
      console.error('🚨 PREVIOUS ERROR FOUND:', JSON.parse(storedError));
    }
  }, []);

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  console.log('🔍 Auth state:', { isAuthenticated, userId: user?.id });

  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  console.log('🔍 Modal states:', {
    showFilters,
    showCreateModal,
    showAuthModal,
    showRecipeDetails,
    refreshTrigger
  });

  // Wrap useRecipeFilters in try-catch
  let filters, appliedFilters, updateFilter, applyFilters, clearFilters, getActiveFilterCount, userAllergies;
  
  try {
    const hookResult = useRecipeFilters();
    filters = hookResult.filters;
    appliedFilters = hookResult.appliedFilters;
    updateFilter = hookResult.updateFilter;
    applyFilters = hookResult.applyFilters;
    clearFilters = hookResult.clearFilters;
    getActiveFilterCount = hookResult.getActiveFilterCount;
    userAllergies = hookResult.userAllergies;
    
    console.log('🔍 useRecipeFilters result:', {
      filters,
      appliedFilters,
      userAllergies
    });
  } catch (error) {
    console.error('🚨 ERROR in useRecipeFilters:', error);
    throw error; // Re-throw to be caught by error boundary
  }

  // 🔧 FIX: Stable callback functions with error handling
  const handleApplyFilters = useCallback(() => {
    try {
      console.log('🔍 handleApplyFilters called');
      applyFilters();
      setShowFilters(false);
    } catch (error) {
      console.error('🚨 ERROR in handleApplyFilters:', error);
    }
  }, [applyFilters]);

  const handleClearFilters = useCallback(() => {
    try {
      console.log('🔍 handleClearFilters called');
      clearFilters();
    } catch (error) {
      console.error('🚨 ERROR in handleClearFilters:', error);
    }
  }, [clearFilters]);

  const handleCreateRecipe = useCallback(() => {
    try {
      console.log('🔍 handleCreateRecipe called, isAuthenticated:', isAuthenticated);
      if (!isAuthenticated) {
        setShowAuthModal(true);
        return;
      }
      setShowCreateModal(true);
    } catch (error) {
      console.error('🚨 ERROR in handleCreateRecipe:', error);
    }
  }, [isAuthenticated]);

  const handleRecipeCreated = useCallback(() => {
    try {
      console.log('🔍 handleRecipeCreated called');
      setShowCreateModal(false);
      setRefreshTrigger(prev => {
        console.log('🔍 Updating refreshTrigger from', prev, 'to', prev + 1);
        return prev + 1;
      });
    } catch (error) {
      console.error('🚨 ERROR in handleRecipeCreated:', error);
    }
  }, []);

  const handleAuthSuccess = useCallback(() => {
    try {
      console.log('🔍 handleAuthSuccess called');
      setShowAuthModal(false);
      setShowCreateModal(true);
    } catch (error) {
      console.error('🚨 ERROR in handleAuthSuccess:', error);
    }
  }, []);

  const handleRecipeClick = useCallback((recipe) => {
    try {
      console.log('🔍 handleRecipeClick called with recipe:', recipe?.id);
      setSelectedRecipe(recipe);
      setShowRecipeDetails(true);
    } catch (error) {
      console.error('🚨 ERROR in handleRecipeClick:', error);
    }
  }, []);

  const handleRecipeDetailsClose = useCallback(() => {
    try {
      console.log('🔍 handleRecipeDetailsClose called');
      setShowRecipeDetails(false);
      setSelectedRecipe(null);
    } catch (error) {
      console.error('🚨 ERROR in handleRecipeDetailsClose:', error);
    }
  }, []);

  const handleViewFullRecipe = useCallback((recipe) => {
    try {
      console.log('🔍 handleViewFullRecipe called with recipe:', recipe?.id);
      navigate(`/community/${recipe.id}`);
      setShowRecipeDetails(false);
    } catch (error) {
      console.error('🚨 ERROR in handleViewFullRecipe:', error);
    }
  }, [navigate]);

  const handleFavoriteChange = useCallback((recipeId, isFavorited) => {
    try {
      console.log(`🔍 handleFavoriteChange called: Recipe ${recipeId} favorite status changed: ${isFavorited}`);
    } catch (error) {
      console.error('🚨 ERROR in handleFavoriteChange:', error);
    }
  }, []);

  const handleSearchChange = useCallback((val) => {
    try {
      console.log('🔍 handleSearchChange called with value:', val);
      updateFilter("search", val);
    } catch (error) {
      console.error('🚨 ERROR in handleSearchChange:', error);
    }
  }, [updateFilter]);

  const toggleFilters = useCallback(() => {
    try {
      console.log('🔍 toggleFilters called, current showFilters:', showFilters);
      setShowFilters(prev => !prev);
    } catch (error) {
      console.error('🚨 ERROR in toggleFilters:', error);
    }
  }, [showFilters]);

  const handleSetFilters = useCallback((newFilters) => {
    try {
      console.log('🔍 handleSetFilters called with:', newFilters);
      Object.keys(newFilters).forEach(key => {
        if (filters[key] !== newFilters[key]) {
          console.log(`🔍 Updating filter ${key} from`, filters[key], 'to', newFilters[key]);
          updateFilter(key, newFilters[key]);
        }
      });
    } catch (error) {
      console.error('🚨 ERROR in handleSetFilters:', error);
    }
  }, [filters, updateFilter]);

  // Add effect to track when applied filters change
  useEffect(() => {
    console.log('🔍 appliedFilters changed:', appliedFilters);
  }, [appliedFilters]);

  console.log('🔍 About to render JSX');

  return (
    <ErrorBoundary>
      <Container fluid className="px-3 px-md-5">
        <CommunityHeader />
        
        <CommunityControls
          searchTerm={filters.search}
          setSearchTerm={handleSearchChange}
          showFilters={showFilters}
          onToggleFilters={toggleFilters}
          onCreateRecipe={handleCreateRecipe}
        />

        <div className="mt-4">
          <RecipeList
            search={appliedFilters.search}
            diet={appliedFilters.diet}
            allergy={appliedFilters.allergy}
            mood={appliedFilters.mood}
            isCommunityList={true}
            refreshTrigger={refreshTrigger}
            onRecipeClick={handleRecipeClick}
            onFavoriteChange={handleFavoriteChange}
            onLoginRequired={() => setShowAuthModal(true)}
            enableInfiniteScroll={false}
          />
        </div>
      </Container>

      <RecipeDetails
        show={showRecipeDetails}
        onHide={handleRecipeDetailsClose}
        recipe={selectedRecipe}
        isCommunityRecipe={true}
        onFavoriteChange={handleFavoriteChange}
        onViewFullRecipe={handleViewFullRecipe}
      />

      <FilterModal
        show={showFilters}
        onHide={() => setShowFilters(false)}
        filters={filters}
        setFilters={handleSetFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        userAllergies={userAllergies}
      />

      <AuthModal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      {isAuthenticated && (
        <CreateRecipeModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSuccess={handleRecipeCreated}
        />
      )}
    </ErrorBoundary>
  );
}

export default CommunityPage;