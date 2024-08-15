package com.example.demo.service;

import java.security.SecureRandom;

public class PasswordGenerator {
    private static final String CHARLOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHARUPPER = CHARLOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
    private static final String OTHERCHAR = "@$!%*?&";
    private static final String PASSWORD_ALLOW_BASE = CHARLOWER + CHARUPPER + NUMBER + OTHERCHAR;
    private static SecureRandom random = new SecureRandom();

    public static String generateRandomPassword(int length) {
        if (length < 8) throw new IllegalArgumentException("Password length must be at least 8 characters");

        StringBuilder sb = new StringBuilder(length);

        // Ensure at least one letter
        sb.append(CHARLOWER.charAt(random.nextInt(CHARLOWER.length())));
        // Ensure at least one upper case letter
        sb.append(CHARUPPER.charAt(random.nextInt(CHARUPPER.length())));
        // Ensure at least one digit
        sb.append(NUMBER.charAt(random.nextInt(NUMBER.length())));
        // Ensure at least one special character
        sb.append(OTHERCHAR.charAt(random.nextInt(OTHERCHAR.length())));

        // Fill the rest of the password length with random characters from the base set
        for (int i = 4; i < length; i++) {
            int rndCharAt = random.nextInt(PASSWORD_ALLOW_BASE.length());
            char rndChar = PASSWORD_ALLOW_BASE.charAt(rndCharAt);
            sb.append(rndChar);
        }

        // Shuffle the characters to prevent predictable sequences
        return shuffleString(sb.toString());
    }

    private static String shuffleString(String input) {
        StringBuilder output = new StringBuilder(input.length());
        char[] characters = input.toCharArray();
        for (int i = characters.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            char temp = characters[i];
            characters[i] = characters[j];
            characters[j] = temp;
        }
        for (char c : characters) {
            output.append(c);
        }
        return output.toString();
    }
}
