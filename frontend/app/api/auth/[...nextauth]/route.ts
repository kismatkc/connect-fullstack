import { Api } from "@/lib/utils";
import { PostGresUser } from "@/types";
import { AxiosResponse } from "axios";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                //this belwo logic is nto reposne for verifying it is beign fired after succesfull validation from the veryufy-user hook
                if (!req.body) return null
                return req.body as any
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async function (params) {
            const { user, token, session } = params;
            console.log("user", user);
            console.log("token", token);
            console.log("session", session);
            if (!user) return token
            // @ts-ignore
            token.name = `${user.first_name} ${user.last_name}`;

            return token
        },
        session: async function ({ session ,token}) {
            console.log("session", session);
        

            return session
        }
    }

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };