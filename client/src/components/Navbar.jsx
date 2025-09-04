import React, { useState, useEffect } from "react";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import api from "../services/api";

const Navbar = () => {
  const [language, setLanguage] = useState("EN");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).role : null;
  });
  const [cartCount, setCartCount] = useState(0);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "NL" : "EN"));
  };

  // Функція для отримання кількості товарів з бекенду
  const fetchCartCount = async () => {
    if (!isLoggedIn || role !== "customer") return;
    try {
      const res = await api.get("/cart", { withCredentials: true });
      const items = res.data.items || [];
      setCartCount(items.reduce((total, item) => total + item.quantity, 0));
    } catch (err) {
      console.error("Failed to fetch cart count:", err);
    }
  };

  useEffect(() => {
    // Оновлюємо статус входу та роль при зміні localStorage
    const onStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      const storedUser = localStorage.getItem("user");
      setRole(storedUser ? JSON.parse(storedUser).role : null);
    };
    window.addEventListener("storage", onStorageChange);

    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  useEffect(() => {
    fetchCartCount(); // початкове отримання кількості

    // слухаємо кастомну подію "cartUpdated"
    const handleCartUpdated = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => window.removeEventListener("cartUpdated", handleCartUpdated);
  }, [isLoggedIn, role]);

  return (
    <nav className="rounded-lg overflow-hidden p-2 bg-white mx-auto w-full max-w-6xl px-6">
      <div className="flex items-center w-full">
        <Link
          to="/"
          className="font-sans antialiased font-bold uppercase text-stone-600 ml-2 mr-2 block py-1 select-none text-lg lg:text-xl"
          style={{ color: "#1f2937" }}
        >
          🍽️ <span className="ml-1">Foodly</span>
        </Link>
        <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />

        {isLoggedIn && (
          <Link
            // to="/customer/dashboard"
            to={role === "chef" ? "/chef/dashboard" : "/customer/dashboard"}
            className="font-sans antialiased text-xs font-bold uppercase text-stone-600 flex items-center gap-x-1 p-1 hover:text-primary"
          >
            Account
          </Link>
        )}
        <div className="hidden lg:block">
          <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    to="/signup?role=chef"
                    className="font-sans antialiased text-xs font-bold uppercase text-stone-600 flex items-center gap-x-2 p-1 hover:text-primary"
                  >
                    💛 Sign Up as a Chef
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup?role=customer"
                    className="font-sans antialiased text-xs font-bold uppercase text-stone-600 p-1 hover:text-primary"
                  >
                    Sign Up as a Customer
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {isLoggedIn ? (
          <div className="ml-auto flex items-center gap-x-3">
            {role === "customer" && (
              <Link
                to="/checkout"
                className="relative text-stone-600 hover:text-primary flex items-center"
              >
                <MdShoppingCart className="w-6 h-6 text-stone-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <LogoutButton />
          </div>
        ) : (
          <Link
            to="/login"
            className="
              cursor-pointer hidden lg:ml-auto lg:inline-flex
              items-center justify-center select-none
              font-sans font-medium text-sm text-stone-50
              px-3 py-1.5 rounded-lg
              border border-stone-900
              bg-stone-800 shadow-sm
              transition-colors duration-200
              hover:bg-stone-700
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none
            "
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from "react";
// import { MdShoppingCart } from "react-icons/md";
// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Navbar = () => {
//   const [language, setLanguage] = useState("EN");
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
//   const [role, setRole] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser).role : null;
//   });
//   const [cartCount, setCartCount] = useState(0);

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "EN" ? "NL" : "EN"));
//   };

//   useEffect(() => {
//     // Оновлюємо статус входу та роль при зміні localStorage
//     const onStorageChange = () => {
//       setIsLoggedIn(!!localStorage.getItem("token"));
//       const storedUser = localStorage.getItem("user");
//       setRole(storedUser ? JSON.parse(storedUser).role : null);
//     };

//     window.addEventListener("storage", onStorageChange);

//     return () => window.removeEventListener("storage", onStorageChange);
//   }, []);

//   useEffect(() => {
//     // Функція для оновлення кількості товарів у корзині
//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCartCount(
//         cart.reduce((total, item) => total + (item.quantity || 1), 0)
//       );
//     };

//     // Слухаємо кастомну подію "cartUpdated"
//     window.addEventListener("cartUpdated", updateCartCount);

//     // Початкове оновлення
//     updateCartCount();

//     return () => window.removeEventListener("cartUpdated", updateCartCount);
//   }, []);

//   return (
//     <nav className="rounded-lg overflow-hidden p-2 bg-white mx-auto w-full max-w-6xl px-6">
//       <div className="flex items-center w-full">
//         <Link
//           to="/"
//           className="font-sans antialiased font-bold uppercase text-stone-600 ml-2 mr-2 block py-1 select-none text-lg lg:text-xl"
//           style={{ color: "#1f2937" }}
//         >
//           🍽️ <span className="ml-1">Foodly</span>
//         </Link>
//         <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />

//         {isLoggedIn && (
//           <Link
//             to="/customer/dashboard"
//             className="font-sans antialiased text-xs font-bold uppercase text-stone-600 flex items-center gap-x-1 p-1 hover:text-primary"
//           >
//             Account
//           </Link>
//         )}
//         <div className="hidden lg:block">
//           <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
//             {!isLoggedIn && (
//               <>
//                 <li>
//                   <Link
//                     to="/signup?role=chef"
//                     className="font-sans antialiased text-xs font-bold uppercase text-stone-600 flex items-center gap-x-2 p-1 hover:text-primary"
//                   >
//                     💛 Sign Up as a Chef
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/signup?role=customer"
//                     className="font-sans antialiased text-xs font-bold uppercase text-stone-600 p-1 hover:text-primary"
//                   >
//                     Sign Up as a Customer
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>

//         {isLoggedIn ? (
//           <div className="ml-auto flex items-center gap-x-3">
//             {role === "customer" && (
//               <Link
//                 to="/checkout"
//                 className="relative text-stone-600 hover:text-primary flex items-center"
//               >
//                 <MdShoppingCart className="w-6 h-6 text-stone-700" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             )}
//             <LogoutButton />
//           </div>
//         ) : (
//           <Link
//             to="/login"
//             className="
//               cursor-pointer hidden lg:ml-auto lg:inline-flex
//               items-center justify-center select-none
//               font-sans font-medium text-sm text-stone-50
//               px-3 py-1.5 rounded-lg
//               border border-stone-900
//               bg-stone-800 shadow-sm
//               transition-colors duration-200
//               hover:bg-stone-700
//               disabled:opacity-50 disabled:cursor-not-allowed
//               focus:outline-none
//             "
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { MdShoppingCart } from "react-icons/md";
// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Navbar = () => {
//   const [language, setLanguage] = useState("EN");
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
//   const [role, setRole] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser).role : null;
//   });

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "EN" ? "NL" : "EN"));
//   };

//   useEffect(() => {
//     const onStorageChange = () => {
//       setIsLoggedIn(!!localStorage.getItem("token"));

//       const storedUser = localStorage.getItem("user");
//       setRole(storedUser ? JSON.parse(storedUser).role : null);
//     };

//     window.addEventListener("storage", onStorageChange);

//     return () => window.removeEventListener("storage", onStorageChange);
//   }, []);

//   return (
//     <nav className="rounded-lg overflow-hidden p-2 bg-white mx-auto w-full max-w-6xl px-6">
//       <div className="flex items-center w-full">
//         <Link
//           to="/"
//           className="font-sans antialiased font-bold uppercase text-stone-600 ml-2 mr-2 block py-1 select-none text-lg lg:text-xl"
//           style={{ color: "#1f2937" }}
//         >
//           🍽️ <span className="ml-1">Foodly</span>
//         </Link>
//         <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />

//         {isLoggedIn && (
//           <Link
//             to="/customer/dashboard"
//             className="font-sans antialiased text-xs font-bold uppercase text-stone-600 flex items-center gap-x-1 p-1 hover:text-primary"
//           >
//             Account
//           </Link>
//         )}
//         <div className="hidden lg:block">
//           <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
//             {!isLoggedIn && (
//               <>
//                 <li>
//                   <Link
//                     to="/signup?role=chef"
//                     className="font-sans antialiased text-xs font-bold uppercase text-stone-600 flex items-center gap-x-2 p-1 hover:text-primary"
//                   >
//                     💛 Sign Up as a Chef
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/signup?role=customer"
//                     className="font-sans antialiased text-xs font-bold uppercase text-stone-600 p-1 hover:text-primary"
//                   >
//                     Sign Up as a Customer
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>

//         {isLoggedIn ? (
//           <div className="ml-auto flex items-center gap-x-3">
//             {role === "customer" && (
//               <Link
//                 to="/checkout"
//                 className="text-stone-600 hover:text-primary flex items-center"
//               >
//                 <MdShoppingCart className="w-6 h-6 text-stone-700" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             )}
//             <LogoutButton />
//           </div>
//         ) : (
//           <Link
//             to="/login"
//             className="
//               cursor-pointer hidden lg:ml-auto lg:inline-flex
//               items-center justify-center select-none
//               font-sans font-medium text-sm text-stone-50
//               px-3 py-1.5 rounded-lg
//               border border-stone-900
//               bg-stone-800 shadow-sm
//               transition-colors duration-200
//               hover:bg-stone-700
//               disabled:opacity-50 disabled:cursor-not-allowed
//               focus:outline-none
//             "
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Navbar = () => {
//   const [language, setLanguage] = useState("EN");
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "EN" ? "NL" : "EN"));
//   };

//   useEffect(() => {
//     const onStorageChange = () => {
//       setIsLoggedIn(!!localStorage.getItem("token"));
//     };

//     window.addEventListener("storage", onStorageChange);

//     return () => window.removeEventListener("storage", onStorageChange);
//   }, []);

//   return (
//     <nav className="rounded-lg overflow-hidden p-2 bg-white mx-auto w-full max-w-6xl px-6">
//       <div className="flex items-center w-full">
//         <Link
//           to="/"
//           className="font-sans antialiased font-bold uppercase text-stone-600 ml-2 mr-2 block py-1 select-none text-lg lg:text-xl"
//           style={{ color: "#1f2937" }}
//         >
//           🍽️ <span className="ml-1">Foodly</span>
//         </Link>
//         <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />

//         {isLoggedIn && (
//           <Link
//             to="/customer/dashboard"
//             className="font-sans antialiased text-xs font-bold uppercase text-stone-600 flex items-center gap-x-1 p-1 hover:text-primary"
//           >
//             Account
//           </Link>
//         )}
//         <div className="hidden lg:block">
//           <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
//             {!isLoggedIn && (
//               <>
//                 <li>
//                   <Link
//                     to="/signup?role=chef"
//                     className="font-sans antialiased text-xs font-bold uppercase text-stone-600 flex items-center gap-x-2 p-1 hover:text-primary"
//                   >
//                     💛 Sign Up as a Chef
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/signup?role=customer"
//                     className="font-sans antialiased text-xs font-bold uppercase text-stone-600 p-1 hover:text-primary"
//                   >
//                     Sign Up as a Customer
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>

//         {isLoggedIn ? (
//           <LogoutButton />
//         ) : (
//           <Link
//             to="/login"
//             className="
//   cursor-pointer
//   hidden lg:ml-auto lg:inline-flex
//   items-center justify-center select-none
//   font-sans font-medium text-sm text-stone-50
//   px-3 py-1.5 rounded-lg
//   border border-stone-900
//   bg-stone-800
//   shadow-sm
//   transition-colors duration-200
//   hover:bg-stone-700
//   disabled:opacity-50 disabled:cursor-not-allowed
//   focus:outline-none
// "
//             // className="items-center justify-center align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased hidden lg:ml-auto lg:inline-block"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Navbar = () => {
//   const [language, setLanguage] = useState("EN");
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "EN" ? "NL" : "EN"));
//   };

//   useEffect(() => {
//     const onStorageChange = () => {
//       setIsLoggedIn(!!localStorage.getItem("token"));
//     };

//     window.addEventListener("storage", onStorageChange);

//     return () => window.removeEventListener("storage", onStorageChange);
//   }, []);

//   return (
//     <nav className="rounded-lg overflow-hidden p-2 bg-white mx-auto w-full max-w-6xl px-6">
//       <div className="flex items-center w-full">
//         <Link
//           to="/"
//           className="font-sans antialiased font-bold uppercase text-stone-600 ml-2 mr-2 block py-1 select-none text-lg lg:text-xl"
//           style={{ color: "#1f2937" }}
//         >
//           🍽️ <span className="ml-1">Foodly</span>
//         </Link>
//         <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
//         <div className="hidden lg:block">
//           <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
//             <li>
//               <Link
//                 to="/signup?role=chef"
//                 className="font-sans antialiased text-xs font-bold uppercase text-stone-600 flex items-center gap-x-2 p-1 hover:text-primary"
//               >
//                 {/* 💛 Share your cooking */}
//                 💛 Sing Up as a Chef
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/signup?role=customer"
//                 className="font-sans antialiased text-xs font-bold uppercase text-stone-600 p-1 hover:text-primary"
//               >
//                 Sign Up as a Customer
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <Link
//           to="/login"
//           className="items-center justify-center align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased hidden lg:ml-auto lg:inline-block"
//         >
//           Login
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// <nav className="navbar">
//   <div className="navbar-logo">
//     <Link to="/">🍽️ Foodly</Link>
//   </div>

//   <div className="navbar-links">
//     {!isLoggedIn ? (
//       <>
//         <Link to="/signup?role=chef">
//           {language === "EN"
//             ? "Share your cooking 💛"
//             : "Deel jouw gerechten 💛"}
//         </Link>
//         <Link to="/signup?role=customer">
//           {language === "EN" ? "Sign Up" : "Registreren"}
//         </Link>
//         <Link to="/login">{language === "EN" ? "Login" : "Inloggen"}</Link>
//       </>
//     ) : (
//       <LogoutButton onLogout={() => setIsLoggedIn(false)} />
//     )}

//     <button onClick={toggleLanguage}>
//       {language === "EN" ? "🇬🇧 EN" : "🇳🇱 NL"}
//     </button>
//   </div>
// </nav>

// <nav className="rounded-lg overflow-hidden p-2 bg-white mx-auto w-full max-w-6xl px-6">
//   <div className="flex items-center">
//     <Link
//       to="/"
//       className="font-sans antialiased text-current ml-2 mr-2 block py-1 font-extrabold text-2xl select-none"
//       style={{ color: "#1f2937" }}
//     >
//       🍽️ <span className="ml-1">Foodly</span>
//     </Link>
//     <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
//     <div className="hidden lg:block">
//       <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
//         <li>
//           <Link
//             to="/signup?role=chef"
//             className="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary"
//           >
//             💛 Share your cooking
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/signup?role=customer"
//             className="font-sans antialiased text-sm text-current p-1 hover:text-primary"
//           >
//             Sign Up
//           </Link>
//         </li>
//       </ul>
//     </div>
//     <Link
//       to="/login"
//       className="items-center justify-center align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased hidden lg:ml-auto lg:inline-block"
//     >
//       Login
//     </Link>
//   </div>
// </nav>
