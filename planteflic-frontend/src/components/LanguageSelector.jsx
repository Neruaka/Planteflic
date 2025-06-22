//frontend/src/components/LanguageSelector.jsx

import { useTranslation } from 'react-i18next';

/**
 * Composant pour changer la langue de l'interface
 * Permet de basculer entre français et anglais
 * Sauvegarde la préférence dans le localStorage
 */
function LanguageSelector() {
  // Hook i18n pour accéder aux fonctions de traduction
  const { i18n } = useTranslation();

  /**
   * Change la langue de l'application
   * @param {string} lng - Code de langue (fr, en)
   */
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <button
        onClick={() => changeLanguage('fr')}
        style={{
          backgroundColor: i18n.language === 'fr' ? 'var(--accent-color)' : 'transparent',
          color: i18n.language === 'fr' ? 'white' : 'var(--text-color)',
          border: '1px solid var(--accent-color)',
          padding: '0.3rem 0.6rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        🇫🇷 FR
      </button>
      
      <button
        onClick={() => changeLanguage('en')}
        style={{
          backgroundColor: i18n.language === 'en' ? 'var(--accent-color)' : 'transparent',
          color: i18n.language === 'en' ? 'white' : 'var(--text-color)',
          border: '1px solid var(--accent-color)',
          padding: '0.3rem 0.6rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}

export default LanguageSelector;