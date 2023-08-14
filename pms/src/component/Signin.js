import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/all/login", {
        email: email,
        password: password,
      });

      const { token, user } = response.data;

      // Save the token and user details to local storage or state
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Check user type and navigate accordingly
      if (user.type === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure
    }
  };

  return (
    <div className="log">
      <div className="card col-md-6">
        <h5>SignIn</h5>
        <div>
          <label className="log_label">Email</label>
          <input
            className="logfield"
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="log_label">Password</label>
          <input
            className="logfield"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            className="log_label logfield button_log"
            type="button"
            value="Submit"
            onClick={handleLogin}
          />
        </div>
        <div>
          <label className="log_label">Forgot Password?</label>
        </div>
        <div>
          <label className="log_label">New User Register Here. </label>
        </div>
      </div>
    </div>
  );
}

export default Signin;
