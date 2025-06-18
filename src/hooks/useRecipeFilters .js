import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const useRecipeFilters = () => {
  const hookRenderCount = useRef(0);
  hookRenderCount.current++;
  
  console.log(`🪝 useRecipeFilters render #${hookRenderCount.current}`);

  try {
    const { user, isAuthenticated } = useAuth();
    console.log('🪝 Auth context:', { isAuthenticated, userId: user?.id, userAllergies: user?.allergies });

    // 🔧 FIX: Create stable user allergies reference
    const userAllergies = useMemo(() => {
      console.log('🪝 Computing userAllergies, user?.allergies:', user?.allergies);
      if (!isAuthenticated || !user?.allergies) {
        console.log('🪝 No allergies, returning empty array');
        return [];
      }
      const allergies = [...user.allergies];
      console.log('🪝 Returning allergies:', allergies);
      return allergies;
    }, [isAuthenticated, user?.allergies?.length]); // Use length instead of array reference

    // 🔧 FIX: Create stable initial filters
    const initialFilters = useMemo(() => {
      const filters = {
        search: "",
        diet: [],
        allergy: userAllergies,
        mood: [],
      };
      console.log('🪝 Computing initialFilters:', filters);
      return filters;
    }, [userAllergies]);

    const [filters, setFilters] = useState(() => {
      console.log('🪝 Initializing filters state with:', initialFilters);
      return initialFilters;
    });
    
    const [appliedFilters, setAppliedFilters] = useState(() => {
      console.log('🪝 Initializing appliedFilters state with:', initialFilters);
      return initialFilters;
    });

    console.log('🪝 Current state:', { filters, appliedFilters });

    // 🔧 FIX: Only update when user allergies actually change
    useEffect(() => {
      console.log('🪝 User allergies effect triggered, userAllergies:', userAllergies);
      setFilters(prev => {
        const newFilters = { ...prev, allergy: userAllergies };
        console.log('🪝 Updating filters from', prev, 'to', newFilters);
        return newFilters;
      });
      setAppliedFilters(prev => {
        const newAppliedFilters = { ...prev, allergy: userAllergies };
        console.log('🪝 Updating appliedFilters from', prev, 'to', newAppliedFilters);
        return newAppliedFilters;
      });
    }, [userAllergies]);

    // 🔧 FIX: Debounced search effect with proper cleanup
    useEffect(() => {
      console.log('🪝 Search debounce effect triggered, search term:', filters.search);
      const delay = setTimeout(() => {
        console.log('🪝 Applying debounced search:', filters.search);
        setAppliedFilters((prev) => {
          const newAppliedFilters = {
            ...prev,
            search: filters.search,
          };
          console.log('🪝 Search debounce updating appliedFilters from', prev, 'to', newAppliedFilters);
          return newAppliedFilters;
        });
      }, 300);
      
      return () => {
        console.log('🪝 Cleaning up search debounce timeout');
        clearTimeout(delay);
      };
    }, [filters.search]);

    // 🔧 FIX: Stable functions with useCallback
    const updateFilter = useCallback((field, value) => {
      console.log('🪝 updateFilter called:', { field, value });
      try {
        setFilters((prev) => {
          const newFilters = { ...prev, [field]: value };
          console.log('🪝 updateFilter updating filters from', prev, 'to', newFilters);
          return newFilters;
        });
      } catch (error) {
        console.error('🚨 ERROR in updateFilter:', error);
        throw error;
      }
    }, []);

    const applyFilters = useCallback(() => {
      console.log('🪝 applyFilters called, current filters:', filters);
      try {
        setAppliedFilters({ ...filters });
        console.log('🪝 Applied filters:', filters);
      } catch (error) {
        console.error('🚨 ERROR in applyFilters:', error);
        throw error;
      }
    }, [filters]);

    const clearFilters = useCallback(() => {
      console.log('🪝 clearFilters called, userAllergies:', userAllergies);
      try {
        const clearedFilters = {
          search: "",
          diet: [],
          allergy: userAllergies,
          mood: []
        };
        console.log('🪝 Clearing filters to:', clearedFilters);
        setFilters(clearedFilters);
        setAppliedFilters(clearedFilters);
      } catch (error) {
        console.error('🚨 ERROR in clearFilters:', error);
        throw error;
      }
    }, [userAllergies]);

    const getActiveFilterCount = useCallback(() => {
      console.log('🪝 getActiveFilterCount called');
      try {
        let count = 0;
        if (filters.mood.length > 0) count += filters.mood.length;
        if (filters.diet.length > 0) count += filters.diet.length;
        if (filters.allergy.length > 0) count += filters.allergy.length;
        console.log('🪝 Active filter count:', count);
        return count;
      } catch (error) {
        console.error('🚨 ERROR in getActiveFilterCount:', error);
        throw error;
      }
    }, [filters.mood.length, filters.diet.length, filters.allergy.length]); // Use lengths instead of arrays

    const result = {
      filters,
      appliedFilters,
      updateFilter,
      applyFilters,
      clearFilters,
      getActiveFilterCount,
      userAllergies
    };

    console.log('🪝 useRecipeFilters returning:', result);
    return result;

  } catch (error) {
    console.error('🚨 FATAL ERROR in useRecipeFilters:', error);
    console.error('🚨 Stack trace:', error.stack);
    
    // Store error for debugging
    sessionStorage.setItem('useRecipeFiltersError', JSON.stringify({
      message: error.message,
      stack: error.stack,
      timestamp: Date.now()
    }));
    
    throw error;
  }
};

export default useRecipeFilters;