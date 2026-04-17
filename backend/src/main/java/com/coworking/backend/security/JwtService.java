package com.coworking.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

/**
 * Service responsable de la gestion des tokens JWT.
 *
 * Il permet :
 * - de générer un token
 * - d'extraire les informations du token
 * - de vérifier la validité du token
 */
@Service
public class JwtService {

    /**
     * Clé secrète encodée en Base64.
     *
     * ⚠️ En production :
     * - ne jamais laisser la clé en dur
     * - la mettre dans application.properties ou variables d’environnement
     */
    private static final String SECRET_KEY =
            "VGhpc0lzQVN1cGVyU2VjcmV0S2V5Rm9ySldUQXV0aGVudGljYXRpb25JblNwcmluZ0Jvb3QxMjM0NTY=";

    /**
     * Génère un token JWT pour un utilisateur donné.
     */
    public String generateToken(UserDetails userDetails) {

        return Jwts.builder()

                /**
                 * subject = identité de l'utilisateur
                 * ici on utilise l'email
                 */
                .subject(userDetails.getUsername())

                /**
                 * date de création du token
                 */
                .issuedAt(new Date(System.currentTimeMillis()))

                /**
                 * date d'expiration (24h)
                 */
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))

                /**
                 * signature avec la clé secrète
                 */
                .signWith(getSignInKey())

                /**
                 * construction finale du token
                 */
                .compact();
    }

    /**
     * Extrait l'email (username) depuis le token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Vérifie si le token est valide :
     * - correspond à l'utilisateur
     * - n'est pas expiré
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {

        final String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    /**
     * Vérifie si le token a expiré.
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extrait la date d'expiration du token.
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Méthode générique pour extraire une information du token.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extrait toutes les données contenues dans le token.
     */
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Transforme la clé secrète en clé cryptographique.
     */
    private Key getSignInKey() {

        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    /**
     * Génère un refresh token JWT pour un utilisateur donné.
     *
     * Ce token a une durée de vie plus longue que l'access token.
     */
    public String generateRefreshToken(UserDetails userDetails) {

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7))
                .signWith(getSignInKey())
                .compact();
    }
}