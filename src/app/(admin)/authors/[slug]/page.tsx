"use client";

import { use, useEffect, useState } from "react";
import { getAuthorsBySlug, updateAuthorName } from "@/actions/author/actions";
import { getBooksByAuthor } from "@/actions/books/actions";
import AuthorBookList from "@/components/authors/AuthorBookList";
import { Book } from "@prisma/client";

export default function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const [slug, setSlug] = useState<string | null>(null);

    const [author, setAuthor] = useState<any>(null);
    const [authorBooks, setAuthorBooks] = useState<Book[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        params.then(resolvedParams => {
            setSlug(resolvedParams.slug);
        });
    }, [params]);

    useEffect(() => {
        async function fetchData() {
            if (!slug) return;

            const fetchedAuthor = await getAuthorsBySlug(slug);
            if (fetchedAuthor) {
                setAuthor(fetchedAuthor);
                setNewName(fetchedAuthor.name);
                const books = await getBooksByAuthor(fetchedAuthor.id);
                setAuthorBooks(books);
            }
        }

        fetchData();
    }, [slug]);

    async function handleSave() {
        if (!author || newName.trim() === "" || newName === author.name) return; // Evita updates desnecessários

        try {
            const updatedAuthor = await updateAuthorName(author.id, newName);
            if (updatedAuthor) {
                setAuthor(updatedAuthor);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Erro ao salvar autor:", error);
        }
    }

    if (!author) {
        return <p>Autor não encontrado!</p>;
    }

    return (
        <main className="w-full flex flex-col items-center pt-24 text-center bg-gray-50 min-h-screen">
            <div className="w-full p-6 flex flex-col items-center justify-center">
                <div className="flex items-center mb-2">
                    {isEditing ? (
                        <div className="flex items-center gap-3">
                            {/* Input Estilizado */}
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="border border-gray-300 text-gray-700 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                            />

                            {/* Botões */}
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md shadow hover:bg-gray-300 transition duration-200"
                            >
                                Cancelar
                            </button>
                        </div>
                    ) : (
                        <h1 className="text-4xl font-semibold text-gray-800">{author.name}</h1>
                    )}

                    {/* Ícone de edição */}
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="ml-2 group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="currentColor"
                                className="text-blue-500 group-hover:text-blue-700 transition-colors duration-200"
                            >
                                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                            </svg>
                        </button>
                    )}
                </div>

                <span>
                    {author.isActive ? (
                        <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs font-medium">Ativo</span>
                    ) : (
                        <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs font-medium">Inativo</span>
                    )}
                </span>

                <h2 className="text-2xl font-semibold text-gray-700 mt-5">Livros</h2>
                <AuthorBookList authorBooks={authorBooks} />
            </div>
        </main>
    );
}
