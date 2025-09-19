import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../../services/productService";
import ProductForm from "./ProductForm";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProduct(id).then(setProduct);
    }, [id]);

    const handleUpdate = async (data) => {
        await updateProduct(id, data);
        navigate("/dashboard/products");
    };

    if (!product) return <p>Loading...</p>;

    return <ProductForm initialData={product} onSubmit={handleUpdate} />;
}
