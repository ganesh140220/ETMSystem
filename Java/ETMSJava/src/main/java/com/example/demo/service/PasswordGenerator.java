package com.example.demo.service;

import java.security.SecureRandom;

public class PasswordGenerator {
    private static final String CHARLOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHARUPPER = CHARLOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
    private static final String OTHERCHAR = "!@#$%&*()_+-=[]?";
    private static final String PASSWORD_ALLOW_BASE = CHARLOWER + CHARUPPER + NUMBER + OTHERCHAR;
    private static SecureRandom random = new SecureRandom();

    public static String generateRandomPassword(int length) {
        if (length < 1) throw new IllegalArgumentException("Password length must be greater than 0");

        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int rndCharAt = random.nextInt(PASSWORD_ALLOW_BASE.length());
            char rndChar = PASSWORD_ALLOW_BASE.charAt(rndCharAt);
            sb.append(rndChar);
        }

        return sb.toString();
    }
}
