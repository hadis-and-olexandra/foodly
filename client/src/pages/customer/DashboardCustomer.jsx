// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const initialOrder = {
//   id: "ORD-2025-001",
//   date: "2025-08-10",
//   status: "Pending",
//   paymentMethod: "Credit Card",
//   deliveryAddress: "123 Main St, Springfield, USA",
//   customerNote: "Please deliver between 10am - 12pm.",
//   items: [
//     {
//       id: 1,
//       name: "Premium Phone Case",
//       price: 39.99,
//       quantity: 1,
//       img: "https://images.unsplash.com/photo-1697120164518-8eccb8d19e1d?auto=format&fit=crop&w=400&h=300&q=75",
//     },
//     {
//       id: 2,
//       name: "Wireless Charger",
//       price: 29.99,
//       quantity: 2,
//       img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&h=300&q=75",
//     },
//   ],
// };

// const getStatusBadge = (status) => {
//   const base =
//     "flex items-center justify-center w-24 px-3 py-1 rounded-md text-xs font-medium";
//   switch (status) {
//     case "Pending":
//       return `${base} bg-yellow-100 text-yellow-800`;
//     case "Shipped":
//       return `${base} bg-blue-100 text-blue-800`;
//     case "Delivered":
//       return `${base} bg-green-100 text-green-800`;
//     case "Cancelled":
//       return `${base} bg-red-100 text-red-800`;
//     default:
//       return `${base} bg-gray-100 text-gray-800`;
//   }
// };

// export default function OrderDetailsCustomer() {
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(initialOrder);

//   const handleQuantityChange = (id, delta) => {
//     setOrder((prev) => ({
//       ...prev,
//       items: prev.items.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       ),
//     }));
//   };

//   const handleDeleteItem = (id) => {
//     setOrder((prev) => ({
//       ...prev,
//       items: prev.items.filter((item) => item.id !== id),
//     }));
//   };

//   const totalAmount = order.items.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="w-full max-w-6xl mx-auto px-6 mt-6">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate("/chefs")}
//         className="mb-4 inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-4 h-4"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M15 19l-7-7 7-7"
//           />
//         </svg>
//         Back to Order
//       </button>

//       {/* Title */}
//       <h2 className="font-sans text-xl font-bold text-stone-700 mb-6">
//         Order Details: <span className="text-primary">{order.id}</span>
//       </h2>

//       {/* Two columns layout */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left column - Order Info */}
//         <div className="bg-white rounded-lg shadow-md p-6 border border-stone-200">
//           <div className="mb-4">
//             <p className="text-sm text-stone-500">Order Date</p>
//             <p className="text-stone-700 font-medium">{order.date}</p>
//           </div>
//           <div className="mb-4">
//             <p className="text-sm text-stone-500">Status</p>
//             <span className={getStatusBadge(order.status)}>{order.status}</span>
//           </div>
//           <div className="mb-4">
//             <p className="text-sm text-stone-500">Payment Method</p>
//             <p className="text-stone-700 font-medium">{order.paymentMethod}</p>
//           </div>
//           <div className="mb-4">
//             <p className="text-sm text-stone-500">Delivery Address</p>
//             <p className="text-stone-700 font-medium">
//               {order.deliveryAddress}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm text-stone-500">Customer Note</p>
//             <p className="text-stone-700 italic">{order.customerNote}</p>
//           </div>
//         </div>

//         {/* Right column - Order Items */}
//         <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 border border-stone-200">
//           <h3 className="text-lg font-semibold text-stone-700 mb-4">
//             My Order
//           </h3>
//           <ul className="divide-y divide-stone-200">
//             {order.items.map((item) => (
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
//                     {/* Quantity Counter */}
//                     <div className="flex items-center gap-2 mt-1">
//                       <button
//                         className="px-2 py-1 bg-stone-200 rounded hover:bg-stone-300"
//                         onClick={() => handleQuantityChange(item.id, -1)}
//                       >
//                         -
//                       </button>
//                       <span className="px-3">{item.quantity}</span>
//                       <button
//                         className="px-2 py-1 bg-stone-200 rounded hover:bg-stone-300"
//                         onClick={() => handleQuantityChange(item.id, 1)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Price + Delete (SVG) */}
//                 <div className="flex items-center gap-4">
//                   <p className="text-stone-700 font-medium">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                   <button
//                     className="text-red-500 hover:text-red-700"
//                     onClick={() => handleDeleteItem(item.id)}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
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

//           {/* Total + Checkout Button */}
//           <div className="flex justify-between items-center mt-6">
//             <p className="text-lg font-semibold text-stone-700">
//               Total: ${totalAmount.toFixed(2)}
//             </p>
//             <button
//               onClick={() => navigate("/checkout")}
//               className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition"
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Profile from "./Profile";
import SettingsCustomer from "./SettingsCustomer";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: (
        <svg
          width="1.5em"
          height="1.5em"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
          className="h-4 w-4"
        >
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      content: <Profile />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg
          width="1.5em"
          height="1.5em"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
          className="h-4 w-4"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ),
      content: <SettingsCustomer />,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className="relative tab-group">
        <div
          className="flex bg-stone-100 p-0.5 relative rounded-lg"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 text-sm py-2 px-4 transition-all duration-300 rounded-md mr-1 ${
                activeTab === tab.id
                  ? "text-stone-800 font-medium bg-white shadow-sm"
                  : "text-stone-800 hover:bg-white/50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 tab-content-container">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <div
                  key={tab.id}
                  className="tab-content text-stone-500 text-sm"
                >
                  <p>{tab.content}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
