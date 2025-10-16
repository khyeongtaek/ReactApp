import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

/*
  static routing
  1. 기본 라우팅 방식입니다.
  2. URL 경로와 컴포넌트를 미리 정의해 두는 방식입니다.
  3. URL 경로가 항상 동일합니다.
*/
/*
  <Link>
  1. react-router-dom에서 제공하는 컴포넌트입니다. <a> 태그와 유사하게 동작합니다.
  2. <a> 태그는 전체 페이지를 새로 고침하지만, <Link> 컴포넌트는 일부 컴포넌트만 새롭게 표시합니다. (클라이언트 사이드 라우팅)
  3. to 속성을 이용해 경로를 작성합니다.
  4. 활성화 상태(active) 관리 기능이 없습니다.
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </nav>
        {/* 경로에 따라서 컴포넌트를 선택해서 엽니다. */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
