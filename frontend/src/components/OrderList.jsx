import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/orders");
            setOrders(res.data.data); // assuming API resource returns {data: [...]}
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Orders Dashboard</h2>
            <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Customer</th>
                    <th className="px-4 py-2 border">Products</th>
                    <th className="px-4 py-2 border">Total</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id} className="text-center">
                        <td className="px-4 py-2 border">{order.id}</td>
                        <td className="px-4 py-2 border">{order.customer.name}</td>
                        <td className="px-4 py-2 border">
                            {order.products.map((p) => p.name).join(", ")}
                        </td>
                        <td className="px-4 py-2 border">${order.total}</td>
                        <td className="px-4 py-2 border">{order.status}</td>
                        <td className="px-4 py-2 border">
                            {/* Buttons to update status */}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
