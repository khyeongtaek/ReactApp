package org.shark.appuser;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SecretKeyBuilder;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Base64;

@SpringBootTest
class UserBootApplicationTests {

    private static final Logger log = LoggerFactory.getLogger(UserBootApplicationTests.class);

    @Test
    void generateBase64EncodedKey() {
        Key key = Jwts.SIG.HS256.key().build();
        String encoded = Base64.getEncoder().encodeToString(key.getEncoded());
        log.info("encoded key : {}", encoded);
    }

}
