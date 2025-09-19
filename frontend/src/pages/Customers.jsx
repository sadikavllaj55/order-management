// src/pages/Customers.jsx
import { useEffect, useState } from "react";
import axios from "axios";


export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8001/api/customers") // your API URL
            .then((res) => {
                setCustomers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Customers List</h1>
            <table className="min-w-full border">
                <thead>
                <tr>
                    <th className="border px-4 py-2">First Name</th>
                    <th className="border px-4 py-2">Last Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Address</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((c) => (
                    <tr key={c.id}>
                        <td className="border px-4 py-2">{c.first_name}</td>
                        <td className="border px-4 py-2">{c.last_name}</td>
                        <td className="border px-4 py-2">{c.email}</td>
                        <td className="border px-4 py-2">{c.phone}</td>
                        <td className="border px-4 py-2">{c.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
