import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    callbacks: {
        signOut: async () => {
            return "/";
        },

        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.access;
                token.refreshToken = user.refresh;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async credentials => {
                const res = await fetch("http://localhost:8000/api/token/", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });
                const user = await res.json();
                if (res.ok && user) {
                    console.log("user token : ", JSON.stringify(res));
                    return user;
                }
                return null;
            }
        })
    ],
    session: {
        jwt: true
    },
    jwt: {
        secret: "SECRET"
    },
    pages: {
        signIn: "/",
        signOut: "/register",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: "/"
    }
});
