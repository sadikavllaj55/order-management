import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, updateProduct, getProductTypes, getProductStatuses } from "../../api/products";

export default function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        product_type_id: "",
        price: "",
        description: "",
        stock: "",
        status: 1,
    });

    const [types, setTypes] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(""); // for backend error message

    // Fetch product and types
    useEffect(() => {
        async function fetchData() {
            try {
                const [productRes, typesRes] = await Promise.all([
                    getProduct(id),
                    getProductTypes(),
                ]);

                const p = productRes.data;
                setProduct({
                    name: p.name,
                    product_type_id: p.product_type_id,
                    price: p.price,
                    description: p.description,
                    stock: p.stock,
                    status: p.status,
                });

                setTypes(typesRes.data);
            } catch (err) {
                console.error("Failed to load product", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    // Fetch statuses
    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const res = await getProductStatuses();
                setStatuses(res.data.data); // store as object {0: "Processing", ...}
            } catch (err) {
                console.error("Failed to load product statuses", err);
            }
        };

        fetchStatuses();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "status" ? Number(value) : value,
        }));

        // Clear backend error message on change
        if (errorMessage) setErrorMessage("");
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, product);
            navigate("/products");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                const firstKey = Object.keys(err.response.data.errors)[0];
                setErrorMessage(err.response.data.errors[firstKey][0]);
            } else {
                setErrorMessage("Something went wrong");
            }
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-md mt-10">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

            {errorMessage && (
                <p className="text-red-500 mb-2">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border p-2 w-full"
                />

                <select
                    name="product_type_id"
                    value={product.product_type_id}
                    onChange={handleChange}
                    className="border p-2 w-full text-black "
                >
                    <option value="">Select Type</option>
                    {types.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border p-2 w-full"
                />

                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 w-full"
                />

                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="border p-2 w-full"
                />

                <select
                    name="status"
                    value={product.status}
                    onChange={(e) =>
                        setProduct({ ...product, status: Number(e.target.value) })
                    }
                    className="border p-2 w-full text-black"
                >
                    {Object.entries(statuses).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>

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
