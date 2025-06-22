//frontend/src/pages/Register.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/auth/register', { email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || t('register.error'));
    }
  };

  return (
    <div className="form-container">
      <h2>{t('register.title')}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder={t('register.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('register.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }} >{t('register.submit')}</button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p>{t('register.hasAccount')}</p>
        <Link to="/">
          <button type="button" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}>
            {t('register.login')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;