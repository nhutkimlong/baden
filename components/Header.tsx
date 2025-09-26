import React from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  theme?: Theme;
  toggleTheme?: () => void;
}

const ThemeToggle: React.FC<{ theme?: Theme; toggleTheme?: () => void }> = ({ theme, toggleTheme }) => {
    if (!theme || !toggleTheme) return null;
    return (
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    )
}

const Header: React.FC<HeaderProps> = ({ title, onBack, theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 shadow-sm z-10 flex items-center justify-between">
      <div className="flex items-center">
        {onBack && (
          <button onClick={onBack} className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-100">{title}</h1>
      </div>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;