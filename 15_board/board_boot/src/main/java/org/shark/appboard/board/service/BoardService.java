package org.shark.appboard.board.service;

import org.shark.appboard.board.dto.BoardDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardService {

    BoardDTO saveBoard(BoardDTO boardDTO);

    BoardDTO updateBoard(BoardDTO boardDTO);

    void deleteBoard(Long bid);

    BoardDTO getBoard(Long bid);

    Page<BoardDTO> getBoardList(Pageable pageable);


}
