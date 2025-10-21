import React, {useCallback, useEffect, useState} from 'react';
import useBoardNavigate from "../../hooks/useBoardNavigate";
import {getBoardList} from "../../api/boardAPI";

const INITIAL_SERVER_DATA = {
    status: 0,
    message: '',
    data: {
        content: [],
        pageable: {},
        first: false,
        last: false,
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
        numberOfElements: 0,
        empty: false,
    },
};

const ListComp = () => {
    const {currentPageParams, goToDetailPage} = useBoardNavigate();
    const {page, size, sort} = currentPageParams;
    const [serverData, setServerData] = useState(INITIAL_SERVER_DATA);

    const getServerData = useCallback(async () => {
        try {
            // const responseData = await getBoardList({page, size, sort});
            const responseData = await getBoardList(currentPageParams);
            setServerData(responseData);
        } catch (err) {
            console.error("게시글 목록 로드 실패: ", err);
        }
    }, [page, size, sort]);


    useEffect(() => {
        getServerData();
    }, [getServerData])

    const totalElements = serverData?.data?.totalElements || 0;
    const boardList = serverData?.data?.content || [];


    const beautyTimestamp = (dirtyTimeStamp) => {
        const date = new Date(dirtyTimeStamp);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
    }


    return (
        <div>
            <div style={{textAlign: "right"}}>
                총 {totalElements}개의 게시글
            </div>

            <table border="1" style={{boarderCollapse: "collapse"}}>
                <thead>
                <tr>
                    <th>순번</th>
                    <th>제목</th>
                    <th>작성일시</th>
                    <th>수정일시</th>
                </tr>
                </thead>
                <tbody>
                {
                    boardList.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{textAlign: "center"}}>
                                등록된 게시글이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        boardList.map((board, index) => (
                            <tr key={board.bid}>
                                <td>
                                    {totalElements - (serverData?.data?.number * serverData?.data?.size) - index}
                                </td>
                                <td>
                                    <span
                                        onClick={() => goToDetailPage(board.bid)}
                                        style={{cursor: "pointer", hover: {backgroundColor: "blue"}}}
                                    >
                                        {board.title}
                                    </span>
                                </td>
                                <td>
                                    {beautyTimestamp(board.createdAt)}
                                </td>
                                <td>
                                    {beautyTimestamp(board.updatedAt)}
                                </td>
                            </tr>
                        ))
                    )


                }
                </tbody>
            </table>

        </div>
    );
};

export default ListComp;