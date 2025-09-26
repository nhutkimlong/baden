import React, { useState } from 'react';
import { PageProps } from '../types';
import Header from '../components/Header';
import { Ticket, Plus, Minus } from 'lucide-react';

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ticketTypes: TicketType[] = [
  { id: 'adult', name: 'Vé người lớn', price: 350000, description: 'Vé cáp treo khứ hồi' },
  { id: 'child', name: 'Vé trẻ em', price: 250000, description: 'Cao từ 1m - 1m4' },
];

const BookingPage: React.FC<PageProps> = ({ navigateTo, theme, toggleTheme }) => {
  const [ticketCounts, setTicketCounts] = useState<{ [key: string]: number }>({
    adult: 1,
    child: 0,
  });
  
  const handleCountChange = (id: string, delta: number) => {
    setTicketCounts(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const totalAmount = ticketTypes.reduce((sum, ticket) => {
    return sum + ticket.price * (ticketCounts[ticket.id] || 0);
  }, 0);

  return (
    <div className="dark:bg-slate-900 min-h-full">
      <Header title="Đặt vé" onBack={() => navigateTo({ page: 'home' })} theme={theme} toggleTheme={toggleTheme} />
      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-lg flex items-center gap-2"><Ticket className="text-green-600"/> Chọn loại vé</h2>
          <div className="space-y-4 mt-4">
            {ticketTypes.map(ticket => (
              <div key={ticket.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{ticket.name}</p>
                  <p className="text-xs text-gray-500">{ticket.description}</p>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">{ticket.price.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleCountChange(ticket.id, -1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center"><Minus size={16}/></button>
                  <span className="font-bold w-6 text-center">{ticketCounts[ticket.id] || 0}</span>
                  <button onClick={() => handleCountChange(ticket.id, 1)} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center"><Plus size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
          <h2 className="font-bold text-lg flex items-center gap-2">Chọn ngày sử dụng</h2>
          <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="mt-2 w-full p-2 rounded-md border dark:bg-slate-700 dark:border-slate-600" />
        </div>

        <div className="mt-4">
            <div className="flex justify-between items-center font-bold text-lg">
                <span>Tổng cộng:</span>
                <span>{totalAmount.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <button className="w-full bg-green-700 text-white font-bold py-3 rounded-lg mt-2 shadow-lg hover:bg-green-800 transition-colors">
                Thanh toán
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
