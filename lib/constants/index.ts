export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Shop Co.";
export const APP_DESCRIPTION =
	process.env.NEXT_PUBLIC_APP_DESCRIPTION || "The Best Shop";
export const SERVER_URL =
	process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMITS =
	Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;
export const SIGNIN_DEFAULTS = {
	email: "name@domain.com",
	password: "P4$$w0rd-_-!82",
};
export const SIGN_UP_DEFAULTS = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};
