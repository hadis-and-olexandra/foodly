import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/customerService";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getProfile();
        console.log(profile);
        setUser(profile);
      } catch (err) {
        console.error("Failed to load profile", err);

        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <p className="text-center mt-6 text-stone-500">Loading profile...</p>
    );
  }

  if (!user) {
    return <p className="text-center mt-6 text-red-500">Profile not found</p>;
  }

  return (
    <div className="max-w-xs w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 mx-auto mt-6">
      {/* Header */}
      <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
        <span className="font-sans antialiased font-bold text-2xl text-stone-50">
          My Profile
        </span>
      </div>

      {/* Profile fields */}
      <div className="px-3.5 py-2.5 space-y-4">
        <ProfileField label="Name" value={user.name} />
        <ProfileField label="Email" value={user.email} />
        <ProfileField label="Phone" value={user.phone || "-"} />
        <ProfileField label="Address" value={user.address || "-"} />
      </div>

      {/* Button */}
      {/* <div className="px-3.5 py-4 flex justify-center">
        <button
          onClick={() => navigate("/edit-profile")}
          className="
            inline-flex items-center justify-center cursor-pointer
            border align-middle select-none font-sans font-medium text-center
            text-sm py-2 px-4
            text-stone-50 bg-stone-800
            rounded-lg border-stone-900
            shadow-sm transition-colors duration-200
            hover:bg-stone-700
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none
          "
        >
          Edit Profile
        </button>
      </div> */}
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <p className="font-sans antialiased text-sm text-black font-semibold">
        {label}
      </p>
      <p className="text-stone-700 text-sm">{value}</p>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UserProfile() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   if (!user) {
//     return (
//       <p className="text-center mt-6 text-stone-500">Loading profile...</p>
//     );
//   }

//   return (
//     <div className="max-w-xs w-full rounded-lg border shadow-sm overflow-hidden bg-white border-stone-200 shadow-stone-950/5 mx-auto mt-6">
//       {/* Header */}
//       <div className="border overflow-hidden bg-stone-800 border-stone-950 shadow-stone-950/25 w-[calc(100%-16px)] rounded m-2 grid h-24 place-items-center shadow-none">
//         <span className="font-sans antialiased font-bold text-2xl text-stone-50">
//           My Profile
//         </span>
//       </div>

//       {/* Profile fields */}
//       <div className="px-3.5 py-2.5 space-y-4">
//         <ProfileField label="Name" value={user.name} />
//         <ProfileField label="Email" value={user.email} />
//         <ProfileField label="Phone" value={user.phone || "-"} />
//         <ProfileField label="Address" value={user.address || "-"} />
//         <ProfileField label="Password" value="********" />
//       </div>

//       {/* Button */}
//       <div className="px-3.5 py-4 flex justify-center">
//         <button
//           onClick={() => navigate("/edit-profile")}
//           className="
//   inline-flex items-center justify-center cursor-pointer
//   border align-middle select-none font-sans font-medium text-center
//   text-sm py-2 px-4
//   text-stone-50 bg-stone-800
//   rounded-lg border-stone-900
//   shadow-sm transition-colors duration-200
//   hover:bg-stone-700
//   disabled:opacity-50 disabled:cursor-not-allowed
//   focus:outline-none
// "
//           // className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased"
//         >
//           Edit Profile
//         </button>
//       </div>
//     </div>
//   );
// }

// function ProfileField({ label, value }) {
//   return (
//     <div>
//       <p className="font-sans antialiased text-sm text-black font-semibold">
//         {label}
//       </p>
//       <p className="text-stone-700 text-sm">{value}</p>
//     </div>
//   );
// }

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
//   const [order] = useState(initialOrder);

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
//                     <p className="text-sm text-stone-500">
//                       Quantity: {item.quantity}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <p className="text-stone-700 font-medium">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </p>
//               </li>
//             ))}
//           </ul>

//           {/* Total + Back Button */}
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
