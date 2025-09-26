import React, { useEffect, useRef } from 'react';
import { Attraction } from '../types';

// Mapbox GL JS is loaded via script tag, declare its global for TypeScript
declare const mapboxgl: any;

interface InteractiveMapProps {
  attractions: Attraction[];
  onMarkerClick: (attraction: Attraction) => void;
}

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoibmh1dGtpbWxvbmciLCJhIjoiY21nMHIxenVqMGczaDJscHU5YnkxeXF2ZCJ9.S01ISxUUtMMqGbDD9k7KWA';
const MAP_CENTER: [number, number] = [106.1105, 11.3508]; // [lng, lat]
const MAP_ZOOM = 12;

const InteractiveMap: React.FC<InteractiveMapProps> = ({ attractions, onMarkerClick }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Initialize map effect
  useEffect(() => {
    // Prevent re-initialization
    if (mapInstanceRef.current || !mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
    });
    
    // Add controls for navigation (zoom) and geolocation
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true
    }));

    mapInstanceRef.current = map;

    // Add a central marker for "Núi Bà Đen" as requested
    new mapboxgl.Marker({ color: '#D63131' }) // Red color for main marker
        .setLngLat(MAP_CENTER)
        .setPopup(new mapboxgl.Popup().setHTML("<h3>Trung tâm khu du lịch Núi Bà Đen</h3>"))
        .addTo(map);

    // Clean up on component unmount
    return () => map.remove();
  }, []);

  // Update markers when attractions prop changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing attraction markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers for attractions
    attractions.forEach(attraction => {
      const marker = new mapboxgl.Marker()
        .setLngLat([attraction.location.lng, attraction.location.lat])
        .addTo(map);

      // Mapbox marker click event is on the DOM element
      marker.getElement().addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation(); // Prevent map click event when clicking on a marker
        onMarkerClick(attraction);
      });
      
      markersRef.current.push(marker);
    });
  }, [attractions, onMarkerClick]);


  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default InteractiveMap;
