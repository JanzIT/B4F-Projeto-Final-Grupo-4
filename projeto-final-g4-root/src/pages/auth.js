import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Auth.module.css";
import axios from "axios";
import Button from "@/components/Common/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth", { email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setLoginMessage("");
        router.push("/intro");
      } else {
        setLoginMessage(response.data.message);
      }
    } catch (error) {
      setLoginMessage("Login failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      className="flex min-h-full flex-1 flex-col justify-center px-6 pb-10 pt-14 lg:px-8 
    bg-gradient-to-b from-mainBgGradientStart via-mainBgGradientMiddle to-mainBgGradientEnd"
    >
      <div className="m:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto w-auto" src="/img-login.png" alt="Logo" />
        <h1 className="text-white font-semibold text-[26px] tracking-tight mb-5 mt-8">
          Start your tech career journey.{" "}
          <span className=" font-bold bg-gradient-to-tl from-purple-700 to-orange-400 bg-clip-text text-transparent">
            Find the perfect match!
          </span>
        </h1>

        <h2 className="text-white font-medium text-lg text-left mb-2">
          Stand out with a personalized plan for your career transition.
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
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
                className="
                block w-full h-10 px-4 py-2 rounded-full   bg-gray-800
                 text-gray-500 shadow-sm  placeholder:text-gray-500 focus:ring-2
                focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-400 
               "
              >
                Password:
              </label>
            </div>
            <div className="my-2">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full h-10 px-4 py-2 rounded-full bg-gray-800 
                text-gray-500 shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800
                sm:text-sm sm:leading-6 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>{" "}
            <div className="text-sm flex justify-end ">
              <a
                href="#"
                className="font-semibold text-neutral-600 hover:text-indigo-500 underline"
              >
                Forgot password?
              </a>
            </div>
            <div>
              <Button label="Sign In" onClick={handleLogin} />

              {/* <button type="submit" className={styles.button}>
              Login
            </button> */}

            </div>
          </div>

          <div className="mt-10 text-center text-sm text-gray-400">
            <p>
              Don't have an account yet?{" "}
              <a
                onClick={() => router.push("/register")}
                className="font-semibold leading-6 text-indigo-300 hover:text-indigo-500 underline"
              >
                Sign Up
              </a>
            </p>
          </div>

          {/* <button
            type="button"
            onClick={() => router.push("/register")}
            className={styles.button}
          >
            Register
          </button> */}
          {loginMessage && (
            <p className="text-red-600 flex justify-center">{loginMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;