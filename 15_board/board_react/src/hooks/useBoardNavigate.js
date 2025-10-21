import { useNavigate, useSearchParams } from "react-router-dom";

const useBoardNavigate = () => {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();

  // 등록 페이지로 이동
  const goToCreatePage = () => {
    navigate("/boards/create");
  }

  // 수정 페이지로 이동
  const goToUpdatePage = (bid) => {
    navigate(`/boards/update/${bid}`);
  }

  // 상세 페이지로 이동
  const goToDetailPage = (bid) => {
    navigate(`/boards/detail/${bid}`);
  }

  // 페이징 처리를 위한 파라미터
  const currentPageParams = {
    page: Number(searchParams.get("page")) || 1,
    size: Number(searchParams.get("size")) || 5,
    sort: searchParams.get("sort") || "createdAt,desc",
  }

  // 목록 페이지로 이동
  const goToListPage = (pageParams) => {
    // 페이징 처리를 위한 쿼리 스트링 처리
    const newPageParams = {
      ...currentPageParams,
      ...pageParams,
    }
    const queryString = new URLSearchParams({
      page: newPageParams.page.toString(),
      size: newPageParams.size.toString(),
      sort: newPageParams.sort,
    }).toString();

    navigate(`/boards?${queryString}`);
  }

  return {
    // 페이징 파라미터
    currentPageParams,
    // 네비게이션 함수
    goToCreatePage,
    goToUpdatePage,
    goToDetailPage,
    goToListPage,
  }
}

export default useBoardNavigate;