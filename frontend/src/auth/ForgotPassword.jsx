import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Reuse the FloatingLabelInput component (same style as before)
const FloatingLabelInput = ({
  type = "text",
  name,
  value,
  onChange,
  label,
  required = false,
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
    padding: 0 10px;
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
`;

const CardWrapper = styled.div`
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
    margin-bottom: 1.5rem;
    color: #90caf9;
  }

  p.description {
    text-align: center;
    color: #b6c5e2;
    margin-bottom: 2rem;
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

  p.message {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: #f87171; /* for error or status messages */
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/auth/forgot-password`, { email });
      setMessage('If your email is registered, you will receive a reset link shortly.');
    } catch (err) {
      setMessage('Error sending reset link.');
    }
  };

  return (
    <CardWrapper>
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p className="description">Enter your email to receive a password reset link.</p>

        <FloatingLabelInput
          type="email"
          label="Email Address"
          name="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button type="submit">Send Reset Link</button>

        {message && <p className="message">{message}</p>}
      </form>
    </CardWrapper>
  );
};

export default ForgotPassword;
