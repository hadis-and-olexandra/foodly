// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const cartItems = [
//   {
//     id: 1,
//     name: "Premium Phone Case",
//     price: 39.99,
//     quantity: 1,
//     img: "https://images.unsplash.com/photo-1697120164518-8eccb8d19e1d?auto=format&fit=crop&w=400&h=300&q=75",
//   },
//   {
//     id: 2,
//     name: "Wireless Charger",
//     price: 29.99,
//     quantity: 2,
//     img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=300&q=75",
//   },
// ];

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState(cartItems);

//   const updateQuantity = (id, delta) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const totalAmount = items.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const handlePlaceOrder = () => {
//     alert("Order placed successfully!");
//     navigate("/orders");
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-6 mt-6">
//       {/* Two columns */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Left column - Delivery Form */}
//         <div className="bg-white rounded-lg shadow-md p-6 border border-stone-200">
//           <h3 className="text-lg font-semibold text-stone-700 mb-4">
//             Delivery Information
//           </h3>
//           <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="tel"
//               placeholder="Phone"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />

//             {/* Delivery Method */}
//             <select className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500">
//               <option>Standard Shipping</option>
//               <option>Express Shipping</option>
//             </select>

//             {/* Payment Method */}
//             <select className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500">
//               <option>Credit Card</option>
//               <option>PayPal</option>
//               <option>Cash on Delivery</option>
//             </select>
//           </form>
//         </div>

//         {/* Right column - Order Summary */}
//         <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 border border-stone-200">
//           <h3 className="text-lg font-semibold text-stone-700 mb-4">
//             Your Order
//           </h3>
//           <ul className="divide-y divide-stone-200">
//             {items.map((item) => (
//               <li
//                 key={item.id}
//                 className="py-4 flex items-center justify-between"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.img}
//                     alt={item.name}
//                     className="w-16 h-16 rounded-md object-cover"
//                   />
//                   <div>
//                     <p className="text-stone-700 font-medium">{item.name}</p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <button
//                         onClick={() => updateQuantity(item.id, -1)}
//                         className="px-2 py-1 bg-stone-200 rounded"
//                       >
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, 1)}
//                         className="px-2 py-1 bg-stone-200 rounded"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <p className="text-stone-700 font-medium">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                   <button
//                     onClick={() => removeItem(item.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     {/* SVG Cross */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Total */}
//           <div className="flex justify-between items-center mt-6">
//             <p className="text-lg font-semibold text-stone-700">Total</p>
//             <p className="text-lg font-bold text-stone-800">
//               ${totalAmount.toFixed(2)}
//             </p>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={() => navigate("/orders")}
//               className="px-4 py-2 bg-stone-300 text-stone-800 rounded-lg hover:bg-stone-400 transition"
//             >
//               Back to Orders
//             </button>
//             <button
//               onClick={handlePlaceOrder}
//               className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await api.get("/cart", { withCredentials: true });
//         setItems(res.data.items || []);
//       } catch (err) {
//         console.error("Failed to fetch cart:", err);
//       }
//     };
//     fetchCart();
//   }, []);

//   const updateQuantity = async (foodId, newQuantity) => {
//     if (newQuantity < 1) return;
//     try {
//       const res = await api.put(
//         "/cart/update",
//         { foodId, quantity: newQuantity },
//         { withCredentials: true }
//       );
//       setItems(res.data.items);
//       window.dispatchEvent(new Event("cartUpdated"));
//     } catch (err) {
//       console.error("Failed to update quantity:", err);
//     }
//   };

//   const removeItem = async (foodId) => {
//     try {
//       const res = await api.delete(`/cart/${foodId}`, {
//         withCredentials: true,
//       });
//       setItems(res.data.items);
//       window.dispatchEvent(new Event("cartUpdated"));
//     } catch (err) {
//       console.error("Failed to remove item:", err);
//     }
//   };

//   const totalAmount = items.reduce(
//     (total, item) => total + item.food.price * item.quantity,
//     0
//   );

//   const handlePlaceOrder = () => {
//     alert("Order placed successfully!");
//     navigate("/orders");
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-6 mt-6">
//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6 border border-stone-200">
//           <h3 className="text-lg font-semibold text-stone-700 mb-4">
//             Delivery Information
//           </h3>
//           <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="tel"
//               placeholder="Phone"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <select className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500">
//               <option>Standard Shipping</option>
//               <option>Express Shipping</option>
//             </select>
//             <select className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500">
//               <option>Credit Card</option>
//               <option>PayPal</option>
//               <option>Cash on Delivery</option>
//             </select>
//           </form>
//         </div>

//         <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 border border-stone-200">
//           <h3 className="text-lg font-semibold text-stone-700 mb-4">
//             Your Order
//           </h3>
//           <ul className="divide-y divide-stone-200">
//             {items.map((item) => (
//               <li
//                 key={item.food._id}
//                 className="py-4 flex items-center justify-between"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.food.image}
//                     alt={item.food.name}
//                     className="w-16 h-16 rounded-md object-cover"
//                   />
//                   <div>
//                     <p className="text-stone-700 font-medium">
//                       {item.food.name}
//                     </p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <button
//                         onClick={() =>
//                           updateQuantity(item.food._id, item.quantity - 1)
//                         }
//                         className="px-2 py-1 bg-stone-200 rounded"
//                       >
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() =>
//                           updateQuantity(item.food._id, item.quantity + 1)
//                         }
//                         className="px-2 py-1 bg-stone-200 rounded"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <p className="text-stone-700 font-medium">
//                     ${(item.food.price * item.quantity).toFixed(2)}
//                   </p>
//                   <button
//                     onClick={() => removeItem(item.food._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between items-center mt-6">
//             <p className="text-lg font-semibold text-stone-700">Total</p>
//             <p className="text-lg font-bold text-stone-800">
//               ${totalAmount.toFixed(2)}
//             </p>
//           </div>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={() => navigate("/orders")}
//               className="px-4 py-2 bg-stone-300 text-stone-800 rounded-lg hover:bg-stone-400 transition"
//             >
//               Back to Orders
//             </button>
//             <button
//               onClick={handlePlaceOrder}
//               className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);

//   // Fetch cart on component mount
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await api.get("/cart", { withCredentials: true });
//         setItems(res.data.items || []);
//       } catch (err) {
//         console.error("Failed to fetch cart:", err);
//       }
//     };
//     fetchCart();
//   }, []);

//   // Update quantity
//   const updateQuantity = async (foodId, newQuantity) => {
//     if (newQuantity < 1) return; // мінімум 1
//     try {
//       const res = await api.put(
//         "/cart/update",
//         { foodId, quantity: newQuantity },
//         { withCredentials: true }
//       );
//       // res.data має вигляд { items: [...] }
//       setItems(res.data.items || []);
//       window.dispatchEvent(new Event("cartUpdated")); // оновлюємо Navbar
//     } catch (err) {
//       console.error("Failed to update quantity:", err);
//     }
//   };

//   // Remove item
//   const removeItem = async (foodId) => {
//     try {
//       const res = await api.delete(`/cart/${foodId}`, {
//         withCredentials: true,
//       });
//       setItems(res.data.items || []);
//       window.dispatchEvent(new Event("cartUpdated"));
//     } catch (err) {
//       console.error("Failed to remove item:", err);
//     }
//   };

//   // Total amount
//   const totalAmount = items.reduce(
//     (total, item) => total + item.food.price * item.quantity,
//     0
//   );

//   const handlePlaceOrder = () => {
//     alert("Order placed successfully!");
//     navigate("/orders");
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-6 mt-6">
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Delivery Information */}
//         <div className="bg-white rounded-lg shadow-md p-6 border border-stone-200">
//           <h3 className="text-lg font-semibold text-stone-700 mb-4">
//             Delivery Information
//           </h3>
//           <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="tel"
//               placeholder="Phone"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500"
//             />
//             <select className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500">
//               <option>Standard Shipping</option>
//               <option>Express Shipping</option>
//             </select>
//             <select className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500">
//               <option>Credit Card</option>
//               <option>PayPal</option>
//               <option>Cash on Delivery</option>
//             </select>
//           </form>
//         </div>

//         {/* Your Order */}
//         <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 border border-stone-200">
//           <h3 className="text-lg font-semibold text-stone-700 mb-4">
//             Your Order
//           </h3>
//           <ul className="divide-y divide-stone-200">
//             {items.length > 0 ? (
//               items.map((item) => (
//                 <li
//                   key={item.food._id}
//                   className="py-4 flex items-center justify-between"
//                 >
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={item.food.image}
//                       alt={item.food.name}
//                       className="w-16 h-16 rounded-md object-cover"
//                     />
//                     <div>
//                       <p className="text-stone-700 font-medium">
//                         {item.food.name}
//                       </p>
//                       <div className="flex items-center gap-2 mt-1">
//                         <button
//                           onClick={() =>
//                             updateQuantity(item.food._id, item.quantity - 1)
//                           }
//                           className="px-2 py-1 bg-stone-200 rounded cursor-pointer"
//                         >
//                           -
//                         </button>
//                         <span>{item.quantity}</span>
//                         <button
//                           onClick={() =>
//                             updateQuantity(item.food._id, item.quantity + 1)
//                           }
//                           className="px-2 py-1 bg-stone-200 rounded cursor-pointer"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <p className="text-stone-700 font-medium">
//                       ${(item.food.price * item.quantity).toFixed(2)}
//                     </p>
//                     <button
//                       onClick={() => removeItem(item.food._id)}
//                       className="text-red-500 hover:text-red-700 cursor-pointer"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <p className="col-span-3 text-center text-stone-500">
//                 Your cart is empty
//               </p>
//             )}
//           </ul>

//           <div className="flex justify-between items-center mt-6">
//             <p className="text-lg font-semibold text-stone-700">Total</p>
//             <p className="text-lg font-bold text-stone-800">
//               ${totalAmount.toFixed(2)}
//             </p>
//           </div>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 bg-stone-300 text-stone-800 rounded-lg hover:bg-stone-400 transition cursor-pointer"
//             >
//               Back to Orders
//             </button>
//             <button
//               onClick={handlePlaceOrder}
//               className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition cursor-pointer"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // Delivery form state
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Standard Shipping");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [customerNote, setCustomerNote] = useState("");

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", { withCredentials: true });
        setItems(res.data.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (foodId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await api.put(
        "/cart/update",
        { foodId, quantity: newQuantity },
        { withCredentials: true }
      );
      setItems(res.data.items || []);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const removeItem = async (foodId) => {
    try {
      const res = await api.delete(`/cart/${foodId}`, {
        withCredentials: true,
      });
      setItems(res.data.items || []);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const totalAmount = items.reduce(
    (total, item) => total + item.food.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!fullName || !address || !city || !country || !phone || !email) {
      alert("Please fill all delivery information");
      return;
    }

    try {
      const shippingAddress = `${fullName}, ${address}, ${city}, ${country}, ${phone}, ${email}, ${shippingMethod}`;
      const orderData = {
        shippingAddress,
        paymentMethod,
        customerNote,
      };

      const res = await api.post("/orders", orderData, {
        withCredentials: true,
      });
      console.log("Order created:", res.data.order);

      // Clear cart after successful order
      await api.delete("/cart/clear", { withCredentials: true });
      setItems([]);
      window.dispatchEvent(new Event("cartUpdated"));

      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 mt-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-stone-200">
          <h3 className="text-lg font-semibold text-stone-700 mb-4">
            Delivery Information
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded px-4 py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border rounded px-4 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border rounded px-4 py-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full border rounded px-4 py-2"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full border rounded px-4 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              className="w-full border rounded px-4 py-2"
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              <option>Standard Shipping</option>
              <option>Express Shipping</option>
            </select>
            <select
              className="w-full border rounded px-4 py-2"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Cash on Delivery</option>
            </select>
            <textarea
              placeholder="Customer Note"
              className="w-full border rounded px-4 py-2"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
            />
          </form>
        </div>

        {/* Your Order */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 border border-stone-200">
          <h3 className="text-lg font-semibold text-stone-700 mb-4">
            Your Order
          </h3>
          <ul className="divide-y divide-stone-200">
            {items.length > 0 ? (
              items.map((item) => (
                <li
                  key={item.food._id}
                  className="py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.food.image}
                      alt={item.food.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-stone-700 font-medium">
                        {item.food.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.food._id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-stone-200 rounded cursor-pointer"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.food._id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-stone-200 rounded cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-stone-700 font-medium">
                      ${(item.food.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.food._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="col-span-3 text-center text-stone-500">
                Your cart is empty
              </p>
            )}
          </ul>

          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-semibold text-stone-700">Total</p>
            <p className="text-lg font-bold text-stone-800">
              ${totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-stone-300 text-stone-800 rounded-lg hover:bg-stone-400"
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
