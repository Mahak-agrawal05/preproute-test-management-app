import { useState, useEffect } from "react";
import api from "../services/api";
import { login } from "../services/auth";

import "./../styles/Login.css";
import loginIllustration from "../assets/login-illustration.png";
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
    // Temporary fallback for assessment/demo
    if (
      userId === "vedant-admin" &&
      password === "vedant123"
    ) {
      localStorage.setItem("token", "dummy-jwt-token");
      localStorage.setItem(
        "user",
        JSON.stringify({ userId })
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

      <div className="login-left">
        <img
          src={loginIllustration}
          alt="illustration"
        />
      </div>

      <div className="login-right">

        <div className="login-card">

          <h2 className="logo">PrepRoute</h2>

          <h3>Login</h3>

          <p>
            Use your company provided Login credentials
          </p>

          <form>
            <label>User ID</label>

            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />

            <br />
            <br />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <div className="forgot-password">
              Forgot Password?
            </div>

            <br />

            <button
              className="login-btn"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>

          </form>
        </div>

      </div>

    </div>
  );
}

export default Login;