import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from "next-auth";
import { comparePassword } from '@/lib/util';

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "mohanrao@email.com" },
                password: { label: "Password", type: "password", placeholder: "********" },
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials.email || !credentials.password) return null;

                const adapter = authOptions.adapter;
                console.log("Inside Authorize : credentials", credentials);

                let user: any = await adapter.getUserByEmail(credentials.email);
                console.log("Inside Authorize : user", user);

                console.log("adapter: ", adapter)

                if (user) {
                    const match = await comparePassword(credentials.password, user.passwordHash);
                    console.log("Inside Authorize : match", match);
                    user = { ...user, name: user.firstName + " " + user.lastName };
                    return match ? user : null;
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin

            console.log("Inside JWT : token", token);
            console.log("Inside JWT : user", user);
            if (user) {
                token.accessToken = user.access_token;
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("Inside Session : session", session);
            console.log("Inside Session : token", token);
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.username = token.username;

            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
}