import { useEffect, useState } from 'react';
import axiosClient from '../api/userAxios';

const UserList = () => {
  
  // state
  const [ users, setUsers ] = useState([]);
  
  // useEffect
  useEffect(() => {
    
    /* axiosClient 적용 이전 */
    // import axios from 'axios';
    // axios.get("https://jsonplaceholder.typicode.com/users")
    //   .then(response => setUsers(response.data));
    
    /* axiosClient 적용 이후 */
    axiosClient.get()
      .then(jsonData => setUsers(jsonData));

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