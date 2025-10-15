import logo from './logo.svg';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <nav>
                    <Link to={"/"}>Home</Link> | <Link to={"/about"}>About</Link>
                </nav>
                <Routes>
                    <Route>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/about"} element={<About/>}/>
                    </Route>
                </Routes>

            </header>
        </div>
    );
}

export default App;
