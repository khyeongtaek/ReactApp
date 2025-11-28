import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  // 인증 여부에 따라 화면을 다르게 구성하기 위해 가져옴 (사용자 정보를 보여주거나 로그인/회원가입 안내)
  const { isAuthenticated, loginUser } = useAuth();

  return (
    <>
      { isAuthenticated ? (
        <div>
          <p style={{ margin: "1.5rem 0" }}>안녕하세요, {loginUser?.nickname}님!</p>
          <Link to="/dashboard" style={{ display: "inline-block", padding: "1rem 2rem", textDecoration: "none", borderRadius: "5px", backgroundColor: "skyblue", color: "white" }}>대시보드로 가기</Link>
        </div>
      ) : (
        <div>
          <p style={{ margin: "1.5rem 0" }}>시작하려면 로그인하거나 회원가입하세요.</p>
          <div>
            <Link to="/login" style={{ display: "inline-block", padding: "1rem 2rem", textDecoration: "none", borderRadius: "5px", backgroundColor: "skyblue", color: "white" }}>로그인</Link>
            <Link to="/register" style={{ display: "inline-block", padding: "1rem 2rem", textDecoration: "none", borderRadius: "5px", backgroundColor: "green", color: "white" }}>회원가입</Link>
          </div>
        </div>
      ) }
    </>
  );
};

export default Home;
