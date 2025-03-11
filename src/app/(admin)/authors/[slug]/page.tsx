import { getAuthorsBySlug } from "@/actions/author/actions";
import { getBooksByAuthor } from "@/actions/books/actions";
import AuthorBookList from "@/components/authors/AuthorBookList";

export default async function AuthorPage({ params }: { params: { slug: string } }) {
    // Garantir que 'slug' está a ser passado
    const { slug } = await params;

    if (!slug) {
        return <p>Erro: Nenhum slug fornecido!</p>;
    }

    // Busca do author no banco de dados com o slug
    const author = await getAuthorsBySlug(slug);

    // Caso o author não seja encontrado
    if (!author) {
        return <p>Autor não encontrado!</p>;
    }

    // Busca dos livros do author
    const authorBooks = await getBooksByAuthor(author.id);

    // Caso o author não seja encontrado
    if (!author) {
        return <p>Autor não encontrado!</p>;
    }

    // Retorno da página com o conteúdo do author
    return (
        <main className="w-full flex flex-col items-center pt-24 text-center bg-gray-50 min-h-screen">
            <div className="w-full p-6 flex flex-col items-center justify-center">
                {/* Nome do autor com ícone */}
                <div className="flex items-center mb-2">
                    <h1 className="text-4xl font-semibold text-gray-800">{author.name}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4285F4" className="ml-2">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                    </svg>
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
        </main >

    );
}