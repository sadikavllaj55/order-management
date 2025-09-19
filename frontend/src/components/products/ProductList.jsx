import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productService";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const handleDelete = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Products</h1>
                <Link to="add" className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Add
                </Link>
            </div>

            <table className="w-full border">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p) => (
                    <tr key={p.id}>
                        <td className="border p-2">{p.id}</td>
                        <td className="border p-2">{p.name}</td>
                        <td className="border p-2">{p.price}</td>
                        <td className="border p-2">
                            <Link
                                to={`${p.id}/edit`}
                                className="px-2 text-blue-600 hover:underline"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(p.id)}
                                className="px-2 text-red-600 hover:underline"
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
