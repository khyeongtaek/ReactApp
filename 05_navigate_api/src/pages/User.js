import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

const User = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    return (
        <div>
            <h3>User</h3>
            <h4>User ID: {uid}</h4>
            <button onClick={() => navigate('/')}>Home</button>

        </div>
    );
};

export default User;