import { BrowserRouter as Router, Routes } from "react-router-dom";
import { productsRoutes } from "./routes/ProductsRoutes";
import { customersRoutes } from "./routes/CustomersRoutes";

function App() {
    return (
        <Router>
            <Routes>
                {productsRoutes}
                {customersRoutes}
            </Routes>
        </Router>
    );
}

export default App;
