import {createBrowserRouter} from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Board from '../pages/Board';
import NotFound from '../pages/NotFound';
import Layout from "../layouts/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            }, {
                path: "about",
                element: <About/>,
            }, {
                path: "board",
                element: <Board/>,
            }
        ]
    }, {
        path: "*",
        element: <NotFound/>,
    }

]);