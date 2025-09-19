import { Routes, Route } from "react-router-dom";
import AddProduct from "../components/products/AddProduct";
import EditProduct from "../components/products/EditProduct";
import ProductList from "../components/products/ProductList";


export default function Products() {
    return (
        <Routes>
            <Route index element={<ProductList />} />
            <Route path="add" element={<AddProduct />} />
            <Route path=":id/edit" element={<EditProduct />} />
        </Routes>
    );
}
