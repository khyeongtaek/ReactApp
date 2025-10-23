package org.shark.appuser.user.entity;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.shark.appuser.user.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "users")

@Getter
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long uid;
  
  @Column(nullable = false, unique = true)
  private String email;
  
  @Column(nullable = false)
  private String password;
  
  @Column(nullable = false)
  private String nickname;
  
  @Enumerated(EnumType.STRING)
  private Role role;
  
  @Column(name = "created_at")
  private LocalDateTime createdAt;
  
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;
  
  @PrePersist
  protected void onPrePersist() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
  }
  
  @PreUpdate
  protected void onPreUpdate() {
    updatedAt = LocalDateTime.now();    
  }
  
  protected User() {
    
  }
  
  public static User createUser(String email, String password, String nickname) {
    User user = new User();
    user.email = email;
    user.password = password;
    user.nickname = nickname;
    user.role = Role.USER;  // 기본 Role은 USER
    return user;
  }
  
  public void updateRole(Role role) {
    this.role = role;
  }
  
  // UserDetails 인터페이스 구현 (오버라이드)
  
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }
  
  @Override
  public String getPassword() {
    return password;
  }
  
  @Override
  public String getUsername() {
    return email;  // 이메일을 username으로 사용
  }
  
  @Override
  public boolean isAccountNonExpired() {
    return true;  // 계정 만료 여부 반환 (모든 사용자는 계정이 만료되지 않았음)
  }
  
  @Override
  public boolean isAccountNonLocked() {
    return true;  // 계정 잠금 여부 반환 (모든 사용자는 잠기지 않았음)
  }
  
  @Override
  public boolean isCredentialsNonExpired() {
    return true;  // 비밀번호 만료 여부 반환 (모든 사용자의 비밀번호는 만료되지 않았음)
  }
  
  @Override
  public boolean isEnabled() {
    return true;  // 계정 활성화 여부 반환 (모든 사용자는 활성화 되어 있음)
  }
  
}
