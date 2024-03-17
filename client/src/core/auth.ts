import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_BASE_URL } from "./api/api";
import NextAuth from "next-auth";

const credentialsProvider = CredentialsProvider({
    name: "credentials",
    credentials: {
        username: { type: "text" },
        password: { type: "password" },
    },
    async authorize(credentials, req) {
        // console.log(credentials);
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(API_BASE_URL + "user/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(res);

        if (res.status == 401) {
            console.log(res.statusText);

            return null;
        }
        const user = await res.json();
        console.log(user);

        return user;
    },

})

const config = {
    providers: [credentialsProvider],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            console.log(pathname);
            console.log(auth);

            if (pathname.includes("/dashboard")) return !!auth
            return true
        },
        async jwt({ token, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (user) {
                token.token = user.token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.token = token.token
            return session
        }
    }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)