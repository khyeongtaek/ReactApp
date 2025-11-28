const PageComp = ({ onPageChange, currentPageParams, pageData }) => {
  // pageData 체크
  if ( !pageData ) {
    return null;
  }

  // pageData에 저장된 요소 꺼내기
  const { 
    //first,        // 첫 페이지 여부
    //last,         // 마지막 페이지 여부
    //totalElements,// 전체 게시글 수
    totalPages,     // 전체 페이지 수
    //size,         // 사이즈 (한 페이지에 포함하는 게시글 수)
    number,         // 현재 페이지 번호
  } = pageData;

  // 부트 서버가 제공한 현재 페이지 번호는 0으로 시작하므로 1로 조정함
  const currentPage = number + 1;
   
  // 페이지 번호를 배열로 만들어서 반환하는 함수
  const getPageNumbers = () => {
    const pagePerBlock = 5;
    const pages = [];

    let beginPage = Math.max(1, currentPage - Math.floor(pagePerBlock / 2));
    let endPage = Math.min(totalPages, beginPage + pagePerBlock - 1);

    // endPage의 변화에 따른 beginPage 조정
    if (endPage - beginPage < pagePerBlock - 1)
      beginPage = Math.max(1, endPage - pagePerBlock + 1);

    for (let i = beginPage; i <= endPage; i++)
      pages.push(i);

    return pages;  // return [1,2,3,4,5]
  }

  // 페이지 번호 배열
  const pages = getPageNumbers();

  // 페이지 이동 이벤트 핸들러
  const handlePageClick = (pageNumber) => {
    // 1 페이지 ~ 마지막 페이지 사이만 이동
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange({ ...currentPageParams, page: pageNumber });
    }
  }

  return (
    <div>
      {/* 이전 페이지 */}
      <button onClick={() => handlePageClick(currentPage - 1)}>이전</button>
      {/* 페이지 번호들 */}
      {pages.map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      {/* 다음 페이지 */}
      <button onClick={() => handlePageClick(currentPage + 1)}>다음</button>
    </div>
  );
};

export default PageComp;