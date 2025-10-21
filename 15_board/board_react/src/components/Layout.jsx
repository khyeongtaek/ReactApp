import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* Header Content */}
      <header>
        <h1 style={{ textAlign: "center" }}>
          Board 게시판
        </h1>
        <nav style={{ display: "flex" }}>
          <Link to="/">게시판</Link>
          <Link to="/boards">목록</Link>
          <Link to="/boards/create">글쓰기</Link>
        </nav>
      </header>
      
      {/* Main Content */}
      <main style={{ width: "1200px", margin: "0 auto", padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;