package com.insurancehub.APIGateway;

import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RateLimiterConfig;
import io.github.resilience4j.ratelimiter.RateLimiterRegistry;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Arrays;

@Configuration
public class MyBeans {

    // Define RateLimiters
    private final RateLimiter authRateLimiter = createRateLimiter("authService", 10, Duration.ofSeconds(2));
    private final RateLimiter insuranceRateLimiter = createRateLimiter("insuranceService", 10, Duration.ofSeconds(1));
    private final RateLimiter paymentRateLimiter = createRateLimiter("paymentService", 10, Duration.ofSeconds(1));

    @Bean
    public RouteLocator customRouterLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("AUTHENTICATION-SERVICE", r -> r.path("/auth/**")
                        .filters(f -> f.filter(rateLimiterFilter(authRateLimiter)))
                        .uri("lb://AUTHENTICATION-SERVICE"))

                .route("INSURANCEMANAGEMENTSERVICE", r -> r.path("/insurance/**")
                        .filters(f -> f.filter(rateLimiterFilter(insuranceRateLimiter)))
                        .uri("lb://INSURANCEMANAGEMENTSERVICE"))

                .route("PAYMENTSERVICE", r -> r.path("/Payment/**")
                        .filters(f -> f.filter(rateLimiterFilter(paymentRateLimiter)))
                        .uri("http://localhost:9254"))

                .build();
    }

    // Create a RateLimiter instance with specific limits
    private static RateLimiter createRateLimiter(String name, int limitForPeriod, Duration refreshPeriod) {
        RateLimiterConfig config = RateLimiterConfig.custom()
                .limitForPeriod(limitForPeriod)
                .limitRefreshPeriod(refreshPeriod)
                .timeoutDuration(Duration.ZERO)
                .build();

        return RateLimiterRegistry.of(config).rateLimiter(name);
    }

    // Apply RateLimiter to requests
    private GatewayFilter rateLimiterFilter(RateLimiter rateLimiter) {
        return (exchange, chain) -> {
            if (rateLimiter.acquirePermission()) {
                return chain.filter(exchange);
            } else {
                exchange.getResponse().setStatusCode(org.springframework.http.HttpStatus.TOO_MANY_REQUESTS);
                return exchange.getResponse().setComplete();
            }
        };
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