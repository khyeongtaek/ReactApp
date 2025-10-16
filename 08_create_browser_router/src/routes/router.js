// createBrowserRouter() = <BrowserRouter> + <Routes> + <Route> 대체

/*
  createBrowserRouter()
  1. React Router v6.4에서 도입된 새로운 라우터 생성 함수입니다.
  2. 기존 <BrowserRouter>보다 더 많은 기능을 제공하고, 객체 기반의 라우트 구성이 가능합니다.
  3. <RouterProvider>와 함께 사용합니다.
*/

import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Board from '../pages/Board';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  // 각 라우트를 객체 형식으로 정의
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/board",
    element: <Board/>,
  },
  {
    path: "*",
    element: <NotFound/>,
  }
]);