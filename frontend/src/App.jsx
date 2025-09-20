import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {authRoutes} from "./routes/AuthRoutes.jsx";
import {productsRoutes} from "./routes/ProductsRoutes";
import {customersRoutes} from "./routes/CustomersRoutes";
import AppLayout from "./layouts/AppLayout.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {authRoutes}
          {productsRoutes}
          {customersRoutes}

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout/>
            </ProtectedRoute>}>
            <Route index element={<Home/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
