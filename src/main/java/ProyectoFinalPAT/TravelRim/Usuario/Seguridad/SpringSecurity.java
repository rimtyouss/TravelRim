package ProyectoFinalPAT.TravelRim.Usuario.Seguridad;

import ProyectoFinalPAT.TravelRim.Usuario.Service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SpringSecurity {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests((authorize) ->
                        authorize.requestMatchers("/registro/**").permitAll()
                                .requestMatchers("/inicio").permitAll()
                                .requestMatchers("/h2-console/**").permitAll()
                                .requestMatchers("/index").authenticated()
                                .requestMatchers("/vuelos").authenticated()
                                .requestMatchers("/coche").authenticated()
                                .requestMatchers("/hoteles").authenticated()
                                .requestMatchers("/carrito").authenticated()
                                .requestMatchers("/user").authenticated()
                                .requestMatchers("/users").authenticated()
                                .anyRequest().authenticated() // dejar esto para usar la pagina normal
                                //.anyRequest().permitAll() // !!!!!! dejar esto para hacer test/peticiones


                ).formLogin(
                        form -> form
                                .loginPage("/inicio")
                                .loginProcessingUrl("/inicio")
                                .defaultSuccessUrl("/index",true)
                                .failureUrl("/inicio?error=true")
                ).logout(
                        logout -> logout
                                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                                .logoutSuccessUrl("/inicio?logout=true")
                                .clearAuthentication(true)
                                .permitAll()
                )
                .headers().frameOptions().disable(); // si no pongo esto no funciona, para permitir que se vea la consola
        return http.build();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }
}
