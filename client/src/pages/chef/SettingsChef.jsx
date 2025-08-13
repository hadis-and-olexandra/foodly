import React from "react";

export default function SettingsChef() {
  return (
    <div className="max-w-xs w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 mx-auto mt-6">
      <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
        <span className="font-sans antialiased font-bold text-2xl text-stone-50">
          Edit Profile
        </span>
      </div>
      <form
        // onSubmit={handleSubmit}
        className="w-full h-max rounded px-3.5 py-2.5"
      >
        <div className="mb-4 mt-2 space-y-1.5">
          <label
            htmlFor="name"
            className="font-sans antialiased text-sm text-black font-semibold"
          >
            Name
          </label>
          <div className="relative w-full">
            <input
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              // value={formData.name}
              // onChange={handleChange}
              className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
            />
          </div>
        </div>
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
              // value={formData.email}
              // onChange={handleChange}
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
              // value={formData.password}
              // onChange={handleChange}
              className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
            />
          </div>
        </div>
        <button className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased">
          Update Profile
        </button>
      </form>
      {/* {error && <p className="error-message">{error}</p>} */}
    </div>
  );
}
