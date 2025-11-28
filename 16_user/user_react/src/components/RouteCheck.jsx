import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";  //----- useNavigate를 대신할 컴포넌트

/*
  Navigate 컴포넌트
  1. 조건부 렌더링 시 활용합니다. (컴포넌트의 렌더링 시점에 리다이렉트 동작)
  2. 간단한 조건으로 리다이렉트할 때 활용합니다.
  3. react-router-dom에서 제공합니다.
 */

const RouteCheck = ({ children} ) => {  // 실제로 표시할 컴포넌트를 children으로 받아옵니다.
  // 인증 여부에 따라 화면 구성을 다르게 하기 위해 isAutenticated 상태를 받아옵니다.
  const { isAuthenticated, isLoading } = useAuth();

  // 로딩 중 처리
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontSize: "1.5rem" }}>
        Loading ...
      </div>
    )
  }

  // 인증이 안 되었다면 로그인 페이지로 이동 (Navigate 컴포넌트 활용)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />  // replace : 히스토리를 남기지 않고 이동(로그인 페이지로 이동 후 이전 페이지로 이동할 수 없음)
  }
  /*
    참고. useNavigate()의 navigate 함수 이용하기(이 상황에서는 복잡함)
      (useEffect 이용해서 navigate 함수 호출 + 렌더링할 컴포넌트 반환)
    useEffect(() => }
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      }
    }, [isAuthenticated])

    return isAuthenticated ? children : null;
  */

  // 실제로 렌더링할 컴포넌트는 children
  // <RouterCheck>
  //   <이_컴포넌트가_렌더링됩니다./>
  // </RouterCheck>
  return children;
};

export default RouteCheck;