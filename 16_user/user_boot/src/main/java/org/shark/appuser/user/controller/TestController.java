package org.shark.appuser.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo")
@RequiredArgsConstructor
public class TestController {

    @GetMapping
    public ResponseEntity<String> getUsername(Authentication authentication) {
        return ResponseEntity.ok("현재 로그인 된 사용자: " + authentication.getName());
    }
}

