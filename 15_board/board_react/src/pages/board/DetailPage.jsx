import React from 'react';
import {useParams} from "react-router-dom";

const DetailPage = () => {
    const {bid} = useParams();

    return (
        <div>
            <h3>{bid}번 게시글</h3>
        </div>
    );
};

export default DetailPage;