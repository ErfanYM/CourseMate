import React, { useState } from "react";
//import "./LoginSignup.css"; // Import CSS for styling
import axios from "axios"; // Added for HTTP requests
import { useNavigate } from "react-router-dom";

const LoginSignup = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState(""); // Added state for username
  const [password, setPassword] = useState(""); // Added state for password
  const [email, setEmail] = useState(""); // Add state for email
  const [confirmPassword, setConfirmPassword] = useState(""); // Added state for confirm password
  const [message, setMessage] = useState(""); // Added state for feedback messages


  const toggleForm = () => {
    setIsSignup(!isSignup);
    setMessage(""); // Clear message when toggling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for password mismatch during sign up
    // if (isSignup && password !== confirmPassword) {
    //   setMessage("Passwords do not match.");
    //   return;
    // }
    const payload = isSignup
    ? { email, username, password } // Include username for signup
    : { email, password }; // Only email and password for login
    
    try {
      const endpoint = isSignup ? "http://localhost:5000/signup" : "http://localhost:5000/login";
      // const payload = isSignup
      //   ? { email, username, password } // Include email for signup
      //   : { username, password }; // No email for login
      console.log("Sending request to:", endpoint); // Debug endpoint
      console.log("Payload:", payload); // Debug payload

      const response = await axios.post(endpoint, payload);

      console.log("Response from server:", response.data); // Debug response

      if (isSignup) {
        // Signup success
        setMessage("Sign up successful! Please log in.");
        toggleForm();
      } else {
        // Login success
        // const token = response.data.token;
        // setMessage(`Welcome, ${response.data.username}!`);
        // onLogin(token); // Pass token to parent component or handle as needed
        // Handle login success
      const token = response.data.token;
      const username = response.data.username;

      // Store the token in localStorage for authentication
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);

      console.log("Token saved:", token); // Debug token
      console.log("Redirecting to home page...");

      // Navigate to home page
      window.location.reload();
      }
    } catch (error) {
      console.error("Error during login/signup:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-signup-container">
      <div className="form-container">
        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Username Input (Only for Signup) */}
          {isSignup && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input (Only for Signup) */}
          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn-submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Display Feedback Message */}
        {message && <p className="form-message">{message}</p>}

        {/* Toggle Form Link */}
        <div className="form-footer">
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <span onClick={toggleForm} className="toggle-link">
                Sign in!
              </span>
            </p>
          ) : (
            <p>
              Not a member?{" "}
              <span onClick={toggleForm} className="toggle-link">
                Sign up!
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
