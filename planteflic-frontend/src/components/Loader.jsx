//planteflic-frontend/src/components/Loader.jsx

import { useLoading } from '../context/LoadingContext';
import { useTranslation } from 'react-i18next';

function Loader() {
  const { isLoading, loadingMessage } = useLoading();
  const { t } = useTranslation();

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="plant-loader">
          <div className="plant-pot">
            <div className="plant-stem"></div>
            <div className="plant-leaf plant-leaf-1"></div>
            <div className="plant-leaf plant-leaf-2"></div>
            <div className="plant-leaf plant-leaf-3"></div>
          </div>
        </div>
        <p className="loader-text">
          {loadingMessage || t('common.loading')}
        </p>
      </div>
    </div>
  );
}

export default Loader;