import AuthorList from "@/components/authors/AuthorList";
import { createAuthor, getAuthors } from "@/actions/author/actions";

export default async function AuthorPage() {
    // Buscar autores do servidor
    const authors = await getAuthors();

    return (

        <main className="bg-gray-50 text-gray-700 pt-24 h-screen w-full">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h2 className="text-4xl font-semibold text-gray-800 mt-6 mb-6">Autores</h2>

                <form action={createAuthor} className="flex flex-col gap-y-3">
                    <input
                        name="name"
                        placeholder="Nome do autor"
                        className="px-3 py-2 rounded-sm bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        /* disabled={isSubmitting} */
                        className="bg-blue-500 py-2 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >Adicionar
                        {/* {isSubmitting ? "A criar..." : "Criar Autor"} */}
                    </button>
                </form>

                <AuthorList authors={authors} />
            </div>
        </main>

    );
}