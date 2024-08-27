using System.Text;
using System;
using System.Security.Cryptography;
using System.Text;


namespace EtmsSytem
{
    public class Encodeer
    {
        public string Encode(string plainText)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                // Compute the hash
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(plainText));

                // Convert the hash to a base64 string
                return Convert.ToBase64String(hashBytes);
            }
        }

        // Method to verify if a plain text matches the encoded string
        public bool Matches(string plainText, string encodedText)
        {
            // Encode the plain text
            string encodedPlainText = Encode(plainText);

            // Compare the encoded plain text with the encoded text
            return encodedPlainText.Equals(encodedText, StringComparison.Ordinal);
        }
    }
}
