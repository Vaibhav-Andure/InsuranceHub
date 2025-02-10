package com.insurancehub.APIGateway;


import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class MyBeans {

    @Bean
    public RouteLocator customRouterLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("AUTHENTICATION-SERVICE", r -> r.path("/auth/**").uri("lb://AUTHENTICATION-SERVICE"))
                .route("INSURANCEMANAGEMENTSERVICE", r -> r.path("/insurance/**").uri("lb://INSURANCEMANAGEMENTSERVICE"))
                .route("PAYMENTSERVICE", r -> r.path("/Payment/**").uri("http://localhost:9254"))

                .build();
    }

    @Bean
    CorsWebFilter corsWebFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("http://localhost:3025")); // React app URL
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setExposedHeaders(Arrays.asList("Authorization"));

        // Register CORS configuration for specific paths
        source.registerCorsConfiguration("/auth/**", config);
        source.registerCorsConfiguration("/insurance/**", config);
        source.registerCorsConfiguration("/Payment/**", config);

        // Register CORS configuration globally for all paths
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }
}
