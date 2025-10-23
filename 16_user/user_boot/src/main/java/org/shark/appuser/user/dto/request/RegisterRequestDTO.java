package org.shark.appuser.user.dto.request;

import org.shark.appuser.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// 회원가입 요청 DTO
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class RegisterRequestDTO {
  private String email;
  private String password;
  private String nickname;
}
