import { useParams } from 'react-router-dom';

const UpdatePage = () => {
  // "/boards/update/:bid" 경로변수 값 꺼내기
  const { bid } = useParams();
  return (
    <div>
      
    </div>
  );
};

export default UpdatePage;