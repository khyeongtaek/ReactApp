import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import User from './pages/User';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/user/:uid" element={<User/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
