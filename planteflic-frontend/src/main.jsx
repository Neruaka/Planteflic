// frontend/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/main.css';
import './i18n/i18n.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
