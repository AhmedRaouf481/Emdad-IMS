import CredentialsProvider from "next-auth/providers/credentials";
import { API_BASE_URL } from "../api/api";
import NextAuth, { NextAuthOptions } from "next-auth";

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

        if (res.status == 401) {
            console.log(res.statusText);

            return null;
        }
        const user = await res.json();

        return user;
    },

})

const config: NextAuthOptions = {
    providers: [credentialsProvider],
    pages: {
        signIn: "/login"
    },
    callbacks: {
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
}

export const handler = NextAuth(config)