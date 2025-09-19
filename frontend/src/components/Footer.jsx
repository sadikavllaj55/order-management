import React from "react";

export default function Footer() {
    return (
        <footer className="bg-white shadow p-4 text-center mt-auto">
            &copy; {new Date().getFullYear()} My Order Management Dashboard
        </footer>
    );
}
