import "./LoginRegister.css";
import { useState } from "react";

// Alert Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ClipLoader } from "react-spinners"; // Loader

import { FiLogIn } from "react-icons/fi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [loader, setLoader] = useState(false); //Loader
  const [showPassword, setShowPassword] = useState(false); //Show the Password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //Show Confirm password

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = (event) => {
    setLoader(true);
    event.preventDefault();
    setLoader(false);
    console.log(loginData);
    toast.success("Account created successfully!");
  };

  return (
    <div className="container login-section">
      <header className="header-section">
        <div className="logo-card login-logo-card">
          <FiLogIn className="header-icon" />
        </div>
        <h1>Welcome Back</h1>
        <p>Please sign in to your account</p>
      </header>

      {/* Form */}
      <form className="form-container" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address*</label>
          <input
            name="email"
            type="email"
            placeholder="email@gmail.com"
            required
            onChange={handleChange}
            value={loginData.email}
            className="login-input"
          />
        </div>

        <div className="form-group password-field">
          <label>Password*</label>
          <input
            className="form-input login-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            required
            onChange={handleChange}
            value={loginData.password}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password-icon"
          >
            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </span>
        </div>

        <div className="rememberMe-forgetPassword-group">
          <div className="rememberMe-group">
            <input
              type="checkbox"
              name="rememberMe"
              className="check-box"
              checked={loginData.rememberMe}
              onChange={handleChange}
              id="rememberMe"
            />
            <label htmlFor="rememberMe" className="checkbox-label">
              Remember me
            </label>
          </div>
          <p className="forgot-password">Forgot Password?</p>
        </div>

        <button type="submit" className="submit-btn login-btn">
          {loader ? <ClipLoader color="#0e0c0a" size={20} /> : "Sign In"}
        </button>
        <p className="bottom-text">
          Don't have an account?
          <a href="/register" className="login-bottom-spl-text">
            {" "}
            Sign up now
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
