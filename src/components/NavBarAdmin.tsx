"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavbarAdmin: React.FC = () => {
    const [isClient, setIsClient] = useState(false); // Para verificar se está no cliente
    const router = useRouter(); // useRouter no cliente

    useEffect(() => {
        setIsClient(true); // Atualiza o estado para indicar que o componente foi montado no cliente
    }, []);

    // Não renderiza o componente se não estiver no cliente
    if (!isClient) return null;

    const navLinks: { path: string; label: string }[] = [
        { path: "/admin", label: "Dashboard" },
        { path: "/users", label: "Utilizadores" },
        { path: "/books", label: "Livros" },
        { path: "/authors", label: "Autores" },
        { path: "/publishers", label: "Editoras" },
        { path: "/categories", label: "Categorias" },
    ];

    return (
        <nav className="bg-slate-100 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="src/assets/logo.png" className="h-10" alt="Flowbite Logo" />
                    <span
                        className="self-center text-xl font-regular whitespace-nowrap text-gray-600"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        BIBLIO.Gest
                    </span>
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="bg-slate-100 font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        {navLinks.map(({ path, label }) => (
                            <li key={path}>
                                <Link
                                    href={path}
                                    className={`block py-2 px-3 rounded-sm md:p-0 ${router.pathname === path
                                        ? "text-red-200 bg-blue-700 md:bg-transparent"
                                        : "text-gray-600 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-300"
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

export default NavbarAdmin;
