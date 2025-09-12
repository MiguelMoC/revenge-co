/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import { compareSync } from "bcrypt-ts-edge";
import { NextAuthConfig } from "next-auth";
export const config = {
	pages: {
		signIn: "/sign-in",
		error: "/sign-in",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: "email" },
				password: { type: "password" },
			},
			async authorize(credentials) {
				console.log("🚀 ~ credentials:", credentials);
				if (credentials === null) return null;

				const user = await prisma.user.findFirst({
					where: { email: credentials.email as string },
				});
				console.log("🚀 ~ user:", user);
				if (user && user.password) {
					const isValid = compareSync(credentials.password as string, user.password);
					console.log("🚀 ~ isValid:", isValid);
					if (isValid) {
						return {
							id: user.id,
							email: user.email,
							name: user.name,
							role: user.role,
						};
					}
				}
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, user, trigger, token }: any) {
			session.user.id = token.sub;
			if (trigger === "update") {
				session.user.name = user.name;
			}
			return session;
		},
	},
 } satisfies NextAuthConfig;

export const {handlers, auth, signIn, signOut} = NextAuth(config)
