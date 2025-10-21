package org.shark.appuser.user.dto.request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class AuthenticationRequestDTO {
    private String email;
    private String password;
}
