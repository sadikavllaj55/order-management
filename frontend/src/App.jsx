import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Orders from "./pages/Orders.jsx";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard.jsx";

function App() {
   /* return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                return <Dashboard />;
                <Route path="/products" element={<Products />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/orders" element={<Orders />} />

            </Routes>
        </Router>
    );*/
    return <Dashboard />;
}

export default App;
