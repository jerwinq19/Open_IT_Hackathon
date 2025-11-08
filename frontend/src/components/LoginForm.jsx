import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import api from "../utils/api";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const formSubmit = (data) => {
    
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="bg-white shadow-xl flex flex-col items-center gap-5 py-10 px-20 rounded-3xl"
    >
      <div className="text-center">
        <h1 className="font-bold text-2xl mb-2">SIGN IN</h1>
        <p>Sign in to view recent earthquakes.</p>
      </div>

      <div className="w-full">
        <h1>Username</h1>
        <input
          type="text"
          {...register("username", { required: "Username is required." })}
          placeholder={`${
            errors.username ? errors.username?.message : "Username"
          }`}
          className={`w-full bg-gray-100 px-5 py-3 rounded-lg border  shadow-md focus:outline-none focus:scale-110 transition-all ${
            errors.username ? "border-red-400 text-red-500" : "border-gray-400"
          }`}
        />
      </div>

      <div className="w-full">
        <h1>Password</h1>
        <input
          type="password"
          {...register("password", { required: "Password is required." })}
          placeholder={`${
            errors.password ? errors.password?.message : "Password"
          }`}
          className={`w-full bg-gray-100 px-5 py-3 rounded-lg border  shadow-md focus:outline-none focus:scale-110 transition-all ${
            errors.password ? "border-red-400 text-red-500" : "border-gray-400"
          }`}
        />
      </div>
      <h1 className="text-sm text-left w-full">
        Forgot password? <span className="text-blue-500">Click here.</span>
      </h1>

      <button
        className="btn text-2xl font-bold w-full hover:scale-120 transition-all cursor-pointer py-6"
        type="submit"
      >
        {isSubmitting ? <span className="loading"></span> :'SUBMIT'}
        
      </button>

      {errors.root && (
        <p className="text-red-600 text-xs mb-5">
          <img
            src="https://img.icons8.com/?size=100&id=60673&format=png&color=FA5252"
            className="inline mr-1 w-4 h-4"
          ></img>
          {errors.root?.message}
        </p>
      )}

      <h1>
        Don't have an account? <Link to='/register' className="text-blue-500 cursor-pointer">Create an account here.</Link>
      </h1>
    </form>
  );
};

export default LoginForm;
