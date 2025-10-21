import useBoardNavigate from "../../hooks/useBoardNavigate";
import {getBoardList} from "../../api/boardAPI";
import {useCallback, useEffect, useState} from "react";
import PageComp from "../common/PageComp";

// 초기 state 
const INITIAL_SERVER_DATA = {
    status: 0,
    message: "",
    data: {
        content: [],          // 게시글 목록
        pageable: {},         // 페이징 정보
        first: false,         // 첫 페이지 여부
        last: false,          // 마지막 페이지 여부
        totalElements: 0,     // 전체 게시글 수
        totalPages: 0,        // 전체 페이지 수
        size: 0,              // 사이즈 (한 페이지에 포함하는 게시글 수)
        number: 0,            // 현재 페이지 번호
        numberOfElements: 0,  // 현재 페이지에 포함된 게시글 수
        empty: false,         // 목록이 비어있는지 여부
    }
}

const ListComp = () => {
    // useBoardNavigate()
    const {currentPageParams, goToDetailPage, goToCreatePage, goToListPage} = useBoardNavigate();
    const {page, size, sort} = currentPageParams;

    // useState()
    const [serverData, setServerData] = useState(INITIAL_SERVER_DATA);

    /* useCallback() 없는 버전 */
    /*
    // 서버 데이터(게시글 목록) 가져오는 함수
    const getServerData = async () => {
      try {
        const responseData = await getBoardList( { common, size, sort } );
        setServerData(responseData);
      } catch (error) {
        console.error("게시글 목록 로드 실패:", error);
      }
    };

    // useEffect()
    useEffect(() => {
      getServerData();
    }, [common, size, sort]);
    */

    /* useCallback() 있는 버전 */
    // 서버 데이터(게시글 목록) 가져오는 함수
    const getServerData = useCallback(async () => {
        try {
            const responseData = await getBoardList({page, size, sort});
            setServerData(responseData);
        } catch (error) {
            console.error("게시글 목록 로드 실패:", error);
        }
    }, [page, size, sort]);

    // useEffect()
    useEffect(() => {
        getServerData();
    }, [getServerData]);

    // serverData에서 사용할 데이터 꺼내기 (?. : 옵셔널 체이닝. null이나 undefined가 발생하면 바로 undefiend 반환)
    const totalElements = serverData.data?.totalElements || 0;
    const boardList = serverData.data?.content || [];

    // handleTitleClick (제목 클릭 핸들러)
    const handleTitleClick = (bid) => {
        goToDetailPage(bid);
    }

    // 날짜 포맷팅 함수
    const formatDateTime = (datetime) => {
        return new Date(datetime).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    }

    return (
        <div>
            <div>
                <button onClick={goToCreatePage}>글쓰기</button>
            </div>
            <div style={{textAlign: "right"}}>
                총 {totalElements}개의 게시글
            </div>
            <table border={1} style={{borderCollapse: "collapse"}}>
                <thead>
                <tr>
                    <th>순번</th>
                    <th>제목</th>
                    <th>작성일시</th>
                    <th>수정일시</th>
                </tr>
                </thead>
                <tbody>
                {boardList.length === 0 ? (
                    <tr>
                        <td colSpan={4} style={{textAlign: "center"}}>
                            등록된 게시글이 없습니다.
                        </td>
                    </tr>
                ) : (
                    boardList.map((board, index) => (
                        <tr key={board.bid}>
                            <td>
                                {totalElements - (serverData.data?.number * serverData.data?.size) - index}
                            </td>
                            <td>
                  <span onClick={() => handleTitleClick(board.bid)}
                        style={{cursor: "pointer"}}>
                    {board.title}
                  </span>
                            </td>
                            <td>
                                {formatDateTime(board.createdAt)}
                            </td>
                            <td>
                                {formatDateTime(board.updatedAt)}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={4}>
                        {
                            boardList.length > 0 &&
                            (<PageComp
                                currentPageParam={currentPageParams}
                                onPageChange={goToListPage}
                                pageData={serverData.data}
                            />)
                        }

                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ListComp;