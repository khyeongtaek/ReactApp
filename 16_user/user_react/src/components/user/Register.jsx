import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  // 폼의 입력 정보를 state로 선언
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  
  // 사용할 함수나 store가 관리하는 상태를 useAuth()를 이용해 가져옴
  const { register, isLoading, error, clearError } = useAuth();

  // 라우팅을 위해 navigate 함수 선언
  const navigate = useNavigate();

  // 입력 값이 바뀔때마다 state 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({  // 함수형 업데이트를 이용해 state 변경
      ...prev,
      [name]: value
    }));
    // 입력 중에는 에러 메시지 없애기
    if (error) {
      clearError();
    }
  };

  // 회원가입 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await register(formData);
      navigate("/dashboard");  // 회원가입 후 대시보드(마이페이지) 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div>
      {/* 에러가 있으면 에러 메시지 표시 */}
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
            disabled={isLoading}
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
            disabled={isLoading}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
        </div>
        
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nickname" style={{ display: "block", marginBottom: "0.5rem" }}>닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            disabled={isLoading}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading} 
          style={{ width: "100%", padding: "1rem", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px", cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          { isLoading ? "회원가입 처리 중 ..." : "회원가입" }
        </button>
      </form>
      
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>로그인</Link>
      </div>
    </div>
  );
};

export default Register;
