import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";

// lazy loading으로 처리할 컴포넌트
const CreatePage = lazy(() => import("../pages/board/CreatePage"));
const ListPage = lazy(() => import("../pages/board/ListPage"));
const DetailPage = lazy(() => import("../pages/board/DetailPage"));
const UpdatePage = lazy(() => import("../pages/board/UpdatePage"));

// 라우터 설정
export const boardRouter = createBrowserRouter([
  // 부모 라우트
  {
    path: "/",
    element: <Layout/>,
    // "/" 자식 라우트 (<Layout>의 <Outlet>에 렌더링할 페이지)
    children: [
      //----- "/"
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ListPage />
          </Suspense>
        ),
      },
      {
        path: "boards",
        // "/boards" 하위 라우트
        children: [
          //----- "/boards"
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ListPage/>
              </Suspense>
            ),
          },
          //----- "/boards/create"
          {
            path: "create",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <CreatePage/>
              </Suspense>
            ),
          },
          {
            //----- "/boards/detail/1"
            path: "detail/:bid",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <DetailPage/>
              </Suspense>
            ),
          },
          {
            //----- "/boards/update/1"
            path: "update/:bid",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <UpdatePage/>
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);