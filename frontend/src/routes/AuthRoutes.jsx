import {Route} from "react-router-dom";
import Login from "../pages/auth/Login.jsx";

export const authRoutes = (
    <>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
    </>
)
