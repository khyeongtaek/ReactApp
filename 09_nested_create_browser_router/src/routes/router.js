import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Board from "../pages/Board";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  // 부모 라우트 (인덱스 경로)
  {
    path: "/",
    element: <Layout/>,
    // 중첩된 자식 라우트 (부모 <Layout/>의 <Outlet/>에 렌더링됩니다.)
    children: [
      // Home (부모 경로를 그대로 사용)
      {
        index: true,
        element: <Home/>,
      },
      // About (부모 라우트의 상대 경로로 작성 : "/" + "about" = "/about")
      {
        path: "about",
        element: <About/>,
      },
      // Board
      {
        path: "board",
        element: <Board/>,
      }
    ]
  },
  // 그 외 경로
  {
    path: "*",
    element: <NotFound/>,
  },
])