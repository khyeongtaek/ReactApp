import {createBrowserRouter} from 'react-router-dom';
import {lazy} from "react";
import Layout from "../layouts/Layout";


// import Home from '../pages/Home';
// import About from '../pages/About';
// import Board from '../pages/Board';
// import NotFound from '../pages/NotFound';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Board = lazy(() => import('../pages/Board'));
const NotFound = lazy(() => import('../pages/NotFound'));


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