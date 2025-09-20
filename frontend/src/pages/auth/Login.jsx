import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/login", { email, password });

            if (response.data.access_token) { // <-- check access_token
                localStorage.setItem("token", response.data.access_token); // save token
                navigate("/products"); // <-- redirect to products page
            }
        } catch (err) {
            if (err.response?.data?.errors) {
                setError(Object.values(err.response.data.errors).flat().join(" "));
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Welcome</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded text-white font-semibold ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="mt-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()}
            </p>
        </div>
    );
}
