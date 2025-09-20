import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import ProductList from "../pages/products/ProductList";
import ProductCreate from "../pages/products/ProductCreate";
import ProductEdit from "../pages/products/ProductEdit";
import ProductView from "../pages/products/ProductView";
import AppLayout from "../layouts/AppLayout.jsx";

export const productsRoutes = (
    <Route
        path="/products"
        element={
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        }
    >
        <Route index element={<ProductList />} />
        <Route path="create" element={<ProductCreate />} />
        <Route path="edit/:id" element={<ProductEdit />} />
        <Route path="view/:id" element={<ProductView />} />
    </Route>);
