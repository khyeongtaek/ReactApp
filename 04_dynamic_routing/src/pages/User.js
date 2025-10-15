import React from 'react';
import {useParams} from "react-router-dom";

const User = () => {
    const { uid } = useParams();
    return (
        <div>
            <h3>User ID: {uid}</h3>
        </div>
    );
};

export default User;