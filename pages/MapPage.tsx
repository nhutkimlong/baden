import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import InteractiveMap from '../components/InteractiveMap';
import { PageProps, Attraction } from '../types';
import { SAMPLE_ATTRACTIONS } from '../constants';
import Tabs from '../components/Tabs';
import Drawer from '../components/Drawer';
import { MapPin } from 'lucide-react';
import Rating from '../components/Rating';

const MapPage: React.FC<Omit<PageProps, 'setActiveTab'>> = ({ navigateTo, theme, toggleTheme }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'spiritual', label: 'Tâm linh' },
    { id: 'entertainment', label: 'Giải trí' },
    { id: 'nature', label: 'Thiên nhiên' },
  ];

  const filteredAttractions = useMemo(() => SAMPLE_ATTRACTIONS.filter(
    (attraction) => activeCategory === 'all' || attraction.type === activeCategory
  ), [activeCategory]);

  const handleMarkerClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  
  return (
    <div className="flex flex-col h-full relative">
      <Header title="Bản đồ" theme={theme} toggleTheme={toggleTheme} />
      <div className="p-4 absolute top-16 left-0 right-0 z-10 bg-transparent">
        <Tabs tabs={tabs} activeTab={activeCategory} onTabClick={setActiveCategory} />
      </div>
      <div className="flex-1">
        <InteractiveMap 
          attractions={filteredAttractions} 
          onMarkerClick={handleMarkerClick}
        />
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
        {selectedAttraction && (
            <div className="p-4">
                <img src={selectedAttraction.image} alt={selectedAttraction.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
                <h2 className="text-2xl font-bold">{selectedAttraction.name}</h2>
                <div className="flex items-center my-2">
                    <Rating rating={selectedAttraction.rating} />
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        ({selectedAttraction.reviews} đánh giá)
                    </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 my-4">
                    {selectedAttraction.description}
                </p>
                <div className="flex">
                     <button 
                        onClick={() => navigateTo({ page: 'detail', attractionId: selectedAttraction.id })} 
                        className="w-full flex items-center justify-center gap-2 py-3 bg-green-700 text-white rounded-lg font-semibold transition-colors hover:bg-green-800"
                    >
                        <MapPin size={18} />
                        Xem chi tiết
                    </button>
                </div>
            </div>
        )}
      </Drawer>
    </div>
  );
};

export default MapPage;