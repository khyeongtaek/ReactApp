import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Navigation = () => {
  // store가 관리하는 상태와 함수 가져오기 (인증 상태라면 user 정보와 로그아웃 버튼 보여주기)
  const { loginUser, isAuthenticated, logout } = useAuth();

  // 로그아웃 이벤트
  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", backgroundColor: "#eee", borderBottom: "#888" }}>
      <div>
        <Link to="/" style={{ fontSize: "1.5rem", fontWeight: "bold", textDecoration: "none" }}>
          My App
        </Link>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        { isAuthenticated ? (
          <>
            <span>안녕하세요. {loginUser?.nickname}님!</span>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "blue" }}>
              대시보드
            </Link>
            <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
              로그인
            </Link>
            <Link to="/register" style={{ textDecoration: "none", color: "green" }}>
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
