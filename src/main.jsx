import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import siteIcon from './assets/iteam/bg.png';
import './styles/base.css';
import './styles/home.css';
import './styles/pages.css';
import './styles/cyber.css';

const favicon = document.querySelector('link[rel="icon"]');
favicon.href = siteIcon;
favicon.type = 'image/png';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
