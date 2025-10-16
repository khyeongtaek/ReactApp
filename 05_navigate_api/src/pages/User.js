import { useParams, useNavigate } from 'react-router-dom';

const User = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h3>User</h3>
      <p>User ID : {uid}</p>
      <button onClick={e => navigate("/")}>홈으로이동</button>
    </div>
  );
};

export default User;