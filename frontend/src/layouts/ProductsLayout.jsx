import { Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function ProductsLayout() {
    return (
        <div className="">
            {/* Header */}
            {/*<header className="bg-blue-600 text-white p-4 flex justify-between items-center">*/}
                <h1 className="font-bold text-lg">Products Section</h1>
                <LogoutButton />
            {/*</header>*/}


            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
