import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="wrap">
      
      {/* 상단 헤더(모든 페이지 공통) */}
      <Header/>

      {/* 메인 콘텐츠(하위 라우트 컴포넌트가 표시) */}
      <main className="main-content">
        <Outlet/>
      </main>
      
      {/* 하단 푸터(모든 페이지 공통) */}
      <Footer/>
      
    </div>
  );
};

export default Layout;