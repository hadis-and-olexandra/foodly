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
//               onClick={() => navigate("/chefs")}
//               className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition"
//             >
//               Back to Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialOrder = {
  id: "ORD-2025-001",
  date: "2025-08-10",
  status: "Pending",
  paymentMethod: "Credit Card",
  deliveryAddress: "123 Main St, Springfield, USA",
  customerNote: "Please deliver between 10am - 12pm.",
  items: [
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
  ],
};

const getStatusBadge = (status) => {
  const base =
    "flex items-center justify-center w-24 px-3 py-1 rounded-md text-xs font-medium";
  switch (status) {
    case "Pending":
      return `${base} bg-yellow-100 text-yellow-800`;
    case "Shipped":
      return `${base} bg-blue-100 text-blue-800`;
    case "Delivered":
      return `${base} bg-green-100 text-green-800`;
    case "Cancelled":
      return `${base} bg-red-100 text-red-800`;
    default:
      return `${base} bg-gray-100 text-gray-800`;
  }
};

export default function OrderDetailsCustomer() {
  const navigate = useNavigate();
  const [order] = useState(initialOrder);

  const totalAmount = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-6 mt-6">
      {/* Title */}
      <h2 className="font-sans text-xl font-bold text-stone-700 mb-6">
        Order Details: <span className="text-primary">{order.id}</span>
      </h2>

      {/* Two columns layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Order Info */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-stone-200">
          <div className="mb-4">
            <p className="text-sm text-stone-500">Order Date</p>
            <p className="text-stone-700 font-medium">{order.date}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-stone-500">Status</p>
            <span className={getStatusBadge(order.status)}>{order.status}</span>
          </div>
          <div className="mb-4">
            <p className="text-sm text-stone-500">Payment Method</p>
            <p className="text-stone-700 font-medium">{order.paymentMethod}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-stone-500">Delivery Address</p>
            <p className="text-stone-700 font-medium">
              {order.deliveryAddress}
            </p>
          </div>
          <div>
            <p className="text-sm text-stone-500">Customer Note</p>
            <p className="text-stone-700 italic">{order.customerNote}</p>
          </div>
        </div>

        {/* Right column - Order Items */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 border border-stone-200">
          <h3 className="text-lg font-semibold text-stone-700 mb-4">
            My Order
          </h3>
          <ul className="divide-y divide-stone-200">
            {order.items.map((item) => (
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
                    <p className="text-sm text-stone-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="text-stone-700 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          {/* Total + Back Button */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-semibold text-stone-700">
              Total: ${totalAmount.toFixed(2)}
            </p>
            <button
              onClick={() => navigate("/chefs")}
              className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition"
            >
              Back to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
