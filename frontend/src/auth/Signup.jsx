import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import show from "../assets/show.svg";
import unshow from "../assets/disable.svg";

// --- FloatingLabelInput ---
const FloatingLabelInput = ({
  type = "text",
  name,
  value,
  onChange,
  label,
  required = false,
  rightIcon,
  onRightIconClick,
  as, // allow 'select' as well
  children,
  ...rest
}) => (
  <StyledWrapper>
    <div className="container">
      {as === 'select' ? (
        <select
          required={required}
          name={name}
          className="input"
          value={value}
          onChange={onChange}
          {...rest}
        >
          {children}
        </select>
      ) : (
        <input
          required={required}
          type={type}
          name={name}
          className="input"
          value={value}
          onChange={onChange}
          autoComplete="off"
          {...rest}
        />
      )}
      <label className="label">{label}</label>
      {rightIcon && !as &&
        <span className="icon" onClick={onRightIconClick}>
          {rightIcon}
        </span>
      }
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .container {
    position: relative;
    color: white;
    margin-bottom: 1.5rem;
  }

  .container .label {
    font-size: 15px;
    position: absolute;
    top: 13px;
    left: 10px;
    transition: 0.3s;
    pointer-events: none;
    color: #fff;
    background: #091732;
    padding: 0 4px;
  }

  .input {
    width: 100%;
    height: 45px;
    border: none;
    outline: none;
    padding: 0 40px 0 10px;
    border-radius: 6px;
    color: #fff;
    font-size: 15px;
    background: #091732;
    background-color: transparent;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1),
      -1px -1px 6px rgba(255, 255, 255, 0.4);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .container select.input {
    padding-right: 35px; /* space for custom arrow */
    cursor: pointer;
  }

  /* Custom arrow for select */
  .container select.input::-ms-expand {
    display: none; /* hide default arrow in IE */
  }
  .container select.input {
    background-image:
      linear-gradient(45deg, transparent 50%, #cbd5e1 50%),
      linear-gradient(135deg, #cbd5e1 50%, transparent 50%),
      linear-gradient(to right, #091732, #091732);
    background-position:
      calc(100% - 20px) calc(50% - 3px),
      calc(100% - 15px) calc(50% - 3px),
      100% 0;
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
  }

  .input:focus {
    border: 2px solid #4682fa;
  }

  .container .input:valid ~ .label,
  .container .input:focus ~ .label {
    top: -8px;
    font-size: 13px;
    color: #90caf9;
  }

  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;
  }

  /* Style options to match card bg and text */
  select option {
    background-color: #091732 !important;
    color: #cbd5e1 !important;
  }
`;

const CardWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dbe9fd 0%, #bad2fa 100%);

  .card {
    background: #091732;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.23);
    width: 100%;
    max-width: 430px;
    color: #cbd5e1;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #90caf9;
  }

  .subtitle {
    text-align: center;
    color: #b6c5e2;
    margin-bottom: 1.8rem;
    font-size: 1rem;
  }

  button {
    width: 100%;
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    padding: 0.75rem 0;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #2563eb;
    }
  }

  .login-text {
    text-align: center;
    font-size: 0.9rem;
    color: #cbd5e1;
    margin-top: 1.2rem;
  }

  .login-text a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
  }

  .login-text a:hover {
    text-decoration: underline;
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor',
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/signup`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Signup successful!');
      navigate("/login");
      console.log('Response:', res.data);
    } catch (err) {
      console.error('Signup error:', err);
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <CardWrapper>
      <div className="card">
        <h2>Create an Account</h2>
        <div className="subtitle">
          Join our <span style={{ color: '#3b82f6', fontWeight: 600 }}>healthcare platform</span> to connect with doctors, nurses, and patients.
        </div>
        <form onSubmit={handleSubmit}>

          <FloatingLabelInput
            type="text"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FloatingLabelInput
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FloatingLabelInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
            rightIcon={
              <img
                src={showPassword ? show : unshow}
                alt={showPassword ? "Hide password" : "Show password"}
                style={{ width: 24, height: 24 }}
              />
            }
            onRightIconClick={togglePasswordVisibility}
          />

          <FloatingLabelInput
            as="select"
            name="role"
            label="Role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="admin">Administrator</option>
            <option value="patient">Patient</option>
          </FloatingLabelInput>

          <button type="submit">Sign Up</button>

          <div className="login-text">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </CardWrapper>
  );
};

export default Signup;
