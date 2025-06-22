//planteflic-frontend/src/context/LoadingContext.jsx

import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

// Exporter comme export nommé
export { LoadingContext };

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const showLoading = (message = 'Chargement...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
  };

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      loadingMessage, 
      showLoading, 
      hideLoading 
    }}>
      {children}
    </LoadingContext.Provider>
  );
};
export default LoadingContext;