import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

/* 
  lazy loading을 이용한 라우팅
  1. React.lazy와 React.Suspense를 활용해 코드를 분할하여(Code Splitting) 페이지 컴포넌트를 필요할때만 로드하는 기법입니다.
  2. 초기 번들 크기를 줄여 로딩 속도를 개선할 수 있습니다.
  3. 기본 구조와 설명
    1) React.lazy를 사용하여 컴포넌트를 동적으로 import합니다. 
      예시)
      React.lazy(() => import('./components/ComponentName'))
    2) React.Suspense를 사용하여 로딩 중에 보여줄 fallback UI를 설정합니다.
      fallback에는 컴포넌트나 JSX 요소를 사용할 수 있습니다.
      예시)
      <Suspense fallback={<div>Loading...</div>}>
    3) Route의 element 속성에 lazy 로드된 컴포넌트를 설정합니다.
      예시)
      <Route path="/path" element={<LazyComponent />} />
    4) Suspense는 반드시 lazy 로딩 컴포넌트를 감싸야 합니다.
*/

/*
  실행 팁.
  1. 실행 후 loading 확인을 위해 네트워크를 의도적으로 느리게 설정하고 확인합니다.
  2. [크롬 개발자 도구] - [네트워크] 탭 - [Throttle (속도 제한)] - [3G] 정도로 느리게 설정합니다.
*/

// import Home from './pages/Home';
// import About from './pages/About';
// import Board from './pages/Board';

// lazy loading으로 컴포넌트 불러오기
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Board = lazy(() => import('./pages/Board'));

// loading 중 표시할 컴포넌트
const Loading = () => {
  return (
    <div>Loading...</div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{width: '100px'}}/>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/board">Board</Link>
        </nav>
      </header>
      <main>
        {/* Suspence 내부에서 라우트 작업을 수행 */}
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/board" element={<Board/>}/>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
