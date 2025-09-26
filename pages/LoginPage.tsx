import React from 'react';
import Header from '../components/Header';
import { PageProps } from '../types';

const LoginPage: React.FC<PageProps> = ({ navigateTo, theme, toggleTheme }) => {
  return (
    <div>
      <Header title="Đăng nhập" onBack={() => navigateTo({ page: 'home' })} theme={theme} toggleTheme={toggleTheme}/>
      <div className="p-4">
        <p>Trang đăng nhập đang được xây dựng.</p>
      </div>
    </div>
  );
};
export default LoginPage;
