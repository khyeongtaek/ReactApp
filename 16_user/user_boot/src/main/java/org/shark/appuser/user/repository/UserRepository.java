package org.shark.appuser.user.repository;

import org.shark.appuser.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일로 사용자 조회 (로그인 시 필요)
    Optional<User> findByEmail(String email);

    // 이메일 존재 여부 반환 (회원가입 시 중복 체크)
    boolean existsByEmail(String email);

    // 닉네임 중복 체크
    boolean existsByNickname(String nickname);
}