"use client";

import { useEffect, useState } from "react";
import { Author } from "@prisma/client";
import Link from "next/link";
import { deleteAuthor } from "@/actions/author/actions";
import AuthorModal from "./AuthorModal";

export default function AuthorList({ authors }: { authors: Author[] }) {
    const [authorList, setAuthorList] = useState(authors);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAuthors, setFilteredAuthors] = useState(authors);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredAuthors(authorList);
        } else {
            setFilteredAuthors(
                authorList.filter((author) =>
                    author.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, authorList]);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

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
        <div className="w-full h-screen bg-gray-50">
            {/* Search Bar e Botão de Adicionar Autor */}
            <div className="flex items-center justify-between mt-5 w-full px-6">
                <div className="flex w-full gap-x-4">
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button
                        onClick={openModal}
                        className="bg-green-500 py-2 px-4 text-sm text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Modal */}
            <AuthorModal isOpen={isModalOpen} closeModal={closeModal} onAuthorCreated={handleAuthorCreated} />

            {/* Tabela */}
            <div className="mt-3 px-6">
                <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Nome do Autor</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Estado</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAuthors.length > 0 ? (
                            filteredAuthors.map((author) => (
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
            </div>
        </div>
    );
}
