import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Elemento #root non trovato: controlla che index.html contenga <div id="root"></div>'
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
