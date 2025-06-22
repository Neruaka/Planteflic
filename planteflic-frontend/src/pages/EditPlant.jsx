import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { useToast } from '../hooks/useToast';
import { useLoading } from '../context/LoadingContext';

function EditPlant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    frequency: '',
    lastWatered: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPlant, setLoadingPlant] = useState(true);
  const toast = useToast();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        showLoading(t('loader.loadingData'));
        const res = await api.get(`/plants/${id}`);
        const plant = res.data;
        setFormData({
          name: plant.name,
          species: plant.species || '',
          frequency: plant.frequency,
          lastWatered: new Date(plant.lastWatered).toISOString().split('T')[0]
        });
      } catch (err) {
        console.error(err);
        const errorMessage = t('editPlant.loadError');
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoadingPlant(false);
        hideLoading();
      }
    };

    fetchPlant();
  }, [id, t, showLoading, hideLoading, toast]);

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

    if (!formData.name || !formData.species || !formData.frequency || !formData.lastWatered) {
      const errorMessage = t('editPlant.validation');
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    showLoading(t('loader.savingData'));

    try {
      await api.put(`/plants/${id}`, formData);
      hideLoading();
      toast.messages.plantUpdated();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      hideLoading();
      const errorMessage = err.response?.data?.message || t('editPlant.error');
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t('editPlant.deleteConfirm'))) {
      return;
    }

    setLoading(true);
    showLoading(t('toast.deletingPlant'));

    try {
      await api.delete(`/plants/${id}`);
      hideLoading();
      toast.messages.plantDeleted();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      hideLoading();
      const errorMessage = err.response?.data?.message || t('editPlant.deleteError');
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (loadingPlant) {
    return (
      <div className="form-container">
        <p>{t('editPlant.loading')}</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>{t('editPlant.title')}</h2>
      
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={t('editPlant.name')}
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="species"
          placeholder={t('editPlant.species')}
          value={formData.species}
          onChange={handleChange}
          required
        />
        
        <input
          type="number"
          name="frequency"
          placeholder={t('editPlant.frequency')}
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
          {t('editPlant.lastWatered')}
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
            {loading ? t('editPlant.loadingEdit') : t('editPlant.submit')}
          </button>
          
          <button 
            type="button" 
            onClick={handleDelete}
            disabled={loading}
            style={{ 
              backgroundColor: loading ? '#ccc' : '#ff6b6b',
              color: 'white',
              border: '2px solid #ff6b6b'
            }}
          >
            {loading ? t('editPlant.loadingDelete') : t('editPlant.delete')}
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
            {t('editPlant.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPlant;