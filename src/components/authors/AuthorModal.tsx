'use client';

import { useState } from "react";
import { createAuthor } from "@/actions/author/actions";

interface AuthorModalProps {
    isOpen: boolean;
    closeModal: () => void;
    /*  onAuthorCreated: (author: Author) => void; */
}

export default function AuthorModal({
    isOpen,
    closeModal,
}: AuthorModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setError(null);

        const result = await createAuthor(formData); // Chama a ação do servidor

        if (result?.error) {
            setError(result.error);
        } else {
            closeModal(); // Fecha o modal se tudo deu certo
        }

        setIsSubmitting(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
                    aria-label="Fechar"
                >
                    ×
                </button>

                <h2 className="text-xl font-semibold mb-4 text-gray-800">Criar Novo Autor</h2>

                <form action={handleSubmit} className="flex flex-col gap-y-3">
                    <input
                        name="name"
                        placeholder="Nome do autor"
                        className="px-3 py-2 rounded-sm bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 py-2 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        {isSubmitting ? "A criar..." : "Criar Autor"}
                    </button>
                </form>
            </div>
        </div>
    );
}
