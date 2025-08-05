import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import show from "../assets/show.svg";
import unshow from "../assets/disable.svg";

// ---- FloatingLabelInput Component ----
const FloatingLabelInput = ({
  type = "text",
  name,
  value,
  onChange,
  label,
  required = false,
  rightIcon,
  onRightIconClick,
  ...rest
}) => (
  <StyledWrapper>
    <div className="container">
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
      <label className="label">{label}</label>
      {rightIcon && (
        <span className="icon" onClick={onRightIconClick}>
          {rightIcon}
        </span>
      )}
    </div>
  </StyledWrapper>
);

// ---- Styled Components ----
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
    background-color: transparent;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1),
      -1px -1px 6px rgba(255, 255, 255, 0.4);
    background: #091732;
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
`;

const CardWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dbe9fd;

  form {
    background: #091732;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 400px;
    color: #cbd5e1;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
    color: #90caf9;
  }

  .subtitle {
    text-align: center;
    color: #b6c5e2;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  .forgot-link {
    display: flex;
    justify-content: flex-end;
    margin-top: -1rem;
    margin-bottom: 1.25rem;
  }

  .forgot-link a {
    color: #3b82f6;
    font-size: 0.94rem;
    text-decoration: none;
    font-weight: 500;
    transition: text-decoration 0.18s;
  }
  .forgot-link a:hover {
    text-decoration: underline;
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

  .register-text {
    text-align: center;
    font-size: 0.9rem;
    color: #cbd5e1;
    margin-top: 1rem;
  }

  .register-text a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
  }

  .register-text a:hover {
    text-decoration: underline;
  }
`;

// ---- Login Component ----
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      login(res.data.user);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <CardWrapper>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="subtitle">
          Welcome back! Log in to access your{' '}
          <span style={{ color: '#3b82f6', fontWeight: 600 }}>healthcare dashboard</span>.
        </div>

        <FloatingLabelInput
          type="email"
          label="Email Address"
          name="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <FloatingLabelInput
          type={showPassword ? 'text' : 'password'}
          label="Password"
          name="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          rightIcon={
            <img
              src={showPassword ? unshow : show}
              alt={showPassword ? "Hide password" : "Show password"}
              style={{ width: 24, height: 24 }}
            />
          }
          onRightIconClick={togglePasswordVisibility}
        />

        <div className="forgot-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button type="submit">Login</button>

        <div className="register-text">
          Don't have an account?{' '}
          <Link to="/register">
            Register here
          </Link>
        </div>
      </form>
    </CardWrapper>
  );
};

export default Login;
