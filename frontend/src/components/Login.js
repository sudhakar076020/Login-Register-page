import "./LoginRegister.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { FiLogIn } from "react-icons/fi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoader(true);
      const { email, password } = loginData;
      const apiUrl = "http://localhost:3000/login";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // send session cookies
      };
      const response = await fetch(apiUrl, options);

      const data = await response.text();
      if (!response.ok) throw new Error(data);

      toast.success(response.data);
      setLoader(false);
      navigate("/dashboard");
    } catch (error) {
      setLoader(false);
      toast.error(error.response?.data || "Login failed");
    }
  };

  // Change browser tab title
  useEffect(() => {
    document.title = "Login page"; // Set the desired title here
  }, []);

  return (
    <div className="container login-section">
      <header className="header-section">
        <div className="logo-card login-logo-card">
          <FiLogIn className="header-icon" />
        </div>
        <h1>Welcome Back</h1>
        <p>Please sign in to your account</p>
      </header>

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
            placeholder="Enter your password"
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

        <button type="submit" className="submit-btn login-btn">
          {loader ? <ClipLoader color="#0e0c0a" size={20} /> : "Sign In"}
        </button>

        <p className="bottom-text">
          Don't have an account?{" "}
          <a href="/register" className="login-bottom-spl-text">
            Sign up now
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
