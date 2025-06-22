//frontend/src/pages/NewPlant.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

function NewPlant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    frequency: '',
    lastWatered: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation basique
    if (!formData.name || !formData.species || !formData.frequency || !formData.lastWatered) {
      setError(t('newPlant.validation'));
      setLoading(false);
      return;
    }

    try {
      await api.post('/plants', formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || t('newPlant.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
      <h2>{t('newPlant.title')}</h2>
      
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={t('newPlant.name')}
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="species"
          placeholder={t('newPlant.species')}
          value={formData.species}
          onChange={handleChange}
          required
        />
        
        <input
          type="number"
          name="frequency"
          placeholder={t('newPlant.frequency')}
          value={formData.frequency}
          onChange={handleChange}
          min="1"
          required
        />
        
        <input
          type="date"
          name="lastWatered"
          value={formData.lastWatered}
          onChange={handleChange}
          required
        />
        <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginTop: '-0.5rem' }}>
          {t('newPlant.lastWatered')}
        </label>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: loading ? '#ccc' : 'white',
              color: loading ? '#666' : 'var(--accent-color)',
              border: '2px solid white',
              fontWeight: 'bold'
            }}
          >
            {loading ? t('newPlant.loading') : t('newPlant.submit')}
          </button>
          
          <button 
            type="button" 
            onClick={handleCancel}
            style={{ 
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white'
            }}
          >
            {t('newPlant.cancel')}
          </button>
        </div>
      </form>
      
      <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: 'rgba(255,255,255,0.7)' }}>
        {t('newPlant.required')}
      </p>
    </div>
  );
}

export default NewPlant;