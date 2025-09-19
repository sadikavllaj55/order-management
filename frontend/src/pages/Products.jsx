import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products with their product types
        axios
            .get("http://127.0.0.1:8001/api/products")
            .then((res) => {
                setProducts(res.data);

                // Extract unique product types from products
                const uniqueTypes = [
                    ...new Map(
                        res.data
                            .filter((p) => p.productType)
                            .map((p) => [p.productType.id, p.productType])
                    ).values(),
                ];
                setTypes(uniqueTypes);

                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products Dashboard</h1>

            {/* Product Types */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Product Types</h2>
                <ul className="list-disc pl-5">
                    {types.map((type) => (
                        <li key={type.id}>
                            <strong>{type.name}</strong> - {type.description || "No description"}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Products Table */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Products</h2>
                <table className="min-w-full border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Stock</th>
                        <th className="border px-4 py-2">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border px-4 py-2">{product.id}</td>
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">
                                {product.productType ? product.productType.name : "No Type"}
                            </td>
                            <td className="border px-4 py-2">${product.price}</td>
                            <td className="border px-4 py-2">{product.stock}</td>
                            <td className="border px-4 py-2">
                                {product.status === 1 ? "Active" : "Inactive"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
