import "./Register.css";
import { useState } from "react";

// Alert Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ClipLoader } from "react-spinners"; // Loader

import { LuUserRoundCheck, LuUserRound } from "react-icons/lu";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Register = () => {
  const [loader, setLoader] = useState(false); //Loader
  const [showPassword, setShowPassword] = useState(false); //Show the Password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //Show Confirm password

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTermsAndServices: false,
  });

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const registerNewForm = (event) => {
    setLoader(true);
    event.preventDefault();
    setLoader(false);
    console.log(registerData);
    toast.success("Account created successfully!");
  };

  return (
    <div className="register-section">
      <header className="header-section">
        <div className="logo-card">
          <LuUserRoundCheck className="header-icon" />
        </div>
        <h1>Create Account</h1>
        <p>Fill in the details to start your journey</p>
      </header>

      {/* Form */}
      <form className="register-form" onSubmit={registerNewForm}>
        <div className="form-group">
          <label>Username*</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={registerData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email Address*</label>
          <input
            name="email"
            type="email"
            placeholder="email@gmail.com"
            required
            onChange={handleChange}
            value={registerData.email}
          />
        </div>

        <div className="form-group password-field">
          <label>Password*</label>
          <input
            className="form-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            required
            autoComplete="new-password"
            onChange={handleChange}
            value={registerData.password}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password-icon"
          >
            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </span>
        </div>

        <div className="form-group password-field">
          <label>Confirm Password*</label>
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            required
            onChange={handleChange}
            value={registerData.confirmPassword}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="toggle-password-icon"
          >
            {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </span>
        </div>

        <div className="terms-group">
          <input
            type="checkbox"
            name="agreeTermsAndServices"
            className="terms-checkbox"
            checked={registerData.agreeTermsAndServices}
            onChange={handleChange}
          />
          <p className="terms-text">
            I agree to the{" "}
            <span className="terms-spl-text">Terms of Service </span>
            and <span className="terms-spl-text">Privacy Policy</span>
          </p>
        </div>

        <button type="submit" className="submit-btn">
          {loader ? <ClipLoader color="#0e0c0a" size={20} /> : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Register;
