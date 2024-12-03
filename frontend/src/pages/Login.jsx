import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Login = ({setUserName}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [currentState, setCurrentState] = useState("Sign up");

  const navigate = useNavigate()

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    const url =
      currentState === "Login"
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/register";

    const data =
      currentState === "Login"
        ? { email, password }
        : { name, email, password };

    try {
      const response = await axios.post(url, data);
      
      if (currentState === "Login") {
        // Khi login thành công, lưu token vào localStorage và điều hướng

        localStorage.setItem("userName", response.data.name)
        setUserName(response.data.name)       // Lưu tên người dùng
        navigate("/")       // Điều hướng đến trang Home

      } else {
        alert("Registered successfully!")
        setCurrentState("Login")
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data === "Email already exists") {
          alert("This Email Already Exists")
        } else {
          alert("An error occurred")
        }
      } else {
        alert("An error occurred")
      }

      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandle}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-gray-400"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-9 bg-white" />
      </div>

      {currentState === "Sign up" && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>

      <button type="sumbit" className="bg-white text-black font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
