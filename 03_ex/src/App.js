import logo from './logo.svg';
import './App.css';
import Layout from "./pages/Layout";
import Board from "./pages/Board";
import User from "./pages/User";
import {Link, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <nav>
                    <Link to="/">Layout</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="board" element={<Board/>}/>
                        <Route path="user" element={<User/>}/>
                    </Route>
                </Routes>

            </header>
        </div>
    );
}

export default App;
