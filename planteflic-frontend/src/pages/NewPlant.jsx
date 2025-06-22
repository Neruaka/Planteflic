import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { useToast } from '../hooks/useToast';
import { useLoading } from '../context/LoadingContext';

function NewPlant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    wateringFrequency: '7',
    lastWatered: '',
    location: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { showLoading, hideLoading } = useLoading();

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

    if (!formData.name || !formData.species || !formData.wateringFrequency || !formData.lastWatered) {
      const errorMessage = t('newPlant.validation');
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    showLoading(t('toast.savingPlant'));

    try {
      await api.post('/plants', formData);
      hideLoading();
      toast.messages.plantAdded();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      hideLoading();
      const errorMessage = err.response?.data?.message || t('newPlant.error');
      setError(errorMessage);
      toast.error(errorMessage);
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
          type="text"
          name="location"
          placeholder="Emplacement (ex: Salon, Balcon)"
          value={formData.location}
          onChange={handleChange}
        />
        
        <input
          type="number"
          name="wateringFrequency"
          placeholder={t('newPlant.frequency')}
          value={formData.wateringFrequency}
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

        <input
          type="url"
          name="image"
          placeholder={t('newPlant.image')}
          value={formData.image}
          onChange={handleChange}
        />
        <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginTop: '-0.5rem' }}>
          URL de l'image (optionnel)
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