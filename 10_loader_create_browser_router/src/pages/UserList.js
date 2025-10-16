import React from 'react';
import {Link, useLoaderData} from "react-router-dom";

const UserList = () => {
    const users = useLoaderData();
    return (
        <div>
            <h1>사용자 목록</h1>
            <ul>
                {
                    users.map(user =>
                        <li key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                {user.email}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default UserList;