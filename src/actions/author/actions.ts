"use server"

import prisma from "@/lib/db";
import { count } from "console";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function getAuthors() {
    return await prisma.author.findMany({
        orderBy: {
            createdAt: "desc",
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
    const name = formData.get("name") as string;

    if (!name) {
        throw new Error("Nome é obrigatório");
    }

    const slug = slugify(name, { lower: true });

    const author = await prisma.author.create({
        data: {
            name,
            slug,
        },
    });

    return author;
}

export async function deleteAuthor(id: string) {
    await prisma.author.delete({
        where: { id },
    });
    revalidatePath("/authors");
}