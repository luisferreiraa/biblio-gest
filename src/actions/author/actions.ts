"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function getAuthors() {
    return await prisma.author.findMany({
        orderBy: { createdAt: "desc" }
    });
}

export async function getAuthorsBySlug(slug: string) {
    return await prisma.author.findUnique({
        where: {
            slug,
        },
    });
}

export async function countAuthors() {
    return await prisma.author.count();
}

export async function fetchAuthorsCount() {
    "use server";
    return await countAuthors();
}

export async function createAuthor(formData: FormData) {

    await prisma.author.create({
        data: {
            name: formData.get("name") as string,
            slug: slugify(formData.get("name") as string, { lower: true })
        }
    });

    revalidatePath('/authors');
}

export async function updateAuthorName(id: string, newName: string) {

    const newSlug = slugify(newName, { lower: true })

    try {
        const updatedAuthor = await prisma.author.update({
            where: { id },
            data: {
                name: newName,
                slug: newSlug
            },
        });
        return updatedAuthor;
    } catch (error) {
        console.error("Erro ao atualizar nome do autor:", error);
        throw new Error("Falha ao atualizar o autor.");
    }
}

export async function deleteAuthor(id: string) {
    await prisma.author.delete({
        where: { id },
    });
    revalidatePath("/authors");
}