package com.coworking.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtre JWT exécuté une seule fois par requête.
 *
 * Son rôle :
 * - lire le token JWT dans l'en-tête Authorization
 * - extraire l'email depuis le token
 * - charger l'utilisateur depuis la base
 * - vérifier la validité du token
 * - authentifier l'utilisateur dans le contexte Spring Security
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    /**
     * Injection des dépendances nécessaires.
     */
    public JwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Méthode principale du filtre.
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        /**
         * Si l'en-tête Authorization est absent
         * ou ne commence pas par Bearer, on laisse passer.
         */
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        /**
         * On retire le préfixe "Bearer " pour garder uniquement le token.
         */
        jwt = authHeader.substring(7);

        /**
         * On extrait l'email contenu dans le token.
         */
        userEmail = jwtService.extractUsername(jwt);

        /**
         * Si l'utilisateur n'est pas encore authentifié dans le contexte,
         * on le charge depuis la base.
         */
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            /**
             * Si le token est valide, on crée une authentification Spring Security.
             */
            if (jwtService.isTokenValid(jwt, userDetails)) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        /**
         * On continue la chaîne de filtres.
         */
        filterChain.doFilter(request, response);
    }
}