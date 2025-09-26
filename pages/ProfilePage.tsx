import React from 'react';
import Header from '../components/Header';
import { PageProps } from '../types';

const ProfilePage: React.FC<PageProps> = ({ navigateTo, theme, toggleTheme }) => {
  return (
    <div>
      <Header title="Hồ sơ" onBack={() => navigateTo({ page: 'home' })} theme={theme} toggleTheme={toggleTheme}/>
      <div className="p-4">
        <p>Trang hồ sơ đang được xây dựng.</p>
      </div>
    </div>
  );
};
export default ProfilePage;
