import React from "react";
import { toast } from "react-toastify";
import Input from "../input";
import form from "../../HOC/form";
import { login } from "../../services/authService";
import { schema, providedConstraints } from "../../validations/login";

const LoginElements = ({ data, errors, handleChange }) => {
  return (
    <>
      <h1>Log in to your account.</h1>

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

      <button type="submit">Log in</button>
    </>
  );
};

export default form(
  LoginElements,
  { email: "", password: "" },
  async (data) => {
    try {
      await login(data);
      window.location = "/";
    } catch ({ response }) {
      if (response && response.status === 400) toast.error(response.data);
    }
  },
  schema,
  providedConstraints
);
