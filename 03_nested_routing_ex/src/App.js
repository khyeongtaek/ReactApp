import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import User from './pages/User';
import Board from './pages/Board';

function App() {
  return (
    <Routes>
      {/* 부모 경로 "/" -  Layout 컴포넌트 렌더링 */}
      <Route path="/" element={<Layout/>}>
        {/* 하위 index 경로 - "/" 경로에서는 Home 컴포넌트 렌더링 */}
        <Route index element={<Home/>} />
        {/* 하위 경로들 - 하위 경로에 따라서 User 컴포넌트나 Board 컴포넌트가 Layout 컴포넌트의 Outlet에 렌더링 */}
        <Route path="user" element={<User/>}/>
        <Route path="board" element={<Board/>}/>
      </Route>
    </Routes>
  );
}

export default App;
