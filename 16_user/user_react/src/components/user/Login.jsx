import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  // 폼의 입력 내용을 state로 설정
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  // 로그인 시 필요한 상태와 함수 가져오기
  const { login, isLoading, error, clearError } = useAuth();

  // navigate 함수 선언
  const navigate = useNavigate();

  // 폼의 입력 상자 내용이 변경되면 곧바로 state에 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 입력 시 에러 메시지를 없앰
    if (error) {
      clearError();
    }
  };

  // 로그인 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 로그인 수행 후 성공하면 대시보드로 이동
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <>
      {/* 에러 발생 시 에러 메시지 표시 */}
      { error && (
        <div style={{ color: "red", backgroundColor: "lightpink", borderRadius: "5px", marginBottom: "1rem", padding: "0.5rem" }}>
          {error}
        </div>
      ) }
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}  // 로딩중이면 비활성화
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
        </div>
        
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem" }}>비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}  // 로딩중이면 비활성화
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading} 
          style={{ width: "100%", padding: "1rem", backgroundColor: "lightblue", color: "white", border: "none", borderRadius: "5px", cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          { isLoading ? "로그인 중..." : "로그인" }
        </button>
      </form>
      
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link to="/register" style={{ textDecoration: "none", color: "green" }}>회원가입</Link>
      </div>
    </>
  );
};

export default Login;
