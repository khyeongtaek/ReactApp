import React from 'react';
import {useParams} from "react-router-dom";

const UpdatePage = () => {
    const {bid} = useParams();

    return (
        <div>
            <h3>수정 페이지</h3>
        </div>
    );
};

export default UpdatePage;