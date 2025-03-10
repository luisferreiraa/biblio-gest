import AuthorList from "@/components/authors/AuthorList";
import { countAuthors, getAuthors } from "@/actions/author/actions";

export default async function AuthorPage() {
    const authors = await getAuthors();

    return (

        <main className="bg-gray-50 text-gray-700">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Autores</h2>

                {/* Passa os posts para o componente CSR */}
                <AuthorList authors={authors} />
            </div>
        </main>

    );
}