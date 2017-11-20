package gerrymandering.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by yisuo on 10/31/17.
 */
@Configuration
public class StaticResourceHandler extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/");
        registry.addResourceHandler("/www/**").addResourceLocations("/static/");
    }
}
