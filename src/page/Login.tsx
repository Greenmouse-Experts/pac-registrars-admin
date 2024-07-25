/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import axios from "axios";
import { useForm } from "react-hook-form";
import { BASEURL } from "../config/url";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [loading, setloading] = useState (false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setloading(true)
    try {
      const response = await axios.post(`${BASEURL}/auth/admin/login`, data);
      const token = response.data.token;
      localStorage.setItem("pac_token", token);
      navigate("/admin");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials and try again.");
    }finally{
      setloading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#202A44]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
       <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1721899630/pac_wvpszx.png"/>
        
        <h2 className="text-2xl font-bold text-center"> Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#202A44] rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
