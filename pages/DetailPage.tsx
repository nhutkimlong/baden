import React from 'react';
import { PageProps } from '../types';
import { SAMPLE_ATTRACTIONS } from '../constants';
import Header from '../components/Header';
import ImageCarousel from '../components/ImageCarousel';
import Rating from '../components/Rating';
import { MapPin, Ticket, Star } from 'lucide-react';

const DetailPage: React.FC<PageProps> = ({ navigateTo, theme, toggleTheme, attractionId }) => {
  const attraction = SAMPLE_ATTRACTIONS.find(a => a.id === attractionId);

  if (!attraction) {
    return (
      <div>
        <Header title="Không tìm thấy" onBack={() => navigateTo({ page: 'discover' })} theme={theme} toggleTheme={toggleTheme}/>
        <p className="p-4">Không tìm thấy địa điểm này.</p>
      </div>
    );
  }

  return (
    <div>
      <Header title={attraction.name} onBack={() => navigateTo({ page: 'discover' })} theme={theme} toggleTheme={toggleTheme}/>
      <ImageCarousel images={attraction.images} />
      <div className="p-4">
        <h1 className="text-2xl font-bold dark:text-white">{attraction.name}</h1>
        <div className="flex items-center my-2">
          <Rating rating={attraction.rating} />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            {attraction.rating} ({attraction.reviews} đánh giá)
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 my-4">{attraction.description}</p>
        
        <div className="space-y-3">
            <button onClick={() => navigateTo({ page: 'map' })} className="w-full flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700">
                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-2 rounded-full">
                    <MapPin size={20} />
                </div>
                <div>
                    <p className="font-semibold text-left">Xem trên bản đồ</p>
                </div>
            </button>
            <button onClick={() => navigateTo({ page: 'reviews', attractionId: attraction.id })} className="w-full flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700">
                <div className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 p-2 rounded-full">
                    <Star size={20} />
                </div>
                <div>
                    <p className="font-semibold text-left">Xem đánh giá</p>
                </div>
            </button>
             <button onClick={() => navigateTo({ page: 'booking' })} className="w-full flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700">
                <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-2 rounded-full">
                    <Ticket size={20} />
                </div>
                <div>
                    <p className="font-semibold text-left">Đặt vé ngay</p>
                </div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
