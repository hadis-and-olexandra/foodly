import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function SettingsCustomer() {
  const navigate = useNavigate();

  // -------- Profile --------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [profileMessage, setProfileMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // -------- Password --------
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  // Load user data when opened
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/customers/profile");
        setFormData({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          phone: res.data.user.phone || "",
          address: res.data.user.address || "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [navigate]);

  const handleProfileChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/customers/profile", formData);

      // ✅ Updating localStorage
      const updatedUser = res.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setProfileMessage("✅ Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setProfileMessage("❌ Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/customers/profile/password", passwordData);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      setPasswordMessage("✅ Password updated successfully");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Failed to update password:", error);
      setPasswordMessage("❌ Failed to update password");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* -------- Edit Profile -------- */}
      <div className="w-full max-w-md rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5">
        <div className="border bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-20 place-items-center">
          <span className="font-sans font-bold text-xl text-stone-50">
            Edit Profile
          </span>
        </div>

        <form onSubmit={handleProfileSubmit} className="px-3.5 py-2.5">
          <InputField
            label="Name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleProfileChange}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleProfileChange}
          />
          <InputField
            label="Phone"
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleProfileChange}
          />
          <InputField
            label="Address"
            id="address"
            type="text"
            value={formData.address}
            onChange={handleProfileChange}
          />

          <button
            type="submit"
            className="mt-3 inline-flex items-center justify-center cursor-pointer 
                     border font-sans font-medium text-sm py-2 px-4 
                     text-stone-50 bg-stone-800 rounded-lg border-stone-900 
                     shadow-sm hover:shadow-md hover:bg-stone-700 focus:outline-none"
          >
            Update Profile
          </button>
        </form>
        {profileMessage && (
          <p className="text-center text-sm py-2 text-stone-700">
            {profileMessage}
          </p>
        )}
      </div>

      {/* -------- Change Password -------- */}
      <div className="w-full max-w-md rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5">
        <div className="border bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-20 place-items-center">
          <span className="font-sans font-bold text-xl text-stone-50">
            Change Password
          </span>
        </div>

        <form onSubmit={handlePasswordSubmit} className="px-3.5 py-2.5">
          <InputField
            label="Current Password"
            id="currentPassword"
            type="password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />
          <InputField
            label="New Password"
            id="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />

          <button
            type="submit"
            className="mt-3 inline-flex items-center justify-center cursor-pointer 
                     border font-sans font-medium text-sm py-2 px-4 
                     text-stone-50 bg-stone-800 rounded-lg border-stone-900 
                     shadow-sm hover:shadow-md hover:bg-stone-700 focus:outline-none"
          >
            Update Password
          </button>
        </form>
        {passwordMessage && (
          <p className="text-center text-sm py-2 text-stone-700">
            {passwordMessage}
          </p>
        )}
      </div>
    </div>
  );
}

function InputField({ label, id, type, value, onChange }) {
  return (
    <div className="mb-4 space-y-1.5">
      <label
        htmlFor={id}
        className="font-sans text-sm text-black font-semibold"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 border border-stone-200 transition-all ease-in text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 focus:border-stone-400"
      />
    </div>
  );
}

// import React from "react";

// export default function SettingsCustomer() {
//   return (
//     <div className="max-w-xs w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 mx-auto mt-6">
//       <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
//         <span className="font-sans antialiased font-bold text-2xl text-stone-50">
//           Edit Profile
//         </span>
//       </div>
//       <form
//         // onSubmit={handleSubmit}
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
//               className="w-full outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in select-none text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 focus:border-stone-400 peer"
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
//               className="w-full outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in select-none text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 focus:border-stone-400 peer"
//             />
//           </div>
//         </div>

//         {/* Phone */}
//         <div className="mb-4 mt-2 space-y-1.5">
//           <label
//             htmlFor="phone"
//             className="font-sans antialiased text-sm text-black font-semibold"
//           >
//             Phone
//           </label>
//           <div className="relative w-full">
//             <input
//               id="phone"
//               name="phone"
//               placeholder="+380..."
//               type="tel"
//               className="w-full outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in select-none text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 focus:border-stone-400 peer"
//             />
//           </div>
//         </div>

//         {/* Address */}
//         <div className="mb-4 mt-2 space-y-1.5">
//           <label
//             htmlFor="address"
//             className="font-sans antialiased text-sm text-black font-semibold"
//           >
//             Address
//           </label>
//           <div className="relative w-full">
//             <input
//               id="address"
//               name="address"
//               placeholder="Your address"
//               type="text"
//               className="w-full outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in select-none text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 focus:border-stone-400 peer"
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
//               className="w-full outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in select-none text-sm py-2 px-2.5 shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 focus:border-stone-400 peer"
//             />
//           </div>
//         </div>

//         {/* Submit button */}
//         <button
//           className="
//             inline-flex items-center justify-center
//             cursor-pointer border align-middle select-none font-sans font-medium text-center
//             duration-300 ease-in text-sm py-2 px-4
//             text-stone-50 bg-stone-800
//             rounded-lg border-stone-900
//             shadow-sm hover:shadow-md
//             hover:bg-stone-700
//             disabled:opacity-50 disabled:cursor-not-allowed
//             focus:outline-none
//           "
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// }
