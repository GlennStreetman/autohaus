import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import PrismaClient from "./../../../lib/prismaPool";
import EmailProvider from "next-auth/providers/email";

const prisma = PrismaClient;

export default NextAuth({
    // https://next-auth.js.org/configuration/providers
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    secret: process.env.SECRET,

    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },

    debug: process.env.DEBUG,

    callbacks: {
        async session({ session, token, user }) {
            // console.log("--Session CALLED--", session, "--user--", user, "--token--", token);
            session.user.role = user.role;
            return session;
        },
    },
});
