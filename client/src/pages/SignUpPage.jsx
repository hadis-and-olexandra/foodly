import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function SignupPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role") || "customer";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      if (user.role === "chef") {
        navigate("/chef/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    const phoneRegex = /^\+?[0-9]{10,14}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      await api.post("/auth/register", {
        ...formData,
        role,
      });
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="max-w-xs w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 mx-auto mt-6">
      <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
        <span className="font-sans antialiased font-bold text-2xl text-stone-50">
          {role === "chef" ? "Register as Chef" : "Sign Up as Customer"}
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full h-max rounded px-3.5 py-2.5"
      >
        <FormField
          id="name"
          name="name"
          label="Name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <FormField
          id="email"
          name="email"
          label="Email"
          placeholder="someone@example.com"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormField
          id="password"
          name="password"
          label="Password"
          placeholder="********"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <FormField
          id="phone"
          name="phone"
          label="Phone"
          placeholder="+316..."
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <FormField
          id="address"
          name="address"
          label="Address"
          placeholder="Your address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />

        <button className="cursor-pointer inline-flex items-center justify-center select-none font-sans font-medium text-sm text-stone-50 px-4 py-2 rounded-lg border border-stone-900 bg-stone-800 shadow-sm transition-colors duration-200 hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none w-full mt-4">
          Create Account
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-center text-sm font-medium mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

function FormField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-4 mt-2 space-y-1.5">
      <label
        htmlFor={id}
        className="font-sans antialiased text-sm text-black font-semibold"
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full outline-none text-stone-800 placeholder:text-stone-600/60 border transition-all ease-in text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg duration-100 focus:border-stone-400 ${
            error ? "border-red-500" : "border-stone-200 hover:border-stone-300"
          }`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default SignupPage;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import api from "../services/api";

// function SignupPage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const searchParams = new URLSearchParams(location.search);
//   const role = searchParams.get("role") || "customer";

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//   });

//   const [error, setError] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (token && user) {
//       if (user.role === "chef") {
//         navigate("/chef/dashboard");
//       } else {
//         navigate("/customer/dashboard");
//       }
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await api.post("/auth/register", {
//         ...formData,
//         role,
//       });
//       navigate("/login");
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "Registration failed. Please try again.";
//       setError(message);
//     }
//   };

//   return (
//     <div className="max-w-xs w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 mx-auto mt-6">
//       <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
//         <span className="font-sans antialiased font-bold text-2xl text-stone-50">
//           {role === "chef" ? "Register as Chef" : "Sign Up as Customer"}
//         </span>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="w-full h-max rounded px-3.5 py-2.5"
//       >
//         {/* Name */}
//         <FormField
//           id="name"
//           name="name"
//           label="Name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         {/* Email */}
//         <FormField
//           id="email"
//           name="email"
//           label="Email"
//           placeholder="someone@example.com"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         {/* Password */}
//         <FormField
//           id="password"
//           name="password"
//           label="Password"
//           placeholder="************"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//         />

//         {/* Phone */}
//         <FormField
//           id="phone"
//           name="phone"
//           label="Phone"
//           placeholder="+316..."
//           value={formData.phone}
//           onChange={handleChange}
//         />

//         {/* Address */}
//         <FormField
//           id="address"
//           name="address"
//           label="Address"
//           placeholder="Your address"
//           value={formData.address}
//           onChange={handleChange}
//         />

//         {/* Submit */}
//         <button
//           // className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased"
//           className="
//   cursor-pointer inline-flex items-center justify-center
//   select-none font-sans font-medium text-sm text-stone-50
//   px-4 py-2 rounded-lg
//   border border-stone-900
//   bg-stone-800
//   shadow-sm
//   transition-colors duration-200
//   hover:bg-stone-700
//   disabled:opacity-50 disabled:cursor-not-allowed
//   focus:outline-none
// "
//         >
//           Create Account
//         </button>
//       </form>

//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// }

// function FormField({
//   id,
//   name,
//   label,
//   placeholder,
//   type = "text",
//   value,
//   onChange,
// }) {
//   return (
//     <div className="mb-4 mt-2 space-y-1.5">
//       <label
//         htmlFor={id}
//         className="font-sans antialiased text-sm text-black font-semibold"
//       >
//         {label}
//       </label>
//       <div className="relative w-full">
//         <input
//           id={id}
//           name={name}
//           placeholder={placeholder}
//           type={type}
//           value={value}
//           onChange={onChange}
//           className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 focus:border-stone-400 peer"
//         />
//       </div>
//     </div>
//   );
// }

// export default SignupPage;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import api from "../services/api";

// function SignupPage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const searchParams = new URLSearchParams(location.search);
//   const role = searchParams.get("role") || "customer";

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   // Перевірка, чи вже є токен — якщо є, перекидаємо на дашборд
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (token && user) {
//       if (user.role === "chef") {
//         navigate("/chef/dashboard");
//       } else {
//         navigate("/customer/dashboard");
//       }
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await api.post("/auth/register", {
//         ...formData,
//         role, // роль з URL
//       });
//       navigate("/login");
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "Registration failed. Please try again.";
//       setError(message);
//     }
//   };

//   return (
//     <div className="max-w-xs w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 mx-auto mt-6">
//       <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
//         <span className="font-sans antialiased font-bold text-2xl text-stone-50">
//           {role === "chef" ? "Register as Chef" : "Sign Up as Customer"}
//         </span>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="w-full h-max rounded px-3.5 py-2.5"
//       >
//         {/* Name */}
//         <div className="mb-4 mt-2 space-y-1.5">
//           <label
//             htmlFor="name"
//             className="font-sans antialiased text-sm text-black font-semibold"
//           >
//             Name
//           </label>
//           <div className="relative w-full">
//             <input
//               id="name"
//               name="name"
//               placeholder="Name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="mb-4 mt-2 space-y-1.5">
//           <label
//             htmlFor="email"
//             className="font-sans antialiased text-sm text-black font-semibold"
//           >
//             Email
//           </label>
//           <div className="relative w-full">
//             <input
//               id="email"
//               name="email"
//               placeholder="someone@example.com"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div className="mb-4 space-y-1.5">
//           <label
//             htmlFor="password"
//             className="font-sans antialiased text-sm text-stone-800 font-semibold"
//           >
//             Password
//           </label>
//           <div className="relative w-full">
//             <input
//               id="password"
//               name="password"
//               placeholder="************"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased">
//           Create Account
//         </button>
//       </form>

//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// }

// export default SignupPage;

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// function SignupPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchParams = new URLSearchParams(location.search);
//   const role = searchParams.get("role") || "customer";

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const userData = {
//         ...formData,
//         role,
//       };

//       await axios.post("http://localhost:5001/api/auth/register", userData);

//       // Redirecting to the login page after successful registration
//       navigate("/login");
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "Registration failed. Please try again.";
//       console.error("Signup error:", message);
//       setError(message);
//     }
//   };

//   return (
//     <div className="max-w-xs w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 mx-auto mt-6">
//       <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
//         <span className="font-sans antialiased font-bold text-2xl text-stone-50">
//           {role === "chef" ? "Register as Chef" : "Sign Up as Customer"}
//         </span>
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         className="w-full h-max rounded px-3.5 py-2.5"
//       >
//         <div className="mb-4 mt-2 space-y-1.5">
//           <label
//             htmlFor="name"
//             className="font-sans antialiased text-sm text-black font-semibold"
//           >
//             Name
//           </label>
//           <div className="relative w-full">
//             <input
//               id="name"
//               name="name"
//               placeholder="Name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
//             />
//           </div>
//         </div>
//         <div className="mb-4 mt-2 space-y-1.5">
//           <label
//             htmlFor="email"
//             className="font-sans antialiased text-sm text-black font-semibold"
//           >
//             Email
//           </label>
//           <div className="relative w-full">
//             <input
//               id="email"
//               name="email"
//               placeholder="someone@example.com"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
//             />
//           </div>
//         </div>
//         <div className="mb-4 space-y-1.5">
//           <label
//             htmlFor="password"
//             className="font-sans antialiased text-sm text-stone-800 font-semibold"
//           >
//             Password
//           </label>
//           <div className="relative w-full">
//             <input
//               id="password"
//               name="password"
//               placeholder="************"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
//             />
//           </div>
//         </div>
//         <button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased">
//           Create Account
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// }

// export default SignupPage;
