import React from "react";
import { toast } from "react-toastify";
import Input from "../input";
import form from "../../HOC/form";
import { signup } from "../../services/userService";
import { loginWithJwt } from "../../services/authService";
import { schema, providedConstraints } from "../../validations/signup";

const SignupElements = ({ data, errors, handleChange }) => {
  return (
    <>
      <h1>Sign up to register your advertisements.</h1>

      <Input
        name="name"
        label="Name"
        error={errors.name}
        type="text"
        value={data.name}
        placeholder="Enter your name"
        onChange={handleChange}
      />

      <Input
        name="email"
        label="Email"
        error={errors.email}
        type="text"
        value={data.email}
        placeholder="Enter your email"
        onChange={handleChange}
      />

      <Input
        name="password"
        label="Password"
        error={errors.password}
        type="password"
        value={data.password}
        placeholder="Enter your password"
        onChange={handleChange}
      />

      <button type="submit">Sign up</button>
    </>
  );
};

export default form(
  SignupElements,
  { name: "", email: "", password: "" },
  async (data) => {
    try {
      const { headers } = await signup(data);
      loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
    } catch ({ response }) {
      if (response && response.status === 400) toast.error(response.data);
    }
  },
  schema,
  providedConstraints
);
