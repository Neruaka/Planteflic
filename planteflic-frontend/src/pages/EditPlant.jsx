//planteflic-frontend/src/pages/EditPlant.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

/**
 * Composant pour modifier ou supprimer une plante existante
 * Permet de :
 * - Charger les données d'une plante spécifique
 * - Modifier ses informations (nom, espèce, fréquence, dernier arrosage)
 * - Supprimer la plante avec confirmation
 * - Naviguer vers le dashboard après les opérations
 */
function EditPlant() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Récupération de l'ID de la plante depuis l'URL
  const { id } = useParams();
  
  // État local pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    frequency: '',
    lastWatered: ''
  });
  
  // États pour la gestion des erreurs et du chargement
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPlant, setLoadingPlant] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
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
        setError(t('editPlant.loadError'));
      } finally {
        setLoadingPlant(false);
      }
    };

    fetchPlant();
  }, [id, t]); 

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
      setError(t('editPlant.validation'));
      setLoading(false);
      return;
    }

    try {
      await api.put(`/plants/${id}`, formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || t('editPlant.error'));
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async () => {
    if (!window.confirm(t('editPlant.deleteConfirm'))) {
      return;
    }

    try {
      setLoading(true);
      await api.delete(`/plants/${id}`);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || t('editPlant.deleteError'));
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
      
      {/* Affichage conditionnel des erreurs */}
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {/* Champ nom de la plante */}
        <input
          type="text"
          name="name"
          placeholder={t('editPlant.name')}
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        {/* Champ espèce de la plante */}
        <input
          type="text"
          name="species"
          placeholder={t('editPlant.species')}
          value={formData.species}
          onChange={handleChange}
          required
        />
        
        {/* Champ fréquence d'arrosage */}
        <input
          type="number"
          name="frequency"
          placeholder={t('editPlant.frequency')}
          value={formData.frequency}
          onChange={handleChange}
          min="1"
          required
        />
        
        {/* Champ date du dernier arrosage */}
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
        
        {/* Groupe de boutons d'action */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {/* Bouton de modification */}
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
          
          {/* Bouton de suppression */}
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
          
          {/* Bouton d'annulation */}
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