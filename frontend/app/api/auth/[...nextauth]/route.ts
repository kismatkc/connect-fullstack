import { Api } from "@/lib/axios-utils";
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
        if (!req.body) return null;
        return req.body as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async function (params) {
      const { user, token, session } = params;

      if (!user) return token;
      // @ts-ignore
      token.name = `${user.first_name} ${user.last_name}`;
      // @ts-ignore

      token.picture = user.profile_picture_url;
      token.id = user.id;

      return token;
    },
    session: async function ({ session, token }) {
      if (token) {
        console.log(session);

        // @ts-ignore
        session.user.id = token.id;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
