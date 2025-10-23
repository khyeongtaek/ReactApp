package org.shark.appuser.user.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
// import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

  //------ application.properties 등록한 JWT 정보 가져오기
  
  @Value("${jwt.secret-key}")
  private String secretKey;
  
  @Value("${jwt.expiration}")
  private long jwtExpiration;
  
  
  
  //----- JWT
  // 1. JSON 형식의 정보를 안전하게 전달하기 위한 표준 토큰입니다.
  // 2. 주로 인증/인가에서 사용하고, 위변조 방지를 위해서 디지털 서명을 포함합니다.
  // 3. JWT 토큰은 "Authorization" 헤더의 "Bearer" 스킴으로 전송합니다.
  
  //----- JWT 형식
  // 1. 형식
  //    Header.Payload.Signature (세 부분을 점(.)으로 연결한 문자열)
  // 2. 각 부분
  //    1) Header    : 토큰 유형(typ=JWT)과 서명 알고리즘(HS256 등)이 포함
  //    2) Payload   : 사용자와 토큰에 관한 클레임(Claims)이 JSON 형식으로 포함
  //    3) Signature : base64url(Header)와 base64url(Payload)을 알고리즘과 키로 서명한 값으로 위변조 검증에 사용
  
  //----- 클레임
  // 1. 토큰에 담는 정보를 의미합니다.
  // 2. key/value 형식의 JSON 데이터로 표현합니다.
  // 3. 등록된 클레임, 공개 클레임, 비공개 클레임으로 구분합니다.
  // 4. 예시
  //    { "iss": "토큰발급자", "sub": "토큰제목", "exp": "토큰만료시간" }
  
  
  
  //----- 서명키 생성 (JWT 토큰 생성 시 필요한 정보. application.properties에 등록한 jwt.secret-key를 이용해 생성한 SecretKey 객체를 의미)
  private SecretKey getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
  
  
  //----- JWT 토큰 생성
  public String generateToken(
      Map<String, Object> claims,  // 클레임
      UserDetails userDetails      // 사용자
  ) {
    // JJWT 구 버전의 경우 헤더 설정 가능
    // Map<String, Object> header = new HashMap<>();
    // header.put("typ", "JWT");
    // header.put("alg", "HS256");
    return Jwts.builder()
           // .setHeader(header)
              .claims(claims)  // JWT 토큰의 Payload 구성
              .subject(userDetails.getUsername())  // 토큰제목(발행한 사람으로 처리)
              .issuedAt(Date.from(Instant.now()))  // 발행일시
              .expiration(Date.from(Instant.now().plus(jwtExpiration, ChronoUnit.MILLIS)))  // 만료일시
              .signWith(getSignInKey())  // 서명키
              .compact();
  }
  
  
  //----- JWT 토큰에서 클레임 추출
  // 1. JWT 토큰의 모든 클레임 추출
  private Claims extractAllClaims(String jwtToken) {
    return Jwts.parser()
              .verifyWith(getSignInKey())
              .build()
              .parseSignedClaims(jwtToken)
              .getPayload();
  }
  // 2. 특정 클레임만 추출
  public <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
    return claimsResolver.apply(extractAllClaims(jwtToken));
  }
  // 3-1. JWT 토큰에서 사용자 이름 추출
  public String extractUsername(String jwtToken) {
    return extractClaim(jwtToken, Claims::getSubject);
  }
  // 3-2. JWT 토큰에서 만료시간 추출
  public Date extractExpiration(String jwtToken) {
    return extractClaim(jwtToken, Claims::getExpiration);
  }
  
  
  
  //----- JWT 토큰 유효성 검증
  public boolean isValidToken(String jwtToken, UserDetails userDetails) {
    try {
      // 사용자 일치 여부 + 만료시간 체크
      final String username = this.extractUsername(jwtToken);
      final Date expiration = this.extractExpiration(jwtToken);
      return (username.equals(userDetails.getUsername()) && expiration.after(Date.from(Instant.now())));
    } catch (Exception e) {
      return false;  // JWT 토큰에서 특정 클레임을 가져오기 실패
    }
  }
  
}
