import React, {useEffect, useState} from 'react';
import axiosClient from "../api/userAxios";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosClient.get()
            .then(res => setUsers(res))
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <div>
            <ul>
                {
                    users.map(user => (
                        <li key={user.id}>
                            {user.name}<br/>
                            {user.email}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default UserList;