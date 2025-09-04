// page with details of the selected dish

// import React from "react";

// export default function DishDetails() {
//   return <div>DishDetails</div>;
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import placeholderDish from "../assets/img.jpg";

export default function DishDetails() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const res = await api.get(`/foods/details/${id}`);
        console.log("👉 Food response:", res.data);
        const data = res.data;

        // Завжди гарантуємо, що ingredients — масив
        if (!Array.isArray(data.ingredients)) {
          data.ingredients = [];
        }

        setDish(data);
      } catch (err) {
        console.error("❌ Failed to load dish", err);
        alert(err.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchDish();

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in as a customer to add items to your cart");
      return;
    }
    if (user.role !== "customer") {
      alert("Only customers can add to cart");
      return;
    }

    try {
      const res = await api.post("/cart/add", { foodId: id, quantity: 1 });
      const items = res.data.items || [];
      localStorage.setItem("cart", JSON.stringify(items));
      const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem("cartCount", totalCount);
      window.dispatchEvent(new Event("cartUpdated"));
      alert("Added to cart!");
    } catch (err) {
      console.error("❌ Failed to add to cart", err);
      alert(err.response?.data?.message || "Server error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!dish) return <p className="text-center mt-10">Dish not found</p>;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-6">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md border border-stone-100 overflow-hidden">
        {/* Image */}
        <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
          <img
            // src={dish.image || "https://via.placeholder.com/300"}
            src={dish.image?.trim() || placeholderDish}
            alt={dish.name || "Dish"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="md:w-2/3 px-6 py-6 flex flex-col">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">
            {dish.name || "Untitled Dish"}
          </h2>
          <p className="text-stone-600 text-sm mb-4 flex-grow">
            {dish.description || "No description available."}
          </p>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-stone-700">
              Ingredients:
            </h4>
            <p className="text-stone-600 text-sm">
              {dish.ingredients.length > 0
                ? dish.ingredients.join(", ")
                : "No ingredients listed"}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <span className="font-bold text-lg text-stone-600">
              ${dish.price?.toFixed(2) || "0.00"}
            </span>
            <button
              onClick={handleAddToCart}
              className="cursor-pointer px-4 py-2 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-sm text-stone-50 rounded-lg bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 shadow-sm hover:shadow-md hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:outline-none focus:shadow-none transition-shadow transition-colors duration-300 ease-in antialiased"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
