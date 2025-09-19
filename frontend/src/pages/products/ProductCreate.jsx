import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getProductTypes, getProductStatuses } from "../../api/products";

export default function ProductCreate() {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        product_type_id: "",
        price: "",
        description: "",
        stock: "",
        status: 0, // default to 0 (Processing)
    });

    const [types, setTypes] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [typesRes, statusesRes] = await Promise.all([
                    getProductTypes(),
                    getProductStatuses(),
                ]);

                setTypes(typesRes.data);
                setStatuses(statusesRes.data);
            } catch (err) {
                console.error("Failed to load types or statuses", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "status" || name === "product_type_id" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(product);
            navigate("/products");
        } catch (err) {
            console.error("Failed to create product", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>

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
                    className="border p-2 w-full"
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
                    onChange={handleChange}
                    className="border p-2 w-full"
                >
                    {Object.entries(statuses).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
