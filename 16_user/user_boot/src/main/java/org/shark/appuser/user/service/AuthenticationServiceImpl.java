package org.shark.appuser.user.service;


import lombok.RequiredArgsConstructor;
import org.shark.appuser.user.dto.request.AuthenticationRequestDTO;
import org.shark.appuser.user.dto.request.RegisterRequestDTO;
import org.shark.appuser.user.dto.response.AuthenticationResponseDTO;
import org.shark.appuser.user.entity.User;
import org.shark.appuser.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthenticationResponseDTO register(RegisterRequestDTO request) {
        // 이메일 중복 체크
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(request.getEmail() + "은(는) 이미 중복 된 이메일 입니다");
        }
        // 새 사용자 엔티티 생성
        User user = User.createUser(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),  // 비밀번호 암호화
                request.getNickname()
        );

        // 사용자 등록
        User savedUser = userRepository.save(user);

        // JWT Create Token(AccessToken, RefreshToken)



        // 인증 응답 DTO 반환
        return AuthenticationResponseDTO.builder()
                .accessToken(null)
                .refreshToken(null)
                .email(savedUser.getEmail())
                .nickname(savedUser.getNickname())
                .build();

    }

    @Override
    public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request) {
        //인증 시도

        // 인증 성공 시 사용자 정보 조회
        User foundUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException(request.getEmail() + "은(는) 존재 하지 않습니다"));

        // JWT Create Token

        // 인증 응답 DTO 반환
        return AuthenticationResponseDTO.builder()
                .accessToken(null)
                .refreshToken(null)
                .email(foundUser.getEmail())
                .nickname(foundUser.getNickname())
                .build();
    }
}
