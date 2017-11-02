package gerrymandering.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
/**
 * Created by yisuo on 10/30/17.
 */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/www/admin.html").hasRole("ADMIN")
                .antMatchers("/resources/**", "/www/**").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
            .logout()
                .permitAll();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("ysuo").password("abc123").roles("ADMIN");
        auth
                .inMemoryAuthentication()
                .withUser("bkestelman").password("abc123").roles("ADMIN");
        auth
                .inMemoryAuthentication()
                .withUser("astaylor").password("abc123").roles("ADMIN");
        auth
                .inMemoryAuthentication()
                .withUser("johnsonlu").password("abc123").roles("ADMIN");
    }
}
