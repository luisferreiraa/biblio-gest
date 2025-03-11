"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createAuthor } from "@/actions/author/actions";
import { Author } from "@prisma/client";
import Form from "next/form";

export default function AuthorModal({
    isOpen,
    closeModal,
    onAuthorCreated
}: {
    isOpen: boolean,
    closeModal: () => void,
    onAuthorCreated: (author: Author) => void
}) {

    const [error, setError] = useState<string | null>(null);

    const createAuthorAction = async (_state: any, formData: FormData) => {
        try {
            const author = await createAuthor(formData);
            onAuthorCreated(author);
            closeModal();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const [state, formAction] = useActionState(createAuthorAction, null);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] relative">
                        {/* Ícone "x" no canto superior direito */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            ×
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Criar Novo Autor</h2>

                        <Form action={formAction} className="flex flex-col gap-y-3">
                            <input
                                name="name"
                                placeholder="Nome do autor"
                                className="px-3 py-2 rounded-sm bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <button
                                type="submit"
                                className="bg-blue-500 py-2 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Criar
                            </button>
                        </Form>

                        {/* Mensagem de erro, se houver */}
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                </div>
            )}
        </>
    );
}
