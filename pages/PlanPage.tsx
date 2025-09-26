import React, { useState } from 'react';
import { getItinerary } from '../services/geminiService';
import { PageProps } from '../types';
import Header from '../components/Header';
import SkeletonLoader from '../components/SkeletonLoader';
import { Wand2, Clock, MapPin, Utensils } from 'lucide-react';

interface ItineraryItem {
  time: string;
  activity: string;
  location: string;
  description: string;
}

const PlanPage: React.FC<PageProps> = ({ navigateTo, theme, toggleTheme }) => {
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState<ItineraryItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = async () => {
    if (preferences.trim() === '') return;
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    try {
      const responseJson = await getItinerary(preferences);
      // FIX: Removed cleanup of markdown fences as responseSchema should provide clean JSON.
      const parsedData = JSON.parse(responseJson);
      if (parsedData.itinerary) {
        setItinerary(parsedData.itinerary);
      } else {
        throw new Error("Invalid itinerary format from AI.");
      }
    } catch (err) {
      console.error(err);
      setError('Không thể tạo lịch trình. Vui lòng thử lại với yêu cầu khác.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGeneratePlan();
    }
  };

  return (
    <div className="dark:bg-slate-900 min-h-full">
      <Header title="Lên lịch trình AI" onBack={() => navigateTo({ page: 'home' })} theme={theme} toggleTheme={toggleTheme} />
      <div className="p-4 space-y-4">
        <div>
          <label className="text-sm font-medium dark:text-slate-300">Bạn muốn làm gì hôm nay?</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="VD: đi ngắm cảnh, ăn chay, ít leo trèo"
              className="flex-1 px-4 py-2 border dark:border-slate-600 rounded-full bg-gray-100 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              disabled={isLoading}
            />
            <button
              onClick={handleGeneratePlan}
              disabled={isLoading}
              className="bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg disabled:bg-green-400"
            >
              <Wand2 size={20} />
            </button>
          </div>
        </div>
        
        {isLoading && (
          <div className="space-y-4">
            <SkeletonLoader className="h-24" />
            <SkeletonLoader className="h-24" />
            <SkeletonLoader className="h-24" />
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {itinerary && (
          <div className="space-y-4">
             <h2 className="text-xl font-bold dark:text-white">Lịch trình gợi ý của bạn:</h2>
            {itinerary.map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                 <div className="flex items-center gap-3 mb-2">
                    <Clock size={16} className="text-green-600" />
                    <p className="font-bold text-lg">{item.time}</p>
                 </div>
                 <h3 className="font-semibold text-xl ml-8">{item.activity}</h3>
                 <div className="flex items-center gap-3 mt-1 ml-8 text-sm text-gray-600 dark:text-gray-400">
                    {item.location.toLowerCase().includes("ăn") || item.location.toLowerCase().includes("nhà hàng") ? <Utensils size={14} /> : <MapPin size={14} />}
                    <span>{item.location}</span>
                 </div>
                 <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 ml-8">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanPage;
