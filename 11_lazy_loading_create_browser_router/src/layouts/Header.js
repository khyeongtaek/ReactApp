import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h1>Website</h1>
            <nav>
                <Link to={"/"}>Home</Link> | <Link to={"/about"}>About</Link> | <Link to={"/board"}>Board</Link>
            </nav>
        </header>
    );
};

export default Header;