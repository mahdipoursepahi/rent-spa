import React from "react";
import { Link } from "react-router-dom";
import LoginElements from "./loginElements";

const Login = () => {
  return (
    <div className="login">
      <LoginElements />
      <p>
        Don't have an account? &nbsp;
        <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
