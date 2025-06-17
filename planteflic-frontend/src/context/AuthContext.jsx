//frontend/src/context/AuthContext.jsx


import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//faire un context pour l'authentification
//va contenir notre user, login() et logout()
export const AuthContext = createContext();


// AuthProvider va être utilisé pour englober notre application
// et fournir l'état d'authentification à tous les composants enfants   
export const AuthProvider = ({ children }) => {
    // State pour stocker l'utilisateur connecté
  const [user, setUser] = useState(null);
    // Hook pour la navigation
  const navigate = useNavigate();

    /*
    *Fonction pour connecter l'utilisateur
    *enregistre le token dans le localStorage
    * et met à jour l'état de l'utilisateur
    * puis redirige vers le tableau de bord
    */    
  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
    navigate('/dashboard');
  };

    /*
    *Fonction pour déconnecter l'utilisateur
    *supprime le token du localStorage
    * et met à jour l'état de l'utilisateur
    * puis redirige vers la page d'accueil
    */ 
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

    // Vérifie si un token est présent dans le localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // Tu peux le décoder avec jwt-decode plus tard si tu veux
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
