package gerrymandering;

/**
 * Created by yisuo on 10/30/17.
 */
import gerrymandering.config.SecurityConfig;
import org.springframework.security.web.context.*;

public class SecurityWebApplicationInitializer
        extends AbstractSecurityWebApplicationInitializer {

    public SecurityWebApplicationInitializer() {
        super(SecurityConfig.class);
    }
}
