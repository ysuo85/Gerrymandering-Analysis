package gerrymandering.bean;

import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.common.util.RandomValueStringGenerator;

public class KeyGenerator {
    @Bean(name="keyGenerator")
    public RandomValueStringGenerator keyGenerator() {
        return new RandomValueStringGenerator();
    }
}