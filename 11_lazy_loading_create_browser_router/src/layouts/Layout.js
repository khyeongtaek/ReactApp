import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <div>
      <Header/>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet/>
        </Suspense>
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;