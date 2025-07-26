import { useState, useEffect } from 'react';
import { portfolioAPI, analyticsAPI } from '../services/api';

export const usePortfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch portfolio data
        const response = await portfolioAPI.getPortfolio();
        
        if (response.success) {
          setPortfolioData(response.data);
          
          // Log visit for analytics (non-blocking)
          analyticsAPI.logVisit('/');
        } else {
          throw new Error(response.error?.message || 'Failed to fetch portfolio');
        }
      } catch (err) {
        console.error('Portfolio fetch error:', err);
        setError(err.message || 'Failed to load portfolio data');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const refetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await portfolioAPI.getPortfolio();
      
      if (response.success) {
        setPortfolioData(response.data);
      } else {
        throw new Error(response.error?.message || 'Failed to fetch portfolio');
      }
    } catch (err) {
      console.error('Portfolio refetch error:', err);
      setError(err.message || 'Failed to reload portfolio data');
    } finally {
      setLoading(false);
    }
  };

  return {
    portfolioData,
    loading,
    error,
    refetchPortfolio
  };
};

export default usePortfolio;