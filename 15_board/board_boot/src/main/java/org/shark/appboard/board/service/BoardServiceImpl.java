package org.shark.appboard.board.service;

import lombok.RequiredArgsConstructor;
import org.shark.appboard.board.dto.BoardDTO;
import org.shark.appboard.board.entity.Board;
import org.shark.appboard.board.repository.BoardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    @Override
    public BoardDTO saveBoard(BoardDTO boardDTO) {
        return BoardDTO.toDTO(boardRepository.save(boardDTO.toEntity()));
    }

    @Override
    public BoardDTO updateBoard(BoardDTO boardDTO) {
        Optional<Board> boardOptional = boardRepository.findById(boardDTO.getBid());

        if (boardOptional.isPresent()) {
            Board board = boardOptional.get();
            board.update(boardDTO.getTitle(), boardDTO.getContent());

            return BoardDTO.toDTO(boardRepository.save(board));
        } else {
            return null;
        }
    }

    @Override
    public void deleteBoard(Long bid) {
        boardRepository.deleteById(bid);
    }

    @Transactional(readOnly = true)
    @Override
    public BoardDTO getBoard(Long bid) {
        Optional<Board> boardOptional = boardRepository.findById(bid);
        return boardOptional.map(BoardDTO::toDTO).orElse(null);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<BoardDTO> getBoardList(Pageable pageable) {
        return boardRepository.findAll(pageable)
                .map(BoardDTO::toDTO);
    }
}
