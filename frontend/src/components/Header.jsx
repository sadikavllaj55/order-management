import React from "react";

export default function Header({ title }) {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">{title}</h1>
            <div>
                <span className="mr-4">Admin</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Logout
                </button>
            </div>
        </header>
    );
}
