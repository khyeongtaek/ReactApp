import { createBoard, getBoard, updateBoard } from "../../api/boardAPI";
import useBoardNavigate from "../../hooks/useBoardNavigate";
import { useState, useEffect, useCallback } from "react";

const FormComp = ({ isUpdate, bid = 0 }) => {
  // useBoardNavigate()
  const { goToListPage, goToDetailPage } = useBoardNavigate();
  
  // useState()
  const [ formData, setFormData ] = useState({
    title: "",
    content: "",
  });

  // 게시글 정보를 가져오는 함수
  const loadBoard = useCallback(async () => {
    if (!isUpdate || !bid)
      return;

    try {
      const responseData = await getBoard(bid);
      setFormData({
        title: responseData.data.title,
        content: responseData.data.content,
      });
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  }, [isUpdate, bid]);

  // useEffect()
  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  // handleChange (입력값 변경 핸들러)
  const handleChange = e => {
    const { name, value } = e.target;
    /* 값을 이용한 업데이트 함수 사용
    setFormData({
      ...formData,
      [name]: value,
    })
    */
    /* 콜백을 이용한 업데이트 함수 사용 (연속적으로 빠르게 이벤트가 호출되는 경우 안정적으로 동작) */
    setFormData((prev) => {
      return ({
        ...prev,
        [name]: value,
      })
    })
  }
  
  // handleSubmit (폼 제출 핸들러)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if ( !formData.title.trim() ) {
      alert("제목을 입력해주세요.");
      return;
    }

    // 등록 및 수정
    try {
      let responseData;
      if (isUpdate) {
        responseData = await updateBoard(bid, formData);
        alert(responseData.message);
        goToDetailPage(bid);
      } else {
        responseData = await createBoard(formData);
        alert(responseData.message);
        goToListPage();
      }
    } catch (error) {
      console.error("폼 제출 실패:", error);
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목 *</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={10} cols={40} />
        </div>
        <div>
          <button type="button" onClick={() => goToListPage()}>목록</button>
          <button type="button" onClick={ isUpdate ? () => goToDetailPage(bid) : () => goToListPage()}>취소</button>
          <button type="submit">{ isUpdate ? "수정" : "등록" }</button>
        </div>
      </form>
    </div>
  );
};

export default FormComp;