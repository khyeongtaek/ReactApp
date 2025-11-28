import { useParams } from 'react-router-dom';
import DetailComp from '../../components/board/DetailComp';

const DetailPage = () => {
  // "/boards/detail/:bid" 경로변수 값 꺼내기
  const { bid } = useParams();
  return <DetailComp bid={bid} />
};

export default DetailPage;