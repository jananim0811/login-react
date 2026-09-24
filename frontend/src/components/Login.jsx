import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");
    setLoginError("");

    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must contain at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        onLogin(response.data.user);
      }
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("Unable to connect to the server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="background-overlay"></div>

      <header className="brand">
        Stream<span>Flix</span>
      </header>

      <div className="login-card">

        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {emailError && (
              <p className="error-text">{emailError}</p>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {passwordError && (
              <p className="error-text">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {loginError && (
            <p className="login-error">
              {loginError}
            </p>
          )}

        </form>

        <div className="login-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <a href="/help">Need help?</a>
        </div>

        <div className="signup-section">
          <p>
            New to StreamFlix?
            <span> Sign up now.</span>
          </p>
        </div>

        <p className="privacy-text">
          This page is protected by demo security.
          This is a student project and does not collect
          real account information.
        </p>

      </div>
    </div>
  );
}

export default Login;