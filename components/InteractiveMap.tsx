import React from 'react';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl/mapbox-legacy';
import { Attraction } from '../types';

// The access token is now set globally in index.tsx
const MAP_CENTER_LNG = 106.1105;
const MAP_CENTER_LAT = 11.3508;
const MAP_ZOOM = 12;

interface InteractiveMapProps {
  attractions: Attraction[];
  onMarkerClick: (attraction: Attraction) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ attractions, onMarkerClick }) => {
  return (
    <Map
      initialViewState={{
        longitude: MAP_CENTER_LNG,
        latitude: MAP_CENTER_LAT,
        zoom: MAP_ZOOM,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <GeolocateControl position="top-left" />
      <NavigationControl position="top-left" />

      {/* Central marker for "Núi Bà Đen" */}
      <Marker 
        longitude={MAP_CENTER_LNG} 
        latitude={MAP_CENTER_LAT} 
        color="#D63131" 
      />
      
      {/* Attraction markers */}
      {attractions.map(attraction => (
        <Marker
          key={attraction.id}
          longitude={attraction.location.lng}
          latitude={attraction.location.lat}
          color="#3B82F6" // Blue color for attractions
          onClick={(e) => {
            // Prevent the map's click event from firing
            e.originalEvent.stopPropagation();
            onMarkerClick(attraction);
          }}
        />
      ))}
    </Map>
  );
};

export default InteractiveMap;