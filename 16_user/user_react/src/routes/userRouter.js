import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "../components/Layout";
import RouteCheck from "../components/RouteCheck";

const HomePage = lazy(() => import("../pages/user/HomePage"));
const LoginPage = lazy(() => import("../pages/user/LoginPage"));
const RegisterPage = lazy(() => import("../pages/user/RegisterPage"));
const DashboardPage = lazy(() => import("../pages/user/DashboardPage"));

// 로딩 컴포넌트
const LoadingComponent = () => (
  <div style={{
    textAlign: "center",
    height: "200px",
    fontSize: "1.5rem",
  }}>
    Loading ...
  </div>
);

export const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingComponent/>}>
            <HomePage />,
          </Suspense>
        )
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingComponent/>}>
            <LoginPage />,
          </Suspense>
        )
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingComponent/>}>
            <RegisterPage />,
          </Suspense>
        )
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<LoadingComponent/>}>
            <RouteCheck>
              <DashboardPage />
            </RouteCheck>
          </Suspense>
        ),
      },
    ],
  },
]);