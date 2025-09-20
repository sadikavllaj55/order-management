import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { productsRoutes } from "./routes/ProductsRoutes";
import { customersRoutes } from "./routes/CustomersRoutes";
import Login from "./pages/auth/Login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {productsRoutes}
                {customersRoutes}
            </Routes>
        </Router>
    );
}

export default App;
