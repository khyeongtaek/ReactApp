import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1>Welcome Website</h1>
      {/* 네비게이션 링크 */}
      <nav className="main-nav">
        <Link to="/">홈</Link> | <Link to="/user">사용자</Link> | <Link to="/board">게시판</Link>
      </nav>
    </header>
  );
};

export default Header;