import React, { useState } from 'react';
import Header from '../components/Header';
import { SAMPLE_ATTRACTIONS } from '../constants';
import { Attraction, PageProps } from '../types';
import Tabs from '../components/Tabs';
import Rating from '../components/Rating';

const AttractionCard: React.FC<{ attraction: Attraction; onClick: () => void }> = ({ attraction, onClick }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={onClick}>
    <img src={attraction.image} alt={attraction.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg">{attraction.name}</h3>
      <p className="text-sm text-gray-500 capitalize dark:text-gray-400">{attraction.type}</p>
      <div className="flex items-center mt-2">
        <Rating rating={attraction.rating} />
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({attraction.reviews} đánh giá)</span>
      </div>
    </div>
  </div>
);

const DiscoverPage: React.FC<Omit<PageProps, 'setActiveTab'>> = ({ navigateTo, theme, toggleTheme }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'spiritual', label: 'Tâm linh' },
    { id: 'entertainment', label: 'Giải trí' },
    { id: 'nature', label: 'Thiên nhiên' },
  ];

  const filteredAttractions = SAMPLE_ATTRACTIONS.filter(
    (attraction) => activeCategory === 'all' || attraction.type === activeCategory
  );

  return (
    <div className="dark:bg-slate-900 min-h-full">
      <Header title="Khám phá" theme={theme} toggleTheme={toggleTheme} />
      <div className="p-4">
        <Tabs tabs={tabs} activeTab={activeCategory} onTabClick={setActiveCategory} />
        <div className="space-y-4">
          {filteredAttractions.map((attraction) => (
            <AttractionCard 
              key={attraction.id} 
              attraction={attraction}
              onClick={() => navigateTo({ page: 'detail', attractionId: attraction.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
