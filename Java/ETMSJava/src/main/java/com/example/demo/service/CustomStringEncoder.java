package com.example.demo.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import org.springframework.stereotype.Service;

@Service
public class CustomStringEncoder {

    // Method to encode a string
    public String encode(String plainText) {
        try {
            // Create a MessageDigest instance for SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            
            // Perform the hash operation
            byte[] hashedBytes = digest.digest(plainText.getBytes());
            
            // Encode bytes to a Base64 string
            return Base64.getEncoder().encodeToString(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error encoding string", e);
        }
    }

    // Method to verify if a plain text matches the encoded string
    public boolean matches(String plainText, String encodedText) {
        // Encode the plain text
        String encodedPlainText = encode(plainText);
        
        // Compare the encoded plain text with the encoded text
        return encodedPlainText.equals(encodedText);
    }

}

