import { Route } from "react-router-dom";
import CustomerList from "../pages/customers/CustomerList";
import CustomerCreate from "../pages/customers/CustomerCreate";
import CustomerEdit from "../pages/customers/CustomerEdit";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import ProductList from "../pages/products/ProductList.jsx";
import ProductCreate from "../pages/products/ProductCreate.jsx";
import ProductEdit from "../pages/products/ProductEdit.jsx";
import ProductView from "../pages/products/ProductView.jsx";

export const customersRoutes = (
  <Route
    path="/customers"
    element={
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<CustomerList />} />
    <Route path="create" element={<CustomerCreate />} />
    <Route path="edit/:id" element={<CustomerEdit />} />
  </Route>
);
