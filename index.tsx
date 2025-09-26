import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Assuming there's a global CSS file, though it's not provided.
// import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
