"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

export const NavbarAdmin = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { path: "/admin", label: "Dashboard" },
        { path: "/users", label: "Utilizadores" },
        { path: "/books", label: "Livros" },
        { path: "/authors", label: "Autores" },
        { path: "/publishers", label: "Editoras" },
        { path: "/categories", label: "Categorias" },
    ];

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <Link href="/" className="text-xl font-medium text-gray-800" style={{ fontFamily: "Roboto, sans-serif" }}>
                    BIBLIO.Gest
                </Link>
                <button
                    className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Menu size={24} />
                </button>
                <div className={`md:flex space-x-6 ${menuOpen ? "block" : "hidden"} md:block w-full md:w-auto mt-2 md:mt-0 bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}>
                    <ul className="flex flex-col md:flex-row md:space-x-6">
                        {navLinks.map(({ path, label }) => (
                            <li key={path}>
                                <Link
                                    href={path}
                                    className={`px-4 py-2 rounded-lg transition-colors ${pathname === path
                                            ? "text-blue-600 font-medium"
                                            : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
