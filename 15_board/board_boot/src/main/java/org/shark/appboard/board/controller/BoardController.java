package org.shark.appboard.board.controller;

import lombok.RequiredArgsConstructor;
import org.shark.appboard.board.dto.BoardDTO;
import org.shark.appboard.board.dto.response.ResponseDTO;
import org.shark.appboard.board.service.BoardService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<ResponseDTO<BoardDTO>> saveBoard(@RequestBody BoardDTO boardDTO) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ResponseDTO.<BoardDTO>builder()
                                .status(201)
                                .message("게시글 등록 성공")
                                .data(boardService.saveBoard(boardDTO))
                                .build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO<BoardDTO>> updateBoard(@RequestBody BoardDTO boardDTO, @PathVariable Long id) {
        boardDTO.setBid(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        ResponseDTO.<BoardDTO>builder()
                                .status(200)
                                .message("게시글 수정 성공")
                                .data(boardService.updateBoard(boardDTO))
                                .build()
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO<Void>> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        ResponseDTO.<Void>builder()
                                .status(204)
                                .message("게시글 삭제 성공")
                                .build()
                );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO<BoardDTO>> getBoard(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        ResponseDTO.<BoardDTO>builder()
                                .status(200)
                                .message("게시글 조회 성공")
                                .data(boardService.getBoard(id))
                                .build()
                );
    }

    @GetMapping
    public ResponseEntity<ResponseDTO<Page<BoardDTO>>> getBoardList(
            @PageableDefault(page = 1, size = 10, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                ResponseDTO.<Page<BoardDTO>>builder()
                        .status(200)
                        .message("게시글 목록 조회 성공")
                        .data(boardService.getBoardList(pageable))
                        .build()
        );
    }


}
