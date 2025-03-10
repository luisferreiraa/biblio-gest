"use client"

import { useState } from "react";
import { Author } from "@prisma/client";
import Link from "next/link";
import { deleteAuthor, fetchAuthorsCount } from "@/actions/author/actions";
import AuthorModal from "./AuthorModal";

export default function AuthorList({ authors }: { authors: Author[] }) {
    const [authorList, setAuthorList] = useState(authors);

    const handleAuthorCreated = (newAuthor: Author) => {
        setAuthorList((prevAuthors) => [newAuthor, ...prevAuthors]);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteAuthor(id); // Chama a API para deletar o autor
            setAuthorList((prevAuthors) => prevAuthors.filter(author => author.id !== id)); // Atualiza o estado
        } catch (error) {
            console.error("Erro ao excluir autor:", error);
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-between items-center mt-5">
                <AuthorModal onAuthorCreated={handleAuthorCreated} />
            </div>
            <ul className="mt-3">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Nome do Autor</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Estado</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authorList.map((author: Author) => (
                            <tr key={author.id} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 text-sm text-gray-800">
                                    <Link href={`/authors/${author.slug}`} className="text-blue-600 hover:underline">
                                        {author.name}
                                    </Link>
                                </td>
                                <td className="py-3 px-6 text-sm text-gray-700">
                                    {author.isActive ? (
                                        <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs font-medium">Ativo</span>
                                    ) : (
                                        <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs font-medium">Inativo</span>
                                    )}
                                </td>
                                <td className="py-3 px-6 text-sm">
                                    <button
                                        onClick={() => handleDelete(author.id)}
                                        className="text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
        </div>
    );
}