import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';
import { useLoading } from '../context/LoadingContext';

function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        showLoading(t('toast.loadingPlants'));
        const res = await api.get('/plants'); 
        setPlants(res.data);
        setError('');
      } catch (err) {
        console.error(err);
        const errorMessage = t('dashboard.error');
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
        hideLoading();
      }
    };

    fetchPlants();
  }, []); // Dépendances vides - ne s'exécute qu'une fois

  const handleAdd = () => {
    navigate('/plants/new');
  };

  const handleEdit = (plantId) => {
    navigate(`/plants/edit/${plantId}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div className="dashboard-header">
        <h2>{t('dashboard.title')}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-add" onClick={handleAdd}>{t('dashboard.add')}</button>
        </div>
      </div>

      {loading && <p>{t('dashboard.loading')}</p>}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && plants.length === 0 && (
        <p>{t('dashboard.empty')}</p>
      )}

      <div className="plant-grid">
        {plants.map((plant) => (
          <div key={plant._id} className="plant-card">
            <h3>{plant.name}</h3>
            <p>🌺 {t('plant.species')} : {plant.species || t('plant.notSpecified')}</p>
            <p>💧 {t('plant.watering', { frequency: plant.frequency })}</p>
            <p>📅 {t('plant.lastWatered')} : {new Date(plant.lastWatered).toLocaleDateString()}</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => handleEdit(plant._id)}
                style={{
                  backgroundColor: 'white',
                  color: 'var(--accent-color)',
                  border: '1px solid white',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                {t('dashboard.edit')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;