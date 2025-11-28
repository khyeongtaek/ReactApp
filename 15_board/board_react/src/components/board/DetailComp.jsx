import { getBoard, deleteBoard } from "../../api/boardAPI";
import useBoardNavigate from "../../hooks/useBoardNavigate";
import { useState, useEffect } from "react";

const DetailComp = ({ bid }) => {
  // useBoardNavigate()
  const { goToListPage, goToUpdatePage } = useBoardNavigate();

  // useState()
  const [ board, setBoard ] = useState({
    bid: 0,
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });
  const [ error, setError ] = useState("");

  // 게시글 상세 정보 가져오는 함수
  const loadBoard = async () => {
    if (!bid)
      return;
    try {
      const responseData = await getBoard(bid);
      setBoard(responseData.data);
    } catch (error) {
      console.error("게시글 조회 실패:", error);
      setError(`게시글 ID = ${bid}인 게시글을 불러오는데 실패했습니다.`);
    }
  }

  // useEffect()
  useEffect(() => {
    loadBoard();
  }, [bid]);

  // handleDeleteClick (삭제 이벤트 핸들러)
  const handleDeleteClick = async () => {
    if ( !window.confirm("정말로 삭제하시겠습니까?") )
      return;

    try {
      const responseData = await deleteBoard(bid);
      alert(responseData.message);
      goToListPage();
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  }

  // 에러 발생 시 렌더링
  if (error) {
    return (
      <div>
        <p>{ error }</p>
        <button onClick={() => goToListPage()}>목록으로</button>
      </div>
    )
  }

  // 정상 렌더링
  return (
    <>
      {/* 게시글 정보 */}
      <div>
        <h3>{ board.title }</h3>
        <div>작성일자: { board.createdAt }</div>
        <div>수정일자: { board.updatedAt }</div>
        <div>{ board.content }</div>
      </div>
      {/* 버튼 그룹 */}
      <div>
        <button onClick={() => goToListPage()}>목록으로</button>
        <button onClick={() => goToUpdatePage(bid)}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </>
  );
};

export default DetailComp;