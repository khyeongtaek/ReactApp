package org.shark.appuser.user.service;

import org.shark.appuser.user.dto.request.AuthenticationRequestDTO;
import org.shark.appuser.user.dto.request.RegisterRequestDTO;
import org.shark.appuser.user.dto.response.AuthenticationResponseDTO;

public interface AuthenticationService {
    AuthenticationResponseDTO register(RegisterRequestDTO request);
    AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request);
}
