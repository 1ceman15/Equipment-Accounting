package org.iceman.equipment_accounting.confinguration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator
import org.springframework.security.oauth2.core.OAuth2Error
import org.springframework.security.oauth2.core.OAuth2TokenValidator
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult
import org.springframework.security.oauth2.jwt.*
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
class SecurityBeans {

    @Bean
    fun securityFilterChain(httpSecurity: HttpSecurity): SecurityFilterChain {
        return httpSecurity
            .authorizeHttpRequests { auth ->
                auth.requestMatchers("/ping").permitAll()
                auth.requestMatchers("/api/v1/**")
                    .hasAuthority("SCOPE_equipment_accounting_frontend")
                auth.anyRequest().denyAll()
            }
            .csrf { it.disable() }
            .cors { cors -> cors.configurationSource(corsConfigurationSource()) }
            .oauth2ResourceServer { it.jwt(Customizer.withDefaults()) }
            .sessionManagement { session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .build()
    }

    @Bean
    fun jwtDecoder(): JwtDecoder {
        val jwtDecoder = NimbusJwtDecoder.withJwkSetUri(JWK_SET_URI).build()

        val issuerValidator = OAuth2TokenValidator<Jwt> { jwt ->
            val issuer = jwt.issuer.toString()

            if (VALID_ISSUERS.contains(issuer)) {
                OAuth2TokenValidatorResult.success()
            } else {
                OAuth2TokenValidatorResult.failure(
                    OAuth2Error(
                        "invalid_issuer",
                        "Invalid issuer: $issuer. Expected one of: $VALID_ISSUERS",
                        null
                    )
                )
            }
        }

        val validators: MutableList<OAuth2TokenValidator<Jwt>> = mutableListOf(
            JwtTimestampValidator(),
            issuerValidator
        )

        val delegatingValidator = DelegatingOAuth2TokenValidator(validators)
        jwtDecoder.setJwtValidator(delegatingValidator)

        return jwtDecoder
    }

    private fun corsConfigurationSource(): CorsConfigurationSource {
        val corsConfiguration = CorsConfiguration()

        corsConfiguration.allowedOrigins = ALLOWED_ORIGINS
        corsConfiguration.allowedMethods = ALLOWED_METHODS
        corsConfiguration.allowCredentials = true
        corsConfiguration.allowedHeaders = listOf("*")
        corsConfiguration.exposedHeaders = listOf("Authorization")
        corsConfiguration.maxAge = MAX_AGE

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", corsConfiguration)

        return source
    }

    companion object {
        private val ALLOWED_ORIGINS = listOf(
            "http://localhost:3000",
            "http://frontend:3000",
        )

        private val ALLOWED_METHODS = listOf(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        )

        private const val MAX_AGE = 3600L

        private const val JWK_SET_URI = "http://keycloak:8080/realms/equipment_accounting/protocol/openid-connect/certs"

        private val VALID_ISSUERS = listOf(
            "http://localhost:8082/realms/equipment_accounting",  // Для фронтенда (браузер)
            "http://keycloak:8080/realms/equipment_accounting"    // Для внутреннего общения (Docker сеть)
        )
    }
}