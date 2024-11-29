import React, { useState } from "react";
//import "./LoginSignup.css"; // Import CSS for styling

const LoginSignup = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a successful login/signup process
    onLogin();
  };

  return (
    <div className="login-signup-container">
      <div className="form-container">
        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <button type="submit" className="btn-submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <div className="form-footer">
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <span onClick={toggleForm} className="toggle-link">
                Sign in!
              </span>
            </p>
          ) : (
            <div>
              <p>
                Not a member?{" "}
                <span onClick={toggleForm} className="toggle-link">
                  Sign up!
                </span>
              </p>
              <p>
                <span className="forgot-password">Forgot your password?</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
