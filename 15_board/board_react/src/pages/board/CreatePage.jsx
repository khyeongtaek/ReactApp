import FormComp from '../../components/board/FormComp';

const CreatePage = () => {
  return (
    <div>
      <h3>게시글 등록</h3>
      <FormComp isUpdate={false} />
    </div>
  );
};

export default CreatePage;