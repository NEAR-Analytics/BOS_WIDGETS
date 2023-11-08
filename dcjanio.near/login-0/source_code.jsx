import React from "react";
import styled from "styled-components";

// Add your CSS styles in a template literal
const css = `
  .LoginContainer{
      box-sizing: border-box;
      margin: 0 auto;
      padding: 16px;
      max-width: 400px;
      text-align: center;
      border: 1px solid #eceef0;
      border-radius: 8px;
  }
  
  .Title {
      font-size: 24px;
      margin-bottom: 8px;
  }
  
  .LoginButton {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      margin: 15px 0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
  }
  
  .LoginButton:hover {
      background-color: #45a049;
  }
  
  .LoginPrompt {
      font-size: 16px;
      margin-bottom: 20px;
  }
`;

// Styled components
const LoginContainer = styled.div`
  ${css}
`;

// React component
const Login = () => {
  return (
    <LoginContainer>
      <div className="Title">Contract Management Enterprise</div>
      <div className="LoginPrompt">please log in to see this page!</div>
      <button className="LoginButton">Login</button>
    </LoginContainer>
  );
};

export default Login;
