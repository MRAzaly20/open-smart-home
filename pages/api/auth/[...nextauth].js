// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    callbacks: {
        signOut: async () => {
            // URL redirect setelah logout
            return "/";
        },

        async jwt({ token, user }) {
            // Jika user ada, tambahkan token JWT ke objek token
            if (user) {
                token.accessToken = user.access;
                token.refreshToken = user.refresh;
            }
            return token;
        },
        async session({ session, token }) {
            // Tambahkan token JWT ke objek sesi
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
                // Jika tidak ada error dan kita mendapatkan JWT
                if (res.ok && user) {
                    console.log("user token : ", JSON.stringify(res));
                    return user;
                }
                // Jika tidak bisa mendapatkan JWT, kembalikan null
                return null;
            }
        })
    ],
    session: {
        jwt: true
    },
    jwt: {
        secret: "SECRET" // Gunakan secret yang sebenarnya di lingkungan produksi
    },
    pages: {
        signIn: "/",
        signOut: "/register",
        error: "/auth/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: null // Jika pengguna baru dibuat, redirect ke halaman ini
    }
});
