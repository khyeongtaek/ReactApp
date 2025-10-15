import React from 'react';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h3>Home Page</h3>
            <button onClick={() => navigate('/search')}>검색하러가기</button>
        </div>
    );
};

export default Home;