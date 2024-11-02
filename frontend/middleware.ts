import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth(function middleware(req: NextRequest) { }, {
    callbacks: {
        authorized: ({ token }) => {
            if (token) {
              
                
                return true;
            }
            return false;
        },
    },
    pages: {
        signIn: "/log-in",
    },
});

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|icons|sign-up|log-in).*)",
    ],
    // matcher: [
    //     "/hello"
    // ]
};