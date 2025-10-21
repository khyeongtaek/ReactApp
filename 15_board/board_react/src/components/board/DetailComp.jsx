import React, {useCallback, useEffect, useState} from 'react';
import useBoardNavigate from "../../hooks/useBoardNavigate";
import {deleteBoard, getBoard} from "../../api/boardAPI";

const DetailComp = ({bid}) => {
    const {goToUpdatePage, goToListPage} = useBoardNavigate();

    const [board, setBoard] = useState({
        bid: "",
        title: "",
        content: "",
        createdAt: "",
        updatedAt: "",
    });

    const [error, setError] = useState("");

    const loadBoard = useCallback(async () => {
        if (!bid) return;

        try {
            const responseData = await getBoard(bid);
            setBoard(responseData.data);
        } catch (err) {
            console.error("게시글 조회 실패: ", err)
            setError(`게시글 ID = ${bid}인 게시글을 불러오는데 실패했습니다.`);
        }
    }, [bid])

    useEffect(() => {
        loadBoard();
    }, [loadBoard])

    const handleDeleteClick = () => {
        if (!window.confirm("정말로 삭제하시겠습니까?")) {
            return;
        }
        try{
            const responseData = deleteBoard(bid);
            alert(responseData.message);
            goToListPage();
        }catch(err){
            console.error("게시글 삭제 실패: ", err)
        }
    }


    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={goToListPage}>목록으로</button>
            </div>
        )
    } else return (
        <>
            <div>
                <h3>{board.title}</h3>
                <div>작성일자: {board.createdAt}</div>
                <div>수정일자: {board.updatedAt}</div>
                <div>{board.content}</div>
            </div>
            <div>
                <button onClick={goToListPage}>목록으로</button>
                <button onClick={() => goToUpdatePage(board.bid)}>수정</button>
                <button onClick={handleDeleteClick}>삭제</button>
            </div>
        </>

    );
};

export default DetailComp;