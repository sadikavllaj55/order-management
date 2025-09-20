import { useState } from "react";
import Sidebar from "./LogoutButton.jsx";
import Customers from "../pages/Customers";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
    const [view, setView] = useState("orders"); // default tab

    return (
        <div className="flex flex-col min-h-screen">
            <Header title="Admin Dashboard" />
            <div className="flex flex-1">
                <Sidebar setView={setView} />
                <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                    {view === "orders" && <Orders />}
                    {view === "customers" && <Customers />}
                    {view === "products" && <Products />}
                </main>
            </div>
            <Footer />
        </div>
    );
}
