"use client";

import { Geist, Geist_Mono } from "next/font/google";
import NavbarAdmin from "@/components/NavBarAdmin";
import { useRouter } from 'next/router';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function AuthorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* Navbar Admin apenas para rotas de /author */}
                <NavbarAdmin />
                {/* O conteúdo específico da página */}
                <div className="author-content">
                    {children}
                </div>
            </body>
        </html>
    );
}
