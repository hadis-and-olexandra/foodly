// a chef's page with his dishes

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const users = [
//   {
//     id: 1,
//     name: "Premium Phone Case",
//     description:
//       "Durable phone case with military-grade protection and sleek design",
//     price: "$39.99",
//     rating: 4.8,
//     img: "https://images.unsplash.com/photo-1697120164518-8eccb8d19e1d?auto=format&fit=crop&w=400&h=300&q=75",
//   },
//   {
//     id: 2,
//     name: "Another Product",
//     description: "Fast wireless charger compatible with all devices",
//     price: "$29.99",
//     rating: 4.5,
//     img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=300&q=75",
//   },
//   {
//     id: 3,
//     name: "Stylish Headphones",
//     description: "Comfortable and high-quality sound headphones",
//     price: "$59.99",
//     rating: 4.7,
//     img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&h=300&q=75",
//   },
//   {
//     id: 4,
//     name: "Smart Watch",
//     description: "Feature-rich smart watch with long battery life",
//     price: "$199.99",
//     rating: 4.6,
//     img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&h=300&q=75",
//   },
//   {
//     id: 5,
//     name: "Wireless Charger",
//     description: "Fast wireless charger compatible with all devices",
//     price: "$24.99",
//     rating: 4.4,
//     img: "https://images.unsplash.com/photo-1697120164518-8eccb8d19e1d?auto=format&fit=crop&w=400&h=300&q=75",
//   },
//   {
//     id: 6,
//     name: "Portable Speaker",
//     description: "Fast wireless charger compatible with all devices",
//     price: "$49.99",
//     rating: 4.5,
//     img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&h=300&q=75",
//   },
// ];

// export default function ChefDetails() {
//   const navigate = useNavigate();

//   const handleClick = (id) => {
//     navigate(`/dishes/${id}`);
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-6 mt-6">
//       <h2 className="font-sans antialiased text-lg font-bold uppercase text-stone-600 flex justify-center items-center gap-x-2 p-2 hover:text-primary mb-6">
//         Menu by "Name Organization"
//       </h2>
//       <ul className="grid grid-cols-3 gap-6 mb-6">
//         {users.slice(0, 6).map((user) => (
//           <li
//             key={user.id}
//             onClick={() => handleClick(user.id)}
//             // className="cursor-pointer transition-shadow duration-300 hover:shadow-lg rounded-lg"
//           >
//             <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs border border-stone-100 hover:shadow-lg transition-shadow duration-300 p-4">
//               <div className="h-48 p-2">
//                 <img
//                   src={user.img}
//                   alt={user.name}
//                   className="w-full h-full object-cover rounded-md"
//                 />
//               </div>
//               <div className="p-4">
//                 <div className="flex items-center justify-between mb-1">
//                   <h3 className="text-lg font-bold text-stone-800">
//                     {user.name}
//                   </h3>
//                   <div className="flex items-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       className="w-4 h-4 text-amber-400"
//                     >
//                       <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//                     </svg>
//                     <span className="text-sm text-stone-600 ml-1">
//                       {user.rating}
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-stone-600 text-sm mb-4">
//                   {user.description}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <span className="font-bold text-lg text-stone-600 ml-1">
//                     {user.price}
//                   </span>
//                   <button
//                     className="
//     cursor-pointer
//     px-4 py-2 inline-flex items-center justify-center border align-middle select-none
//     font-sans font-medium text-center text-sm text-stone-50 rounded-lg
//     bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900
//     shadow-sm hover:shadow-md
//     hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900
//     disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed
//     focus:outline-none focus:shadow-none
//     transition-shadow transition-colors duration-300 ease-in
//     antialiased
//   "
//                     type="button"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-4 h-4 mr-2"
//                     >
//                       <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
//                     </svg>
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function ChefDetails() {
//   const { chefId } = useParams();
//   const navigate = useNavigate();

//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   useEffect(() => {
//     // Fetch foods created by this chef
//     async function fetchFoods() {
//       try {
//         const foodsRes = await api.get(`/foods/${chefId}`);
//         setFoods(foodsRes.data);
//       } catch (err) {
//         console.error("❌ Failed to load foods", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchFoods();

//     // Get logged-in user info from localStorage
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, [chefId]);

//   const handleClick = (id) => {
//     navigate(`/dishes/${id}`);
//   };

//   // Add to cart logic
//   const handleAddToCart = async (foodId) => {
//     if (!user) return setShowLoginModal(true);
//     if (user.role !== "customer")
//       return alert("🚫 Only customers can add to cart");

//     try {
//       const res = await api.post("/cart/add", { foodId });
//       const count = res.data.items.reduce(
//         (acc, item) => acc + item.quantity,
//         0
//       );
//       localStorage.setItem("cartCount", count);
//       window.dispatchEvent(new Event("storage"));
//     } catch (err) {
//       console.error("Failed to add to cart", err);
//     }
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-6 mt-6">
//       <h2 className="font-sans antialiased text-lg font-bold uppercase text-stone-600 flex justify-center items-center gap-x-2 p-2 hover:text-primary mb-6">
//         Menu by {foods[0]?.createdBy?.name || "Chef"}
//       </h2>

//       <ul className="grid grid-cols-3 gap-6 mb-6">
//         {foods.length > 0 ? (
//           foods.map((food) => (
//             <li key={food._id}>
//               <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs border border-stone-100 hover:shadow-lg transition-shadow duration-300 p-4">
//                 <div
//                   className="h-48 p-2 cursor-pointer"
//                   onClick={() => handleClick(food._id)}
//                 >
//                   <img
//                     src={food.image}
//                     alt={food.name}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <div className="flex items-center justify-between mb-1">
//                     <h3 className="text-lg font-bold text-stone-800">
//                       {food.name}
//                     </h3>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                         className="w-4 h-4 text-amber-400"
//                       >
//                         <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//                       </svg>
//                       <span className="text-sm text-stone-600 ml-1">
//                         {food.rating ?? "—"}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-stone-600 text-sm mb-4">
//                     {food.description}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <span className="font-bold text-lg text-stone-600 ml-1">
//                       ${food.price}
//                     </span>
//                     <button
//                       onClick={() => handleAddToCart(food._id)}
//                       className="cursor-pointer px-4 py-2 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-sm text-stone-50 rounded-lg bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 shadow-sm hover:shadow-md hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:outline-none focus:shadow-none transition-shadow transition-colors duration-300 ease-in antialiased"
//                       type="button"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                         className="w-4 h-4 mr-2"
//                       >
//                         <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
//                       </svg>
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="col-span-3 text-center text-stone-500">
//             This chef has no dishes yet.
//           </p>
//         )}
//       </ul>

//       {/* Login modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
//             <h3 className="text-lg font-semibold mb-4">
//               Please log in as a customer to add items to your cart
//             </h3>
//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition"
//             >
//               Go to Login
//             </button>
//             <button
//               onClick={() => setShowLoginModal(false)}
//               className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function ChefDetails() {
//   const { chefId } = useParams();
//   const navigate = useNavigate();

//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   useEffect(() => {
//     async function fetchFoods() {
//       try {
//         const res = await api.get(`/foods/${chefId}`);
//         setFoods(res.data);
//       } catch (err) {
//         console.error("❌ Failed to load foods", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchFoods();

//     // Get logged-in user info from localStorage
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) setUser(JSON.parse(savedUser));
//   }, [chefId]);

//   const handleClick = (id) => {
//     navigate(`/dishes/${id}`);
//   };

//   // Add to cart logic
//   const handleAddToCart = async (foodId, quantity = 1) => {
//     if (!user) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (user.role !== "customer") {
//       alert("🚫 Only customers can add to cart");
//       return;
//     }

//     try {
//       const res = await api.post("/cart/add", { foodId, quantity });
//       const items = res.data.items || [];

//       // Update localStorage
//       localStorage.setItem("cart", JSON.stringify(items));
//       const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
//       localStorage.setItem("cartCount", totalCount);

//       // Dispatch custom event to notify Navbar
//       window.dispatchEvent(new Event("cartUpdated"));
//     } catch (err) {
//       console.error("❌ Failed to add to cart", err);
//     }
//   };

//   if (loading) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return (
//     <div className="w-full max-w-6xl mx-auto px-6 mt-6">
//       <h2 className="font-sans antialiased text-lg font-bold uppercase text-stone-600 flex justify-center items-center gap-x-2 p-2 hover:text-primary mb-6">
//         Menu by {foods[0]?.createdBy?.name || "Chef"}
//       </h2>

//       <ul className="grid grid-cols-3 gap-6 mb-6">
//         {foods.length > 0 ? (
//           foods.map((food) => (
//             <li key={food._id}>
//               <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs border border-stone-100 hover:shadow-lg transition-shadow duration-300 p-4">
//                 <div
//                   className="h-48 p-2 cursor-pointer"
//                   onClick={() => handleClick(food._id)}
//                 >
//                   <img
//                     src={food.image || null}
//                     alt={food.name}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <div className="flex items-center justify-between mb-1">
//                     <h3 className="text-lg font-bold text-stone-800">
//                       {food.name}
//                     </h3>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                         className="w-4 h-4 text-amber-400"
//                       >
//                         <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//                       </svg>
//                       <span className="text-sm text-stone-600 ml-1">
//                         {food.rating ?? "—"}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-stone-600 text-sm mb-4">
//                     {food.description}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <span className="font-bold text-lg text-stone-600 ml-1">
//                       ${food.price}
//                     </span>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleAddToCart(food._id);
//                       }}
//                       className="cursor-pointer px-4 py-2 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-sm text-stone-50 rounded-lg bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 shadow-sm hover:shadow-md hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:outline-none focus:shadow-none transition-shadow transition-colors duration-300 ease-in antialiased"
//                       type="button"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                         className="w-4 h-4 mr-2"
//                       >
//                         <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
//                       </svg>
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="col-span-3 text-center text-stone-500">
//             This chef has no dishes yet.
//           </p>
//         )}
//       </ul>

//       {/* Login modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
//             <h3 className="text-lg font-semibold mb-4">
//               Please log in as a customer to add items to your cart
//             </h3>
//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition"
//             >
//               Go to Login
//             </button>
//             <button
//               onClick={() => setShowLoginModal(false)}
//               className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import placeholderFood from "../assets/img.jpg";

export default function ChefDetails() {
  const { chefId } = useParams();
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await api.get(`/foods/${chefId}`);
        setFoods(res.data);
      } catch (err) {
        console.error("❌ Failed to load foods", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFoods();

    // Get logged-in user info from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [chefId]);

  const handleClick = (id) => {
    navigate(`/dishes/${id}`);
  };

  const handleAddToCart = async (foodId, quantity = 1) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (user.role !== "customer") {
      alert("🚫 Only customers can add to cart");
      return;
    }

    try {
      const res = await api.post("/cart/add", { foodId, quantity });
      const items = res.data.items || [];

      localStorage.setItem("cart", JSON.stringify(items));
      const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem("cartCount", totalCount);

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("❌ Failed to add to cart", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 mt-6">
      {/* <h2 className="font-sans antialiased text-lg font-bold uppercase text-stone-600 flex justify-center items-center gap-x-2 p-2 hover:text-primary mb-6">
        Menu by {foods[0]?.createdBy?.name || "Chef"}
      </h2> */}

      <h2 className="font-sans antialiased text-lg font-bold uppercase text-stone-600 flex justify-center items-center gap-x-2 p-2 hover:text-primary mb-6">
        Menu by{" "}
        <span className="ml-1" style={{ color: "#c8ad55" }}>
          {foods[0]?.createdBy?.name || "Chef"}
        </span>
      </h2>

      <ul className="grid grid-cols-3 gap-6 mb-6">
        {foods.length > 0 ? (
          foods.map((food) => (
            <li key={food._id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs border border-stone-100 hover:shadow-lg transition-shadow duration-300 p-4">
                <div
                  className="h-48 p-2 cursor-pointer"
                  onClick={() => handleClick(food._id)}
                >
                  <img
                    // src={food.image || null}
                    src={food.image?.trim() || placeholderFood}
                    alt={food.name}
                    className="w-full h-full object-cover object-top rounded-md"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-stone-800">
                      {food.name}
                    </h3>
                    {/* <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-amber-400"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="text-sm text-stone-600 ml-1">
                        {food.rating ?? "—"}
                      </span>
                    </div> */}
                  </div>

                  <p className="text-stone-600 text-sm mb-2">
                    {food.description}
                  </p>

                  {/* Learn More button */}
                  <div className="flex justify-start mb-4">
                    <button
                      onClick={() => handleClick(food._id)}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors"
                    >
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3 h-3 ml-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-stone-600 ml-1">
                      ${food.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(food._id);
                      }}
                      className="cursor-pointer px-4 py-2 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center text-sm text-stone-50 rounded-lg bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 shadow-sm hover:shadow-md hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:outline-none focus:shadow-none transition-shadow transition-colors duration-300 ease-in antialiased"
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
          ))
        ) : (
          <p className="col-span-3 text-center text-stone-500">
            This chef has no dishes yet.
          </p>
        )}
      </ul>

      {/* Login modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Please log in as a customer to add items to your cart
            </h3>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition"
            >
              Go to Login
            </button>
            <button
              onClick={() => setShowLoginModal(false)}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
