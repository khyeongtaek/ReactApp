import logo from './logo.svg';
import './App.css';
import Search from './pages/Search';
import Home from './pages/Home';
import { Link, Routes, Route } from 'react-router-dom';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
          <Link to="/search">Search</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/searchresult" element={<SearchResult/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
