import logo from './logo.svg';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import User from "./pages/User";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <nav>
                    <Link to={"/user/1"}>User1</Link> | <Link to={"/user/2"}>User2</Link>
                </nav>
                <Routes>
                    <Route path={"/user/:uid"} element={<User/>}/>
                </Routes>
            </header>
        </div>
    );
}

export default App;
