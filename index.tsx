import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import mapboxgl from 'mapbox-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoibmh1dGtpbWxvbmciLCJhIjoiY21nMHIxenVqMGczaDJscHU5YnkxeXF2ZCJ9.S01ISxUUtMMqGbDD9k7KWA';

// Set the worker URL and access token for mapbox-gl.
// This is required for mapbox-gl v2+ and react-map-gl v8+.
mapboxgl.workerUrl = 'https://esm.sh/mapbox-gl@3.4.0/dist/mapbox-gl-csp-worker.js';
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// Assuming there's a global CSS file, though it's not provided.
// import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}