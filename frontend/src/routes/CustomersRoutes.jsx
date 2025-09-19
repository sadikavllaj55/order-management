import { Route } from "react-router-dom";
import CustomerList from "../components/customers/CustomerList";
import CustomerCreate from "../components/customers/CustomerCreate";
import CustomerEdit from "../components/customers/CustomerEdit";

export default function CustomersRoutes() {
    return (
        <>
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/create" element={<CustomerCreate />} />
            <Route path="/customers/edit/:id" element={<CustomerEdit />} />
        </>
    );
}
