import { useState, useEffect } from "react";
import api from "../services/api";
import { login } from "../services/auth";

import "./../styles/login.css";
import loginIllustration from "../assets/login-illustration.png";
import logoImage from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const fetchData = async () => {
  try {
    const response = await api.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(userId, password);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      // preproute demo account
      if (
        userId === "preproute-demo" &&
        password === "PrepRoute@2026"
      ) {
        localStorage.setItem("token", "demo-jwt-token");

        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: "preproute-demo",
            role: "demo"
          })
        );

        navigate("/dashboard");
        return;
      }

      alert("Invalid User ID or Password");
    }
  };

  useEffect(() => {
    console.log("User ID changed:", userId);
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="login-container">

      {/* LEFT SIDE — illustration panel */}
      <div className="login-left">
        <img
          src={loginIllustration}
          alt="PrepRoute login illustration"
          className="login-illustration"
        />
      </div>

      {/* RIGHT SIDE — form panel */}
      <div className="login-right">

        <div className="login-card">

          {/* Logo */}
          <div className="logo-wrapper">
            <img
              src={logoImage}
              alt="PrepRoute"
              className="logo-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display =
                  "none";

                const fallback =
                  e.currentTarget.nextElementSibling as HTMLElement;

                if (fallback) {
                  fallback.style.display = "block";
                }
              }}
            />

            <span className="logo-text-fallback">
              PrepRoute
            </span>
          </div>

          <h3 className="login-heading">Login</h3>

          <p className="login-subtext">
            Use your company provided Login credentials
          </p>

          {/* DEMO ACCESS */}
          <div className="demo-access-box">
            <div className="demo-access-title">
              🔐 Demo Access
            </div>

            <p>
              <strong>User ID:</strong>{" "}
              <span>preproute-demo</span>
            </p>

            <p>
              <strong>Password:</strong>{" "}
              <span>PrepRoute@2026</span>
            </p>

            <small>
              Use these credentials to explore the application.
            </small>
          </div>

          <form>
            <div className="field-group">
              <label htmlFor="userId">User ID</label>

              <input
                id="userId"
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="forgot-password-row">
              <span className="forgot-password">
                Forgot password?
              </span>
            </div>

            <button
              className="login-btn"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>

          {/* SECURITY NOTE */}
          <div className="security-note">
            <span>🔒</span>
            <span>
              Authentication-protected access
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;