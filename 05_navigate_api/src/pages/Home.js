import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleAboutClick = e => {
        navigate("/about");
    }
    const handleUserClick = e => {
        const uid = e.target.dataset.uid;
        navigate(`/user/${uid}`);
    }
    return (
        <div>
            <h3>HOME</h3>
            <button onClick={handleAboutClick}>About</button>
            <button onClick={handleUserClick} data-uid={"1"}>User</button>

        </div>
    );
};

export default Home;