// a chef's page with his dishes

import React from "react";
import { useNavigate } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "Premium Phone Case",
    description:
      "Durable phone case with military-grade protection and sleek design",
    price: "$39.99",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1697120164518-8eccb8d19e1d?auto=format&fit=crop&w=400&h=300&q=75",
  },
  {
    id: 2,
    name: "Another Product",
    description: "Fast wireless charger compatible with all devices",
    price: "$29.99",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=300&q=75",
  },
  {
    id: 3,
    name: "Stylish Headphones",
    description: "Comfortable and high-quality sound headphones",
    price: "$59.99",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&h=300&q=75",
  },
  {
    id: 4,
    name: "Smart Watch",
    description: "Feature-rich smart watch with long battery life",
    price: "$199.99",
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&h=300&q=75",
  },
  {
    id: 5,
    name: "Wireless Charger",
    description: "Fast wireless charger compatible with all devices",
    price: "$24.99",
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1697120164518-8eccb8d19e1d?auto=format&fit=crop&w=400&h=300&q=75",
  },
  {
    id: 6,
    name: "Portable Speaker",
    description: "Fast wireless charger compatible with all devices",
    price: "$49.99",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&h=300&q=75",
  },
];

export default function ChefDetails() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/dishes/${id}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 mt-6">
      <h2 className="font-sans antialiased text-lg font-bold uppercase text-stone-600 flex justify-center items-center gap-x-2 p-2 hover:text-primary mb-6">
        Menu by "Name Organization"
      </h2>
      <ul className="grid grid-cols-3 gap-6 mb-6">
        {users.slice(0, 6).map((user) => (
          <li
            key={user.id}
            onClick={() => handleClick(user.id)}
            // className="cursor-pointer transition-shadow duration-300 hover:shadow-lg rounded-lg"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs border border-stone-100 hover:shadow-lg transition-shadow duration-300 p-4">
              <div className="h-48 p-2">
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-stone-800">
                    {user.name}
                  </h3>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-amber-400"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-sm text-stone-600 ml-1">
                      {user.rating}
                    </span>
                  </div>
                </div>
                <p className="text-stone-600 text-sm mb-4">
                  {user.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-stone-600 ml-1">
                    {user.price}
                  </span>
                  <button
                    className="
    cursor-pointer
    px-4 py-2 inline-flex items-center justify-center border align-middle select-none
    font-sans font-medium text-center text-sm text-stone-50 rounded-lg
    bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900
    shadow-sm hover:shadow-md
    hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900
    disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed
    focus:outline-none focus:shadow-none
    transition-shadow transition-colors duration-300 ease-in
    antialiased
  "
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
