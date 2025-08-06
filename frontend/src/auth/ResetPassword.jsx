import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import show from "../assets/show.svg";
import unshow from "../assets/disable.svg";

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

const ResetPasswordWrapper = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: #dbe9fd;

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

  /* Enhanced Button Styling */
  button {
    width: 100%;
    background: transparent;
    color: #fff;
    font-size: 17px;
    text-transform: uppercase;
    font-weight: 600;
    border: none;
    padding: 20px 30px;
    cursor: pointer;
    perspective: 30rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.308);
    position: relative;
    overflow: hidden;
    margin-top: 1rem;
  }

  button::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    background: linear-gradient(
      320deg,
      rgba(0, 140, 255, 0.678),
      rgba(128, 0, 128, 0.308)
    );
    z-index: 1;
    transition: background 0.3s;
  }

  button:hover::before {
    animation: rotate 1s;
    transition: all 0.5s;
    background: linear-gradient(
      320deg,
      rgba(0, 140, 255, 0.9),
      rgba(128, 0, 128, 0.6)
    );
  }

  button span {
    position: relative;
    z-index: 2;
  }

  @keyframes rotate {
    0% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }

  p.message {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.875rem;
    color: #f87171;
  }
`;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await axios.post(`https://jeevaloop.onrender.com/auth/reset-password/${token}`, { password });
      setMessage('Password reset successful, redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Invalid or expired token');
    }
  };

  return (
    <ResetPasswordWrapper>
      <form onSubmit={handleReset}>
        <h2>Reset Password</h2>

        <FloatingLabelInput
          type={showPassword1 ? 'text' : 'password'}
          label="New Password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightIcon={
            <img
              src={showPassword1 ? show : unshow}
              alt={showPassword1 ? 'Hide password' : 'Show password'}
              style={{ width: 24, height: 24 }}
            />
          }
          onRightIconClick={() => setShowPassword1((v) => !v)}
        />

        <FloatingLabelInput
          type={showPassword2 ? 'text' : 'password'}
          label="Confirm Password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          rightIcon={
            <img
              src={showPassword2 ? show : unshow}
              alt={showPassword2 ? 'Hide password' : 'Show password'}
              style={{ width: 24, height: 24 }}
            />
          }
          onRightIconClick={() => setShowPassword2((v) => !v)}
        />

        <button type="submit">
          <span>Reset Password</span>
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </ResetPasswordWrapper>
  );
};

export default ResetPassword;
