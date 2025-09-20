import { Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function ProductsLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-slate-600 text-white p-4 flex justify-between items-center">
                <h1 className="font-bold text-lg">Products Section</h1>
                <LogoutButton />
            </header>

            <Outlet />
        </div>
    );
}
