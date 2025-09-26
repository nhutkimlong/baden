import React from 'react';
import { Sun, MapPin } from 'lucide-react';
import { SAMPLE_EVENTS, SAMPLE_SUGGESTIONS } from '../constants';
import { PageProps, View } from '../types';
import Header from '../components/Header';

const BentoCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm p-4 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg ${onClick ? 'cursor-pointer' : ''} ${className}`}
        >
            {children}
        </div>
    );
};


const HomePage: React.FC<Omit<PageProps, 'setActiveTab'>> = ({ navigateTo, theme, toggleTheme }) => {
  const firstSuggestion = SAMPLE_SUGGESTIONS[0];
  const FirstSuggestionIcon = firstSuggestion.icon;

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-full">
      <Header title="Xin chào!" theme={theme} toggleTheme={toggleTheme} />
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-400 -mt-2 mb-6">Khám phá vẻ đẹp Núi Bà Đen</p>
        
        <div className="grid grid-cols-2 grid-rows-4 gap-4 h-[600px]">
            {/* Weather */}
            <BentoCard className="col-span-2 row-span-1 bg-gradient-to-br from-green-600 to-green-800 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-light">Thời tiết hôm nay</p>
                        <p className="text-4xl font-bold">28°C</p>
                    </div>
                    <Sun size={60} className="opacity-80" />
                </div>
                <p className="font-light text-right">Nắng đẹp, trời trong</p>
            </BentoCard>

            {/* AI Suggestion */}
            <BentoCard className="col-span-1 row-span-2" onClick={() => navigateTo(firstSuggestion.action)}>
                <FirstSuggestionIcon size={28} className="text-green-500" />
                <div className="mt-auto">
                    <p className="font-bold text-lg">{firstSuggestion.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{firstSuggestion.description}</p>
                </div>
            </BentoCard>

            {/* Map */}
            <BentoCard className="col-span-1 row-span-2 relative overflow-hidden" onClick={() => navigateTo({ page: 'map' })}>
                 <img src="https://picsum.photos/seed/map/400/400" alt="Mini map" className="absolute inset-0 w-full h-full object-cover opacity-50"/>
                 <div className="relative z-10 flex flex-col h-full">
                    <MapPin size={28} className="text-red-500" />
                    <div className="mt-auto">
                        <p className="font-bold text-lg text-gray-800">Bản đồ</p>
                        <p className="text-sm text-gray-600">Tìm đường và khám phá</p>
                    </div>
                 </div>
            </BentoCard>

            {/* Event */}
            <BentoCard className="col-span-2 row-span-1 relative overflow-hidden" onClick={() => alert('Xem chi tiết sự kiện')}>
                <img src={SAMPLE_EVENTS[0].image} alt={SAMPLE_EVENTS[0].title} className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative z-10 flex flex-col h-full text-white">
                    <div className="mt-auto">
                        <p className="font-bold text-lg">{SAMPLE_EVENTS[0].title}</p>
                        <p className="text-sm">{SAMPLE_EVENTS[0].date}</p>
                    </div>
                </div>
            </BentoCard>
        </div>

        <section className="mt-6">
            <h2 className="text-xl font-bold mb-3 dark:text-white">Gợi ý cho bạn</h2>
            <div className="space-y-3">
                 {SAMPLE_SUGGESTIONS.slice(1).map(suggestion => {
                    const SuggestionIcon = suggestion.icon;
                    return (
                     <div key={suggestion.id} onClick={() => navigateTo(suggestion.action)} className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700">
                        <div className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-2 rounded-full">
                           <SuggestionIcon size={20} />
                        </div>
                        <div>
                           <p className="font-semibold">{suggestion.title}</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400">{suggestion.description}</p>
                        </div>
                     </div>
                    );
                 })}
            </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;