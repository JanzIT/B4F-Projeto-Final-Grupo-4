// src/pages/register.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Auth.module.css"; // Importando o módulo CSS
import axios from "axios";
import Button from "@/components/Common/Button";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const router = useRouter();

  const goToLogin = () => {
    router.push("/auth");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setRegisterMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put("/api/auth", {
        name: username,
        email,
        password,
        userSkills: {
          generalSkills: [],
          careerSkills: [],
        },
        scoreAcquiredSkills: null,
        chosenCareer: null,
        careerSuggestions: [],
      });
      if (response.data.success) {
        setRegisterMessage("");
        router.push("/auth");
      } else {
        setRegisterMessage(response.data.message);
      }
    } catch (error) {
      setRegisterMessage("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      className="bg-gradient-to-b from-mainBgGradientStart via-mainBgGradientMiddle to-mainBgGradientEnd
      flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="/img-register.png" alt="Logo" className="mx-auto w-auto" />

        <h1 className="text-white font-semibold text-[26px] tracking-tight mb-4 mt-6">
          Start your tech career journey.{" "}
          <span className=" font-bold bg-gradient-to-tl from-purple-700 to-orange-400 bg-clip-text text-transparent">
            Find the perfect match!
          </span>
        </h1>
        {/* <h2 className="text-white font-medium text-lg text-left mb-6">
          Stand out with a personalized plan for your career transition.
        </h2> */}
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="mb-4 w-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6
          text-gray-400"
            >
              Username:
            </label>

            <div className="mt-2">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="
            block w-full h-10 px-4 py-2 rounded-full   bg-gray-800
             text-gray-500 shadow-sm  placeholder:text-gray-500 focus:ring-2
            focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6
              text-gray-400"
            >
              Email:
            </label>

            <div className="mt-2">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" block w-full h-10 px-4 py-2 rounded-full   bg-gray-800
              text-gray-500 shadow-sm  placeholder:text-gray-500 focus:ring-2
             focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="password"
              className="text-gray-400 font-medium text-sm mb-1 block"
            >
              Password:
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
              block w-full h-10 px-4 py-2 rounded-full   bg-gray-800
               text-gray-500 shadow-sm  placeholder:text-gray-500 focus:ring-2
              focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium leading-6
              text-gray-400"
            >
              Confirm Password:
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="
              block w-full h-10 px-4 py-2 rounded-full   bg-gray-800
               text-gray-500 shadow-sm  placeholder:text-gray-500 focus:ring-2
              focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 focus:outline-none"
                placeholder="Confirme your password"
              />
            </div>
          </div>

          <Button label="Sign up" />

          {/* <button type="submit" className={styles.button}>
            Register
          </button> */}

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <span
              className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
              onClick={goToLogin}
              style={{ cursor: "pointer" }}
            >
              Login
            </span>
          </p>
          {registerMessage && (
            <p className={styles.errorMessage}>{registerMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register
