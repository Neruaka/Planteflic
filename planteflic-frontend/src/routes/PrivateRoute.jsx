import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { user, isLoading } = useContext(AuthContext);

  // Attendre que l'authentification soit vérifiée
  if (isLoading) {
    return <div>Chargement...</div>; // Ou votre composant Loader
  }

  // Si pas connecté : redirection vers login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Sinon : on affiche la page protégée
  return children;
}

export default PrivateRoute;