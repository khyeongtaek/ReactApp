import logo from './logo.svg';
import './App.css';
import User from './pages/User';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
          <Link to="/user/1">User1</Link> | <Link to="/user/2">User2</Link>
        </nav>
        <Routes>
          {/* 경로변수는 콜론(:)을 붙여서 작성합니다. */}
          <Route path="/user/:uid" element={<User/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
