import React from 'react';
import {Link, useLoaderData} from "react-router-dom";

const UserDetail = () => {
    const user = useLoaderData();
    return (
        <div>
            <h1>사용자 상세 조회</h1>
            <p>이름: {user.name}</p>
            <p>이메일: {user.email}</p>
            <p>전화번호: {user.phone}</p>
            <p>주소: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
            <Link to={"/users"}>목록으로 돌아가기</Link>
        </div>
    );
};

export default UserDetail;