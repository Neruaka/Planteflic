import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import { useLoading } from '../context/LoadingContext';

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const toast = useToast();
  const { showLoading, hideLoading } = useLoading();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    showLoading(t('loader.authenticating'));

    try {
      const res = await api.post('/auth/login', { email, password });
      hideLoading();
      toast.messages.loginSuccess();
      login(res.data.token);
    } catch (err) {
      hideLoading();
      const errorMessage = err.response?.data?.message || t('login.error');
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <h2>{t('login.title')}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder={t('login.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('login.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}>
          {t('login.submit')}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p>{t('login.noAccount')}</p>
        <Link to="/register">
          <button type="button" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}>
            {t('login.register')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;