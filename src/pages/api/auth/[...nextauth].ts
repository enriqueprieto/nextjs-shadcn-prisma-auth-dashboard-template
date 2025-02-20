import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import db from "@/lib/db";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "E-mail", type: "email", placeholder: "exemplo@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                throw new Error("Email e senha são obrigatórios.");
                }

                const user = await db.user.findUnique({ where: { email: credentials.email } });

                if (!user) {
                throw new Error("Usuário não encontrado.");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                throw new Error("Senha incorreta.");
                }

                return { 
                    id: String(user.id), 
                    name: user.name, 
                    email: user.email,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        async session({ session }) {       
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    pages: { 
        signIn: "/auth/login",
        signOut: "/auth/logout"
    },
};

export default NextAuth(authOptions);
