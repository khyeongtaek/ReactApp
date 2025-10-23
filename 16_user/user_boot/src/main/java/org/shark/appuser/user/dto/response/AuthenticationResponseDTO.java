package org.shark.appuser.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 인증 응답 DTO (로그인 성공 시)
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
