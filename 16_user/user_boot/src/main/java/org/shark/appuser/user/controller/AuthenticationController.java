package org.shark.appuser.user.controller;

import org.shark.appuser.user.dto.request.AuthenticationRequestDTO;
import org.shark.appuser.user.dto.request.RegisterRequestDTO;
import org.shark.appuser.user.dto.response.AuthenticationResponseDTO;
import org.shark.appuser.user.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService authenticationService;
  
  // 회원가입
  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponseDTO> register(
      @RequestBody RegisterRequestDTO request
  ) {
    return ResponseEntity.ok(authenticationService.register(request));
  }
  
  // 로그인
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponseDTO> authenticate(
      @RequestBody AuthenticationRequestDTO request
  ) {
    return ResponseEntity.ok(authenticationService.authenticate(request));
  }
  
  // 로그아웃 (클라이언트에 저장된 토큰 삭제)
  @PostMapping("/logout")
  public ResponseEntity<String> logout() {
    // JWT 방식 : stateless 방식(서버에서 처리할 별도 로그아웃 로직이 없음)
    return ResponseEntity.ok("로그아웃 되었습니다. 클라이언트에서 토큰을 삭제해주세요.");
  }
  
}