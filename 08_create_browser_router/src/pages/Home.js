import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/">홈</Link> | <Link to="/about">소개</Link> | <Link to="/board">게시판</Link>
      </nav>
      <p>홈 페이지입니다.</p>
    </div>
  );
};

export default Home;