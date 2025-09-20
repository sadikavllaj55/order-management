import LogoutButton from "./LogoutButton";

export default function Header() {
    return (
        <header className="flex justify-end p-4 bg-gray-100 shadow">
            <LogoutButton />
        </header>
    );
}
