import React from 'react';
import { Home, Compass, MessageCircle, Map } from 'lucide-react';
import { View } from '../types';

interface BottomNavProps {
  activeTab: View['page'];
  setActiveTab: (tab: View['page']) => void;
}

const navItems: { id: View['page']; icon: React.ElementType; label: string }[] = [
  { id: 'home', icon: Home, label: 'Trang chủ' },
  { id: 'discover', icon: Compass, label: 'Khám phá' },
  { id: 'ai', icon: MessageCircle, label: 'AI Chat' },
  { id: 'map', icon: Map, label: 'Bản đồ' },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-slate-700 shadow-t-lg">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full py-2 px-1 text-sm transition-colors duration-200 ${
              activeTab === item.id ? 'text-green-600' : 'text-gray-500 dark:text-gray-400 hover:text-green-500'
            }`}
          >
            <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className={`mt-1 text-xs font-medium ${activeTab === item.id ? 'font-bold' : ''}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
