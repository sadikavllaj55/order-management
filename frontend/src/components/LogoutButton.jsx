import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. Remove token from localStorage
        localStorage.removeItem("token");

        // 2. Redirect to login page
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
}
