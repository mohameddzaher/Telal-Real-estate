import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@telaldevelopment.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Placeholder: In production, validate against database
        // For development, use a demo account
        if (
          credentials?.email === "admin@telaldevelopment.com" &&
          credentials?.password === "admin123456"
        ) {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@telaldevelopment.com",
            role: "SUPER_ADMIN",
          };
        }

        if (
          credentials?.email === "agent@telaldevelopment.com" &&
          credentials?.password === "agent123456"
        ) {
          return {
            id: "2",
            name: "Sales Agent",
            email: "agent@telaldevelopment.com",
            role: "AGENT",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "telal-dev-secret-change-in-production",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GET = handler as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const POST = handler as any;
export { GET, POST };
