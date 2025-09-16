import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
	providers: [],
	callbacks: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
		authorized({ request, auth }: any) {
			// Checking the session cart cookie
			if (!request.cookies.get("sessionCartId")) {
				// Generate new session cart id cookie
				const sessionCartId = crypto.randomUUID();

				// Clone request headers
				const newRequestHeaders = new Headers(request.headers);

				// Create new response and add new headers
				const response = NextResponse.next({
					request: {
						headers: newRequestHeaders,
					},
				});

				// Set new session cart id in response cookies
				response.cookies.set("sessionCartId", sessionCartId);
				return response;
			} else {
				return true;
			}
		},
	},
} satisfies NextAuthConfig;
