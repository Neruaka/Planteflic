import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';

function ThemeSwitcher() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: 'transparent',
        color: 'white',
        border: '2px solid white',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'} {t('nav.theme')}
    </button>
  );
}

export default ThemeSwitcher;
