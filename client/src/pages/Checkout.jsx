import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cartItems = [
  {
    id: 1,
    name: "Premium Phone Case",
    price: 39.99,
    quantity: 1,
    img: "https://images.unsplash.com/photo-1697120164518-8eccb8d19e1d?auto=format&fit=crop&w=400&h=300&q=75",
  },
  {
    id: 2,
    name: "Wireless Charger",
    price: 29.99,
    quantity: 2,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=300&q=75",
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 mt-6">
      {/* Two columns */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column - Delivery Form */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-stone-200">
          <h3 className="text-lg font-semibold text-stone-700 mb-4">
            Delivery Information
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
            />

            {/* Delivery Method */}
            <select className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500">
              <option>Standard Shipping</option>
              <option>Express Shipping</option>
            </select>

            {/* Payment Method */}
            <select className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500">
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Cash on Delivery</option>
            </select>
          </form>
        </div>

        {/* Right column - Order Summary */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 border border-stone-200">
          <h3 className="text-lg font-semibold text-stone-700 mb-4">
            Your Order
          </h3>
          <ul className="divide-y divide-stone-200">
            {items.map((item) => (
              <li
                key={item.id}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-stone-700 font-medium">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 bg-stone-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 bg-stone-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-stone-700 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    {/* SVG Cross */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-semibold text-stone-700">Total</p>
            <p className="text-lg font-bold text-stone-800">
              ${totalAmount.toFixed(2)}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/orders")}
              className="px-4 py-2 bg-stone-300 text-stone-800 rounded-lg hover:bg-stone-400 transition"
            >
              Back to Orders
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
