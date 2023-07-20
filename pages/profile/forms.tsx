import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
//less code
//better validation
//better errors (set, clear, display)
//have control over inputs
//dont deal with event
//easier inputs

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

const Forms: NextPage = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  const onValid = (data: LoginForm) => {
    console.log("i am valid");
    setError("username", { message: "Taken Username" });
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "username is required",
          minLength: {
            message: "The username should be longer than 5 chars",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      {errors.username?.message}
    </form>
  );
};

export default Forms;
