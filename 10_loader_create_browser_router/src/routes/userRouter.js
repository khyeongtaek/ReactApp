import {createBrowserRouter} from "react-router-dom";
import UserList from "../pages/UserList";
import UserDetail from "../pages/UserDetail";

export const userRouter = createBrowserRouter([
    {
        path: "/users",
        element: <UserList/>,
        loader: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            if(response.ok) {
                return response.json();
            }
        }
    },{
        path: "/users/:uid",
        element: <UserDetail/>,
        loader: async ({params}) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.uid}`)
            if(response.ok) {
                return response.json();
            }
        }
    }
]);