import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all orders from API
        axios
            .get("http://127.0.0.1:8001/api/orders")
            .then((res) => {
                setOrders(res.data.data ?? []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch orders.");
                setLoading(false);
            });
    }, []);


    if (loading) return <p>Loading orders...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (orders.length === 0) return <p>No orders found.</p>;

    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <div key={order.id} className="border rounded-xl p-4 shadow">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold">Order #{order.id}</h2>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {order.status}
            </span>
                    </div>

                    <p>
                        <strong>Customer:</strong>{" "}
                        {order.customer
                            ? `${order.customer.first_name} ${order.customer.last_name}`
                            : "Unknown"}
                    </p>
                    <p>
                        <strong>Total:</strong> ${order.total}
                    </p>
                    <p>
                        <strong>Notes:</strong> {order.notes ?? "None"}
                    </p>
                    <p>
                        <strong>Created:</strong> {order.created_at}
                    </p>

                    <table className="w-full mt-4 text-sm border">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Product</th>
                            <th className="p-2 text-right">Quantity</th>
                            <th className="p-2 text-right">Unit Price</th>
                            <th className="p-2 text-right">Line Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.items && order.items.length > 0 ? (
                            order.items.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-2">{item.product?.name}</td>
                                    <td className="p-2 text-right">{item.quantity}</td>
                                    <td className="p-2 text-right">${item.unit_price}</td>
                                    <td className="p-2 text-right">${item.line_total}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-2 text-center text-gray-500">
                                    No items for this order.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );

}
