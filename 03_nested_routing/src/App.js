import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import General from './pages/General';
import Setting from './pages/Setting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}>
            {/* 중첩 라우팅의 하위 주소는 슬래시(/)로 시작하지 않습니다. */}
            <Route path="general" element={<General/>}/>
            <Route path="setting" element={<Setting/>}/> 
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
