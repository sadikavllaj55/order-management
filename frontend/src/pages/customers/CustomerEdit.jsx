import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomer, updateCustomer } from "../../api/customers";

export default function CustomerEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getCustomer(id);
                const c = res.data;
                setCustomer({
                    first_name: c.first_name || "",
                    last_name: c.last_name || "",
                    email: c.email || "",
                    phone: c.phone || "",
                    address: c.address || "",
                });
            } catch (err) {
                console.error("Failed to load customer", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCustomer(id, customer);
            navigate("/customers");
        } catch (err) {
            console.error("Failed to update customer", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="first_name"
                    value={customer.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border p-2 w-full"
                />

                <input
                    type="text"
                    name="last_name"
                    value={customer.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border p-2 w-full"
                />

                <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 w-full"
                />

                <input
                    type="text"
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border p-2 w-full"
                />

                <textarea
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="border p-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
