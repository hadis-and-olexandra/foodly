import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData
      );

      const { token, user } = response.data;

      // Store the token and user (temporarily in localStorage)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(new Event("storage"));

      if (user.role === "chef") {
        navigate("/chef/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="max-w-xs w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 mx-auto mt-6">
      <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
        <span className="font-sans antialiased font-bold text-xl md:text-2xl lg:text-3xl text-stone-50">
          Login
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full h-max rounded px-3.5 py-2.5"
      >
        <div className="mb-4 mt-2 space-y-1.5">
          <label
            htmlFor="email"
            className="font-sans antialiased text-sm text-black font-semibold"
          >
            Email
          </label>
          <div className="relative w-full">
            <input
              id="email"
              name="email"
              placeholder="someone@example.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
            />
          </div>
        </div>
        <div className="mb-4 space-y-1.5">
          <label
            htmlFor="password"
            className="font-sans antialiased text-sm text-stone-800 font-semibold"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              placeholder="************"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
            />
          </div>
        </div>
        <label htmlFor="remember" className="mb-4 flex items-center gap-2">
          <label
            className="group shadow-sm shadow-stone-950/5 inline-block relative h-5 w-5 cursor-pointer rounded bg-transparent border border-stone-200 transition-all duration-200 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none hover:shadow-md text-stone-50"
            htmlFor="remember"
          >
            <input id="remember" type="checkbox" style={{ display: "none" }} />
            <span className="pointer-events-none absolute left-2/4 top-2/4 text-current -translate-x-2/4 -translate-y-2/4 scale-75 opacity-0 transition-all duration-200 ease-in">
              <svg
                fill="none"
                width="18px"
                height="18px"
                strokeWidth="2"
                color="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 13L9 17L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </label>
          <p className="font-sans antialiased text-base text-stone-600">
            Remember Me
          </p>
        </label>
        <button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased">
          Login
        </button>
      </form>
      <div className="w-full px-3.5 pt-2 pb-3.5 rounded text-center">
        <small className="font-sans antialiased text-sm my-1 flex items-center justify-center gap-1 text-stone-600">
          Don't have an account?
          <Link
            to="/signup"
            className="font-sans antialiased text-sm text-stone-500 font-bold"
          >
            Sign up
          </Link>
        </small>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LoginPage;

{
  /* <div className="auth-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div> */
}
