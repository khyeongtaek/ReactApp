import React from 'react';
import {useNavigate} from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h3>ABOUT</h3>
            <button onClick={e => navigate('/')}>Home</button>
        </div>
    );
};

export default About;