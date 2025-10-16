import { Link, Outlet } from 'react-router-dom';

/*
  <Outlet>
  1. 중첩된 라우팅 구조에서 자식 라우트 컴포넌트가 렌더링되는 위치를 지정하는 컴포넌트입니다.
  2. 중첩된 경로를 작성하는 경우 부모 경로의 상대 경로로 자식 경로를 작성합니다.
  3. Context를 통해 데이터를 전달할 수 있습니다.
*/

const Dashboard = () => {
  // Outlet으로 보낼 데이터
  const data = { name: 'kim', age: 30 };
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="general">General</Link> | <Link to="setting">Setting</Link>
      </nav>
      <Outlet context={data} />
    </div>
  );
};

export default Dashboard;