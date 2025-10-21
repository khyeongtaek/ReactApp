package org.shark.appuser.user.dto.response;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class AuthenticationResponseDTO {
    private String accessToken;
    private String refreshToken;
    private String email;
    private String nickname;
}
