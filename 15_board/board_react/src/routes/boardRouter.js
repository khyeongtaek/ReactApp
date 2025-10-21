import {lazy, Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";


const CreatePage = lazy(() => import("../pages/board/CreatePage"));
const ListPage = lazy(() => import("../pages/board/ListPage"));
const DetailPage = lazy(() => import("../pages/board/DetailPage"));
const UpdatePage = lazy(() => import("../pages/board/UpdatePage"));

export const boardRouter = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <ListPage/>
                        </Suspense>
                    ),
                },
                {
                    path: "boards",
                    children: [
                        {
                            index: true,
                            element: (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ListPage/>
                                </Suspense>
                            ),
                        },
                        {
                            path: "create",
                            element: (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <CreatePage/>
                                </Suspense>
                            ),
                        },
                        {
                            path: "detail/:bid",
                            element: (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <DetailPage/>
                                </Suspense>
                            ),
                        },
                        {
                            path: "update/:bid",
                            element: (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <UpdatePage/>
                                </Suspense>
                            )
                        }
                    ]
                }
            ]
        }
    ]
)
