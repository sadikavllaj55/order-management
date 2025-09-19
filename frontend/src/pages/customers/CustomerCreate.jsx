import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../../api/customers";

export default function CustomerCreate() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        status: 1,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({
            ...prev,
            [name]: name === "status" ? Number(value) : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined })); // clear field error
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCustomer(customer);
            navigate("/customers");
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors); // show validation errors
            } else {
                console.error("Unexpected error", err);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Customer</h1>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border p-2 w-full"
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name[0]}</p>}

                <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 w-full"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email[0]}</p>}

                <input
                    type="text"
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border p-2 w-full"
                />
                {errors.phone && <p className="text-red-600 text-sm">{errors.phone[0]}</p>}

                <textarea
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="border p-2 w-full"
                />
                {errors.address && <p className="text-red-600 text-sm">{errors.address[0]}</p>}

                <select
                    name="status"
                    value={customer.status}
                    onChange={handleChange}
                    className="border p-2 w-full"
                >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                </select>
                {errors.status && <p className="text-red-600 text-sm">{errors.status[0]}</p>}

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save Customer
                </button>
            </form>
        </div>
    );
}
