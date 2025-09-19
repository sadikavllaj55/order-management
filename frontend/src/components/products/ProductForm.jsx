import { useState, useEffect } from "react";

export default function ProductForm({ initialData = {}, onSubmit }) {
    const [name, setName] = useState(initialData.name || "");
    const [price, setPrice] = useState(initialData.price || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, price });
    };

    useEffect(() => {
        setName(initialData.name || "");
        setPrice(initialData.price || "");
    }, [initialData]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
                <label className="block">Name</label>
                <input
                    className="border p-2 w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label className="block">Price</label>
                <input
                    type="number"
                    className="border p-2 w-full"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <button className="bg-green-600 text-white px-4 py-2 rounded">
                Save
            </button>
        </form>
    );
}
