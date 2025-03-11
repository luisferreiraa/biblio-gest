"use client"

import { useEffect, useState } from "react";
import { Author, Book } from "@prisma/client";
import Link from "next/link";

export default function AuthorBookList({ authorBooks }: { authorBooks: Book[] }) {
    const [authorBooksList, setAuthorBooksList] = useState<Book[]>(authorBooks);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredBooks(authorBooksList);
        } else {
            setFilteredBooks(
                authorBooksList.filter((book) =>
                    book.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, authorBooksList]);


    return (
        <div className="w-full h-screen bg-gray-50">
            {/* Search Bar */}
            <div className="flex items-center justify-between mt-5 w-full px-6">
                {/* Barra de Pesquisa */}
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabela */}
            <ul className="w-full mt-3">
                <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Título</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Estado</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <tr key={book.id} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-sm text-gray-800">
                                        <Link href={`/books/${book.id}`} className="text-blue-600 hover:underline">
                                            {book.title}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-6 text-sm text-gray-700">
                                        {book.isActive ? (
                                            <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs font-medium">Ativo</span>
                                        ) : (
                                            <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs font-medium">Inativo</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-sm">
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="py-4 px-6 text-center text-gray-600">
                                    Não foram encontrados resultados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </ul>
        </div>
    );




}