import { useParams } from 'react-router-dom';
import FormComp from '../../components/board/FormComp';

const UpdatePage = () => {
  // "/boards/update/:bid" 경로변수 값 꺼내기
  const { bid } = useParams();
  return (
    <div>
        <h3>게시글 수정</h3>
        <FormComp isUpdate={true} bid={bid}/>
      
    </div>
  );
};

export default UpdatePage;