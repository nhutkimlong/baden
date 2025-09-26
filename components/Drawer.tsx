import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      {/* Drawer Content */}
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto z-30 bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'transform translate-y-0' : 'transform translate-y-full'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        <div className="p-2 flex justify-center">
            <div className="w-10 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
          <X size={20} />
        </button>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 50px)' }}>
            {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;