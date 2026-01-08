package org.iceman.equipment_accounting.confinguration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder
import org.springframework.security.web.SecurityFilterChain

@Configuration
class SecurityBeans {
    @Bean
    fun securityFilterChain(
        httpSecurity: HttpSecurity
    ): SecurityFilterChain {
        return httpSecurity
            .authorizeHttpRequests { auth ->
                auth.requestMatchers("/ping")
                    .permitAll()

                auth.requestMatchers("/api/v1/**")
                    .hasAuthority("SCOPE_equipment_accounting_frontend")

                auth.anyRequest().denyAll()
            }
            .csrf { it.disable() }
            .oauth2ResourceServer { it.jwt(Customizer.withDefaults()) }
            .sessionManagement { session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .build()
    }
}