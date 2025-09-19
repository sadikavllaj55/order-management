import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productService";
import ProductForm from "./ProductForm";

export default function AddProduct() {
    const navigate = useNavigate();

    const handleCreate = async (data) => {
        await createProduct(data);
        navigate("/dashboard/products");
    };

    return <ProductForm onSubmit={handleCreate} />;
}
