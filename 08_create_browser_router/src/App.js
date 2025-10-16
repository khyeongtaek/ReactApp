import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      {/* <BrowserRouter>, <RouterProvider>와 같이 React Router의 Context를 가진 컴포넌트 내부에서만 <Link> 사용 가능합니다. */}
      {/*<nav>
        <Link to="/">홈</Link> | <Link to="/about">소개</Link> | <Link to="/board">게시판</Link>
      </nav>*/}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
