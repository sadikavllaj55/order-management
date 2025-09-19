import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../../api/customers";
import { useNavigate } from "react-router-dom";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const res = await getCustomers();
            setCustomers(res.data || []); // use res.data directly
        } catch (err) {
            console.error("Failed to fetch customers", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure?")) {
            try {
                await deleteCustomer(id);
                fetchCustomers();
            } catch (err) {
                console.error("Failed to delete customer", err);
            }
        }
    };

    if (loading) return <p className="text-center mt-10">Loading customers...</p>;

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <button
                className="bg-green-600 text-white px-4 py-2 rounded mb-3"
                onClick={() => navigate("/customers/create")}
            >
                Add Customer
            </button>

            {customers.length === 0 ? (
                <p>No customers found.</p>
            ) : (
                <table className="w-full border">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Phone</th>
                        <th className="p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((c) => (
                        <tr key={c.id} className="border-t">
                            <td className="p-2">{c.first_name} {c.first_name}</td>
                            <td className="p-2">{c.email}</td>
                            <td className="p-2">{c.phone}</td>
                            <td className="p-2 space-x-2">
                                <button
                                    className="bg-blue-600 text-white px-2 py-1 rounded"
                                    onClick={() => navigate(`/customers/edit/${c.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(c.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
