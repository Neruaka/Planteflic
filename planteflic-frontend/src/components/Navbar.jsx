import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSelector from './LanguageSelector';

function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'var(--accent-color)',
      color: 'white'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
        🌿 Planteflic
      </h1>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <LanguageSelector />
        <ThemeSwitcher />
        
        {user && (
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {t('nav.logout')}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
