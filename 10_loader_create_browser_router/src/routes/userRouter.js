import { createBrowserRouter } from 'react-router-dom';
import UserList from '../pages/UserList';
import UserDetail from '../pages/UserDetail';

export const userRouter = createBrowserRouter([
  // users
  {
    path: "/users",
    element: <UserList/>,
    loader: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      return response.json();
    }
  },
  // users/1
  {
    path: "/users/:uid",
    element: <UserDetail/>,
    loader: async ({ params }) => {  // params = { uid: "1" } -> 경로변수만 꺼내서 사용
      const uid = params.uid;
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${uid}`);
      return response.json();
    },
    
  }
])