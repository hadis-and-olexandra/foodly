import { useState } from "react";

export default function OrdersChef() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const seller = {
    name: "Tech Gadgets Store",
    location: "San Francisco, USA",
    email: "contact@techgadgets.com",
    phone: "+1 555 123 456",
    logo: "https://raw.githubusercontent.com/creativetimofficial/public-assets/refs/heads/master/material-tailwind/team-3.jpg",
  };

  const orders = [
    {
      id: "ORD-1001",
      date: "2025-08-01",
      status: "Pending",
      total: "$249.99",
      items: 3,
      details: {
        products: [
          { name: "Wireless Earbuds", qty: 1, price: "$99.99" },
          { name: "Smart Watch", qty: 1, price: "$129.99" },
          { name: "USB-C Cable", qty: 1, price: "$19.99" },
        ],
        shippingAddress: "123 Main St, San Francisco, CA",
        paymentMethod: "Credit Card",
        deliveryStatus: "Processing",
        customerNote: "Please gift wrap the watch.",
      },
    },
    {
      id: "ORD-1002",
      date: "2025-08-05",
      status: "Shipped",
      total: "$79.99",
      items: 2,
      details: {
        products: [{ name: "Phone Case", qty: 2, price: "$39.99" }],
        shippingAddress: "45 Market St, Los Angeles, CA",
        paymentMethod: "PayPal",
        deliveryStatus: "On the way",
        customerNote: "",
      },
    },
    {
      id: "ORD-1003",
      date: "2025-08-07",
      status: "Delivered",
      total: "$149.99",
      items: 1,
      details: {
        products: [{ name: "Tablet", qty: 1, price: "$149.99" }],
        shippingAddress: "78 Pine St, New York, NY",
        paymentMethod: "Credit Card",
        deliveryStatus: "Delivered",
        customerNote: "",
      },
    },
    {
      id: "ORD-1004",
      date: "2025-08-09",
      status: "Cancelled",
      total: "$59.99",
      items: 1,
      details: {
        products: [{ name: "Bluetooth Speaker", qty: 1, price: "$59.99" }],
        shippingAddress: "56 Oak Ave, Miami, FL",
        paymentMethod: "PayPal",
        deliveryStatus: "Cancelled",
        customerNote: "Order cancelled by customer.",
      },
    },
  ];

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

  return (
    <div className="w-full max-w-6xl mx-auto px-6 mt-6">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-stone-800 mb-4">
        Orders from {seller.name}
      </h1>

      {/* Seller Info */}
      <div className="bg-white shadow-sm rounded-lg p-4 flex items-center gap-4 mb-6 border border-stone-100">
        <img
          src={seller.logo}
          alt={seller.name}
          className="w-20 h-20 object-cover rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{seller.name}</h2>
          <p className="text-sm text-stone-500">{seller.location}</p>
          <p className="text-sm text-stone-500">{seller.email}</p>
          <p className="text-sm text-stone-500">{seller.phone}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-stone-100 p-4 rounded-lg mb-6">
        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <input
          type="text"
          placeholder="Search by Order ID or Customer"
          className="border rounded-md px-3 py-2 text-sm flex-1"
        />
        <input type="date" className="border rounded-md px-3 py-2 text-sm" />
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-stone-100">
        <table className="w-full text-sm text-left text-stone-600">
          <thead className="bg-stone-100 text-stone-700">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-stone-50">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">
                  <span className={getStatusBadge(order.status)}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">{order.total}</td>
                <td className="px-4 py-2">{order.items}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">
              Order Details - {selectedOrder.id}
            </h2>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Products</h3>
              <ul className="space-y-1">
                {selectedOrder.details.products.map((p, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>
                      {p.name} x {p.qty}
                    </span>
                    <span>{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p>
              <strong>Shipping Address:</strong>{" "}
              {selectedOrder.details.shippingAddress}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {selectedOrder.details.paymentMethod}
            </p>
            <p>
              <strong>Delivery Status:</strong>{" "}
              {selectedOrder.details.deliveryStatus}
            </p>
            {selectedOrder.details.customerNote && (
              <p>
                <strong>Customer Note:</strong>{" "}
                {selectedOrder.details.customerNote}
              </p>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-stone-200 rounded-md hover:bg-stone-300"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
