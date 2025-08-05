import React from 'react';
import styled from 'styled-components';

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
      {rightIcon &&
        <span className="icon" onClick={onRightIconClick}>
          {rightIcon}
        </span>
      }
    </div>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    color: white;
  }

  .container .label {
    font-size: 15px;
    padding-left: 10px;
    position: absolute;
    top: 13px;
    left: 0;
    transition: 0.3s;
    pointer-events: none;
    color: #fff;
  }

  .input {
    width: 100%;
    height: 45px;
    border: none;
    outline: none;
    padding: 0 7px;
    border-radius: 6px;
    color: #fff;
    font-size: 15px;
    background-color: transparent;
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px rgba(255, 255, 255, 0.4);
    background: #091732;
  }

  .input:focus {
    border: 2px solid #4682fa;
  }

  .container .input:valid ~ .label,
  .container .input:focus ~ .label {
    transition: 0.3s;
    padding-left: 2px;
    transform: translateY(-35px) scale(0.95);
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

export default FloatingLabelInput;
