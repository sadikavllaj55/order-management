import {BrowserRouter as Router, Routes} from "react-router-dom";
import {authRoutes} from "./routes/AuthRoutes.jsx";
import {productsRoutes} from "./routes/ProductsRoutes";
import {customersRoutes} from "./routes/CustomersRoutes";

function App() {
    return (
        <Router>
            <Routes>
                {authRoutes}
                {productsRoutes}
                {customersRoutes}
            </Routes>
        </Router>
    );
}

export default App;
