//frontend/src/pages/Register.jsx
import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/register', { email, password });
      navigate('/'); // Redirige vers login
    } catch (err) {
      setError(err.response.data.message || 'Erreur lors de l’inscription');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
}

export default Register;
