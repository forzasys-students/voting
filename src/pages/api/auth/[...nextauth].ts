import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Argon2 from 'argon2';
import prisma from '../../../lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, _req) {
        if (!credentials) {
          return null;
        }

        // Find the user in the database
        const user = await prisma.user.findFirst({
          where: {
            username: {
              equals: credentials.username,
              mode: 'insensitive',
            },
          },
        });

        // User does not exist
        if (!user) return null;

        // Verify the password with Argon2
        const valid = await Argon2.verify(
          user.passwordHash,
          credentials.password
        );

        // Password is not valid
        if (!valid) {
          return null;
        }

        // Return the user object
        return { id: String(user.id), name: user.username, userId: user.id };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.userId = Number(token.sub);

      return session;
    },
  },
};

export default NextAuth(authOptions);
