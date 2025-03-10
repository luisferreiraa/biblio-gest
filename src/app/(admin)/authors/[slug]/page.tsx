import prisma from "@/lib/db";

export default async function PostPage({ params }: { params: { slug: string } }) {
    // Garantir que 'slug' está a ser passado
    const { slug } = await params;

    if (!slug) {
        return <p>Erro: Nenhum slug fornecido!</p>;
    }

    // Busca do author no banco de dados com o slug
    const author = await prisma.author.findUnique({
        where: {
            slug: slug,
        },
    });

    // Caso o author não seja encontrado
    if (!author) {
        return <p>Post não encontrado!</p>;
    }

    // Retorno da página com o conteúdo do author
    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-semibold text-gray-800">{author.name}</h1>
            <span>
                {author.isActive ? (
                    <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs font-medium">Ativo</span>
                ) : (
                    <span className="bg-red-100 text-red-600 py-1 px-3 rounded-full text-xs font-medium">Inativo</span>
                )}
            </span>
            <h2 className="text-2xl font-semibold text-gray-700 mt-5">Livros</h2>
        </main>

    );
}