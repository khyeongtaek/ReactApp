import { useLoaderData, Link } from 'react-router-dom';

const UserList = () => {
  // createBrowserRouter() 함수의 loader를 이용해 가져온 데이터는 useLoaderData() 훅으로 가져옵니다.
  const users = useLoaderData();
  return (
    <div>
      <h1>사용자 목록</h1>
      <ul>
        {
          users.map(user => {
            return (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.email}</Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default UserList;