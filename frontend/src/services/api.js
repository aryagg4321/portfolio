import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.error?.message || 'Server error occurred';
      throw new Error(errorMessage);
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other error
      throw new Error('An unexpected error occurred');
    }
  }
);

// Portfolio API
export const portfolioAPI = {
  // Get portfolio data
  getPortfolio: async () => {
    try {
      const response = await apiClient.get('/portfolio');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      throw error;
    }
  },

  // Update portfolio data (admin only)
  updatePortfolio: async (updateData) => {
    try {
      const response = await apiClient.put('/portfolio', updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating portfolio:', error);
      throw error;
    }
  }
};

// Resume API
export const resumeAPI = {
  // Download resume
  downloadResume: async () => {
    try {
      const response = await apiClient.get('/resume/download', {
        responseType: 'blob',
      });
      
      // Create blob URL for download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Arya_G_Guddad_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error downloading resume:', error);
      throw error;
    }
  },

  // Upload resume (admin only)
  uploadResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
  }
};

// Contact API
export const contactAPI = {
  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  },

  // Get contact submissions (admin only)
  getContactSubmissions: async () => {
    try {
      const response = await apiClient.get('/contact');
      return response.data;
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      throw error;
    }
  }
};

// Analytics API
export const analyticsAPI = {
  // Log visit
  logVisit: async (page = '/') => {
    try {
      const response = await apiClient.post('/analytics/visit', null, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      // Don't throw error for analytics - just log it
      console.warn('Analytics logging failed:', error);
      return null;
    }
  },

  // Get visit statistics
  getStats: async () => {
    try {
      const response = await apiClient.get('/analytics/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
};

export default apiClient;