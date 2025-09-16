/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import { compareSync } from "bcrypt-ts-edge";
import { NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
				if (credentials === null) return null;

				const user = await prisma.user.findFirst({
					where: { email: credentials.email as string },
				});
				if (user && user.password) {
					const isValid = compareSync(credentials.password as string, user.password);
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
			session.user.role = token.role;
			session.user.name = token.name;

			
			if (trigger === "update") {
				session.user.name = user.name;
			}
			return session;
		},
		async jwt({ token, user, trigger, session }: any) {
			//Asign user fields to token
			if (user) {
				token.role = user.role;

				// User doesnt have a name
				if (user.name === 'NO_NAME') {
					token.name = user.email!.split('@')[0];
				}

				// Update database with new token name
				await prisma.user.update({
					where: { id: user.id },
					data: {name: token.name}
					
				})
			}
			return token
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		authorized({ request, auth }: any) {
			// Checking the session cart cookie
			if (!request.cookies.get('sessionCartId')	) {
				// Generate new session cart id cookie
				const sessionCartId = crypto.randomUUID();
				
				// Clone request headers
				const newRequestHeaders = new Headers(request.headers);

				// Create new response and add new headers
				const response = NextResponse.next({
					request: {
						headers: newRequestHeaders
					}
				})

				// Set new session cart id in response cookies
				response.cookies.set('sessionCartId', sessionCartId);
				return response;
			} else {
				return true;
			}
		}
	},
} satisfies NextAuthConfig;

export const {handlers, auth, signIn, signOut} = NextAuth(config)
