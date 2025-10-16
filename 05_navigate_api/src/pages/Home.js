import { useNavigate } from 'react-router-dom';

/*
  useNavigate()
  1. react-router-dom에서 제공하는 훅으로 다른 경로로 이동할 수 있는 함수를 반환합니다.
  2. 버튼 클릭과 같은 이벤트 발생 시 경로를 변경하는 경우에 주로 사용합니다.
*/

const Home = () => {

  // useNavigate()
  const navigate = useNavigate();  // navigate는 함수

  // event handler
  const handleAboutClick = e => {
    navigate("/about");
  }

  const handleUserClick = e => {
    const uid = e.target.dataset.uid;
    navigate(`/user/${uid}`);
  }

  return (
    <div>
      <h3>Home</h3>
      <button onClick={handleAboutClick}>About</button>
      <button onClick={handleUserClick} data-uid="1">User</button>
    </div>
  );

};

export default Home;