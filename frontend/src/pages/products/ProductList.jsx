import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/products";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = () => {
        setLoading(true);
        getProducts()
            .then((res) => setProducts(res.data))
            .finally(() => setLoading(false));
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id).then(() => fetchProducts());
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                onClick={() => (window.location.href = "/products/create")}
            >
                Add Product
            </button>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p) => (
                    <tr key={p.id}>
                        <td className="border px-4 py-2">{p.id}</td>
                        <td className="border px-4 py-2">{p.name}</td>
                        <td className="border px-4 py-2">${p.price}</td>
                        <td className="border px-4 py-2 space-x-2">
                            <button
                                onClick={() => (window.location.href = `/products/view/${p.id}`)}
                                className="bg-gray-500 text-white px-2 py-1 rounded"
                            >
                                View
                            </button>
                            <button
                                onClick={() => (window.location.href = `/products/edit/${p.id}`)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
