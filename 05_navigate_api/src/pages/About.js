import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>About</h3>
      <p>About Page</p>
      <button onClick={e => navigate("/")}>홈으로이동</button>
    </div>
  );
};

export default About;