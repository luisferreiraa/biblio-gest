'use client';

import { useState } from "react";
import { Author } from "@prisma/client";
import { createAuthor } from "@/actions/author/actions";
import { toast } from "@/hooks/use-toast";

interface AuthorModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onAuthorCreated: (author: Author) => void;
}

export default function AuthorModal({
    isOpen,
    closeModal,
    onAuthorCreated,
}: AuthorModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Criar FormData para enviar ao servidor
            const serverFormData = new FormData();
            serverFormData.append('name', formData.name); // O campo 'name' que está sendo enviado para o backend

            // Agora, envie o FormData para o backend
            const newAuthor = await createAuthor(serverFormData); // Passar o FormData para a função do backend

            // Atualizar a lista com o autor criado no backend
            onAuthorCreated(newAuthor);

            setFormData({ name: '' }); // Limpar o formulário
            closeModal(); // Fechar o modal após a criação
        } catch (error: any) {
            // Exibir erro
            console.error("Erro ao criar autor:", error);
        } finally {
            setIsSubmitting(false);
        }
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
                    <input
                        name="name"
                        placeholder="Nome do autor"
                        className="px-3 py-2 rounded-sm bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        value={formData.name}
                        onChange={handleChange}
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
