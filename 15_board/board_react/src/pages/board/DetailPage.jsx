import { useParams } from 'react-router-dom';

const DetailPage = () => {
  // "/boards/detail/:bid" 경로변수 값 꺼내기
  const { bid } = useParams();
  return (
    <div>
      <h3>{ bid }번 게시글</h3>
    </div>
  );
};

export default DetailPage;