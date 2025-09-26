import React, { useState, useEffect } from 'react';
import { View, Theme } from './types';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import AiChatPage from './pages/AiChatPage';
import MapPage from './pages/MapPage';
import PlanPage from './pages/PlanPage';
import BookingPage from './pages/BookingPage';
import FoodPage from './pages/FoodPage';
import ReviewsPage from './pages/ReviewsPage';
import DetailPage from './pages/DetailPage';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [view, setView] = useState<View>({ page: 'home' });
  const [activeTab, setActiveTab] = useState<View['page']>('home');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = window.localStorage.getItem('theme') as Theme;
        return savedTheme || 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const navigateTo = (newView: View) => {
    setView(newView);
    // Sync bottom nav active tab if it's a main page
    if (['home', 'discover', 'ai', 'map'].includes(newView.page)) {
      setActiveTab(newView.page);
    }
  };

  const renderPage = () => {
    const pageProps = { navigateTo, theme, toggleTheme, setActiveTab };
    switch (view.page) {
      case 'home':
        return <HomePage {...pageProps} />;
      case 'discover':
        return <DiscoverPage {...pageProps} />;
      case 'ai':
        return <AiChatPage {...pageProps} />;
      case 'map':
        return <MapPage {...pageProps} />;
      case 'plan':
        return <PlanPage {...pageProps} />;
      case 'booking':
        return <BookingPage {...pageProps} />;
      case 'food':
        return <FoodPage {...pageProps} />;
      case 'reviews':
        return <ReviewsPage {...pageProps} attractionId={view.attractionId} />;
      case 'detail':
        return <DetailPage {...pageProps} attractionId={view.attractionId!} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col font-sans relative bg-gray-50 dark:bg-slate-900">
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {renderPage()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={(tab) => navigateTo({ page: tab })} />
    </div>
  );
};

export default App;
