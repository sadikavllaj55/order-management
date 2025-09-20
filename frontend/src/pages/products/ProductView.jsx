import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, getProductTypes, getProductStatuses } from "../../api/products";

export default function ProductView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [types, setTypes] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [productRes, typesRes, statusesRes] = await Promise.all([
                    getProduct(id),
                    getProductTypes(),
                    getProductStatuses(),
                ]);

                setProduct(productRes.data);
                setTypes(typesRes.data);
                setStatuses(statusesRes.data.data); // {0: "Processing", 1: "Active", ...}
            } catch (err) {
                console.error("Failed to load product data", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!product) return <p className="text-center mt-10">Product not found.</p>;

    const productType = types.find((t) => t.id === product.product_type_id)?.name || "N/A";
    const productStatus = statuses[product.status] || "N/A";

    return (
        <div className="max-w-md mx-auto mt-10 border p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

            <div className="space-y-2">
                <p><span className="font-semibold">SKU:</span> {product.sku || "N/A"}</p>
                <p><span className="font-semibold">Stock:</span> {product.stock}</p>
                <p><span className="font-semibold">Price:</span> ${product.price}</p>
                <p><span className="font-semibold">Type:</span> {productType}</p>
                <p><span className="font-semibold">Status:</span> {productStatus}</p>
                <p><span className="font-semibold">Description:</span> {product.description || "N/A"}</p>
            </div>

            <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => navigate("/products")}
            >
                Back to Products
            </button>
        </div>
    );
}
