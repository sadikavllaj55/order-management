import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="products/*" element={<Products />} />
                    <Route path="customers/*" element={<Customers />} />
                    <Route path="orders/*" element={<Orders />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
