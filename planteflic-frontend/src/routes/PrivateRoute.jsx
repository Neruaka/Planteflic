import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Si pas connecté : redirection vers login
  if (!user) {
    return <Navigate to="/" />;
  }w

  // Sinon : on affiche la page protégée
  return children;
}

export default PrivateRoute;
