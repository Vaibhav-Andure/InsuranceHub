package com.InsureHub.insuranceManagementService.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF for testing
                .cors(cors -> cors.disable())  // Disable CORS (Enable if needed)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()  // Allow access to all URLs
                )
                .formLogin(form -> form.disable())  // Disable form login
                .logout(logout -> logout.permitAll());  // Allow logout

        return http.build();
    }
}
