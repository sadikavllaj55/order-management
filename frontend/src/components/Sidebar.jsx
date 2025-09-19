import React from "react";

export default function Sidebar({ setView }) {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>
            <ul className="space-y-4">
                <li>
                    <button
                        className="w-full text-left hover:text-blue-400"
                        onClick={() => setView("orders")}
                    >
                        Orders
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left hover:text-blue-400"
                        onClick={() => setView("customers")}
                    >
                        Customers
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left hover:text-blue-400"
                        onClick={() => setView("products")}
                    >
                        Products
                    </button>
                </li>
            </ul>
        </div>
    );
}
