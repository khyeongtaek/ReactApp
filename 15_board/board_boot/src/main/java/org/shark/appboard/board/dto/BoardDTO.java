package org.shark.appboard.board.dto;

import lombok.*;
import org.shark.appboard.board.entity.Board;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BoardDTO {
    private Long bid;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BoardDTO toDTO(Board board) {
        return BoardDTO.builder()
                .bid(board.getBid())
                .title(board.getTitle())
                .content(board.getContent())
                .createdAt(board.getCreatedAt())
                .updatedAt(board.getUpdatedAt())
                .build();
    }

    public Board toEntity() {
        return Board.createBoard(title, content);
    }



}
