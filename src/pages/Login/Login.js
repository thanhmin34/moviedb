import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase/Config";
import { addDoc, collection } from "firebase/firestore";

// import { useValue, valueProvider } from "./context-values";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [info, setInfo] = useState("");
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);
  onAuthStateChanged(auth, (currentUser) => {
    setInfo(currentUser);
  });
  const handleSign = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, values.email, values.password);
    console.log("login thanh cong");
  };
  return (
    <div className="w-full max-w-[400px] flex flex-col justify-center items-center mx-auto mt-12">
      <h2 className="text-2xl font-medium mb-20">Đăng nhập tài khoản</h2>
      <form className="w-full gap-5 px-8 " onClick={handleSign}>
        <input
          type="email"
          className="w-full outline-none py-1 px-2 text-[#333] rounded-lg my-2"
          name="email"
          placeholder="Enter you address email"
          onChange={handleInputChange}
        />

        <input
          type="current-password"
          className="w-full outline-none py-1 px-2 text-[#333] rounded-lg my-2"
          name="password"
          placeholder="Enter you address password"
          onChange={handleInputChange}
        />

        <button className="w-full py-2 text-primary hover:opacity-80">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
