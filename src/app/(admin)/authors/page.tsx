import AuthorList from "@/components/authors/AuthorList";
import { getAuthors } from "@/actions/author/actions";

export default async function AuthorPage() {
    // Buscar autores do servidor
    const authors = await getAuthors();

    return (

        <main className="bg-gray-50 text-gray-700 pt-24 h-screen w-full">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h2 className="text-4xl font-semibold text-gray-800 mt-6 mb-6">Autores</h2>
                <AuthorList authors={authors} />
            </div>
        </main>

    );
}