import { Route } from "react-router-dom";
import ProductList from "../pages/products/ProductList";
import ProductCreate from "../pages/products/ProductCreate";
import ProductEdit from "../pages/products/ProductEdit";

export const productsRoutes = (
    <>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
    </>
);
