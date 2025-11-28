import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { loginUser } = useAuth();

  return (
    <div style={{ padding: "1.5rem", marginTop: "1rem" }}>
      <h4>사용자 정보</h4>
      <p><strong>이메일:</strong> {loginUser?.email}</p>
      <p><strong>닉네임:</strong> {loginUser?.nickname}</p>
    </div>
  );
};

export default Dashboard;