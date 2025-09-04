import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Видаляємо токен
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Оновлюємо всі вкладки/компоненти
    window.dispatchEvent(new Event("storage"));

    // Перенаправлення
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="
  cursor-pointer
  hidden lg:ml-auto lg:inline-flex
  items-center justify-center select-none
  font-sans font-medium text-sm text-stone-50
  px-3 py-1.5 rounded-lg
  border border-stone-900
  bg-stone-800
  shadow-sm
  transition-colors duration-200
  hover:bg-stone-700
  disabled:opacity-50 disabled:cursor-not-allowed
  focus:outline-none
"
      // className="items-center justify-center align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased hidden lg:ml-auto lg:inline-block"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
