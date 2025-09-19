/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/TS/JSX/TSX files in src
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1d4ed8",   // Example: custom primary color
                secondary: "#9333ea", // Example: custom secondary color
            },
            spacing: {
                128: "32rem",          // Example: custom spacing
            },
        },
    },
    plugins: [],
};
