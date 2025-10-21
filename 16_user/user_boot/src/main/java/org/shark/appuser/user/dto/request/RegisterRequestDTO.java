package org.shark.appuser.user.dto.request;

import lombok.*;
import org.shark.appuser.user.entity.User;

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
