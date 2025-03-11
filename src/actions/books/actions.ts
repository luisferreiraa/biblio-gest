"use server"

import prisma from "@/lib/db";

export async function getBooksByAuthor(authorId: string) {
    return await prisma.book.findMany({
        where: {
            authors: {
                some: {
                    id: authorId,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}