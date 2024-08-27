import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ChangePassword() {
  const [oldPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success"); // 'success' or 'danger'
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve loginId from Redux store
  const loginId = useSelector((state) => state.myobj.obj.login.loginid);

  // Password pattern to validate
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      setVariant("danger");
      return;
    }

    if (!passwordPattern.test(newPassword)) {
      setMessage(
        "New password must be at least 8 characters long and include at least one letter, one number, and one special character."
      );
      setVariant("danger");
      return;
    }

    const requestBody = {
      loginId, // Send loginId along with the request
      oldPassword,
      newPassword,
    };

    // Set loading state
    setIsLoading(true);

    fetch("http://localhost:8080/changePassword", { // Ensure the endpoint matches your backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Password changed successfully");
          setVariant("success");
          // Optionally clear the form fields
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else if (response.status === 400) {
          setMessage("Current password is incorrect");
          setVariant("danger");
        } else {
          setMessage("Failed to change password");
          setVariant("danger");
        }
      })
      .catch((error) => {
        console.error("Error during password change:", error);
        setMessage("An error occurred. Please try again later.");
        setVariant("danger");
      })
      .finally(() => {
        // Remove loading state
        setIsLoading(false);
      });
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4" style={{ marginTop: "150px" }}>
        Change Password
      </h2>
      {message && <Alert variant={variant} className="text-center">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="currentPassword">Current Password</Form.Label>
          <Form.Control
            type="password"
            id="currentPassword"
            value={oldPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="newPassword">New Password</Form.Label>
          <Form.Control
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label htmlFor="confirmPassword">Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : "Change Password"}
        </Button>
      </Form>
    </Container>
  );
}
