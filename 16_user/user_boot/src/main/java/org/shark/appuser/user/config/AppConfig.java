package org.shark.appuser.user.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
  
  /* JwtUserDetailsService 클래스를 대체할 수 있는 빈 */
  //----- 1. 익명 객체 활용
  /*
  @Bean
  UserDetailsService userDetailsService() {
    return new UserDetailsService() {
      @Override
      public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException(username + " 사용자를 찾을 수 없습니다."));
      }
    };
  }
  */
  // 2. 람다식 활용
  /*
  @Bean
  UserDetailsService userDetailsService() {
    return username -> userRepository.findByEmail(username)
                            .orElseThrow(() -> new UsernameNotFoundException(username + " 사용자를 찾을 수 없습니다."));
  }
  */
  
}
