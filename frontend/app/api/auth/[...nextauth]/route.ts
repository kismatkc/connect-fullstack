import { Api } from "@/lib/utils";
import { AxiosResponse } from "axios";
import { NextAuthOptions, Session } from "next-auth";
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
            async authorize(credentials) {


                try {

                    const response = await Api.post("/verify_user", credentials);
                    console.log("happening");
                    
                    return response.data;

                } catch (error: unknown) {

                    throw new Error("Error verifying credentials");
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };