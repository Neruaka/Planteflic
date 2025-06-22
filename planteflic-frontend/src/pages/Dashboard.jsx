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
  }, []);

  const handleAdd = () => {
    navigate('/plants/new');
  };

  const handleEdit = (plantId) => {
    navigate(`/plants/edit/${plantId}`);
  };

  const handleWater = async (plantId) => {
    try {
      const response = await api.post(`/plants/${plantId}/water`);
      setPlants(plants.map(plant => 
        plant._id === plantId ? response.data : plant
      ));
      toast.success('💧 Plante arrosée !');
    } catch (error) {
      console.error('Erreur lors de l\'arrosage:', error);
      toast.error('Erreur lors de l\'arrosage');
    }
  };

  const plantsNeedingWater = plants.filter(plant => plant.needsWatering);

  return (
    <div className="container" style={{ padding: '1rem' }}>
      <div className="dashboard-header">
        <div>
          <h2>{t('dashboard.title')}</h2>
          {/* Statistiques rapides */}
          <div className="stats-grid">
            <div className="stat-card">
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {plants.length}
              </div>
              <div>Plantes totales</div>
            </div>
            <div className={`stat-card ${plantsNeedingWater.length > 0 ? 'needs-attention' : ''}`}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {plantsNeedingWater.length}
              </div>
              <div>À arroser</div>
            </div>
          </div>
        </div>
        <div>
          <button className="btn-add" onClick={handleAdd}>
            {t('dashboard.add')}
          </button>
        </div>
      </div>

      {loading && <p className="text-center">{t('dashboard.loading')}</p>}
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      {!loading && !error && plants.length === 0 && (
        <div className="text-center" style={{ padding: '2rem' }}>
          <p>{t('dashboard.empty')}</p>
          <button className="btn-primary" onClick={handleAdd}>
            Ajouter ma première plante
          </button>
        </div>
      )}

      <div className="plant-grid">
        {plants.map((plant) => (
          <div key={plant._id} className="plant-card" style={{ position: 'relative' }}>
            {/* Badge rouge si arrosage nécessaire */}
            {plant.needsWatering && (
              <div className="watering-badge">
                !
              </div>
            )}
            
            <h3 style={{ marginBottom: '0.5rem', wordBreak: 'break-word' }}>
              {plant.name}
            </h3>
            <p>🌺 {t('plant.species')} : {plant.species || t('plant.notSpecified')}</p>
            <p>💧 {t('plant.watering', { frequency: plant.wateringFrequency })}</p>
            <p>📅 {t('plant.lastWatered')} : {new Date(plant.lastWatered).toLocaleDateString()}</p>
            
            <div style={{ 
              marginTop: '1rem', 
              display: 'flex', 
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={() => handleWater(plant._id)}
                style={{
                  backgroundColor: plant.needsWatering ? '#4caf50' : 'rgba(255,255,255,0.7)',
                  color: 'white',
                  border: 'none',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  flex: '1',
                  minWidth: '100px'
                }}
              >
                💧 Arroser
              </button>
              <button 
                onClick={() => handleEdit(plant._id)}
                style={{
                  backgroundColor: 'white',
                  color: 'var(--accent-color)',
                  border: '1px solid white',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  flex: '1',
                  minWidth: '100px'
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