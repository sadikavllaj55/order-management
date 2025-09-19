import { Route } from "react-router-dom";
import CustomerList from "../pages/customers/CustomerList";
import CustomerCreate from "../pages/customers/CustomerCreate";
import CustomerEdit from "../pages/customers/CustomerEdit";

export const customersRoutes = (
    <>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<CustomerCreate />} />
        <Route path="/customers/edit/:id" element={<CustomerEdit />} />
    </>
);
