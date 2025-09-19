import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../api/products";

export default function ProductEdit() {
    const { id } = useParams(); // get product id from URL
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch product data
    useEffect(() => {
        getProduct(id)
            .then((res) => {
                setName(res.data.name);
                setPrice(res.data.price);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price) {
            alert("Please fill all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        if (imageFile) formData.append("image", imageFile);

        setLoading(true);
        try {
            await updateProduct(id, formData);
            alert("Product updated successfully!");
            window.location.href = "/products"; // Redirect to product list
        } catch (error) {
            console.error(error);
            alert("Error updating product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full bg-yellow-500 text-white px-4 py-2 rounded ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
}
