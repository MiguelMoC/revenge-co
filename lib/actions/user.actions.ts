"use server";
import { signInformSchema, signUpformSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";

// Sign In User
export async function signInUser(prevState: unknown, formData: FormData) {
	try {
		const user = signInformSchema.parse({
			email: formData.get('email'),
			password: formData.get('password'),
        });
        await signIn('credentials', user);
        return { success: true, message: "Signed in successfully" };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return { success: false, message: "Invalid credentials." };
    }
}

// Sign Out User
export async function signOutUser() {
    await signOut();
}

// Sign Up User
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpformSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });     
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
        });
        if (existingUser) {
            return { success: false, message: "User already exists." };
        }
        //Plain Password
        const plainPassword = user.password;
        // Hash password
        const hashedPassword = hashSync(user.password, 10);
        // Create user
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword,
                role: 'USER',
            },
        });

        await signIn('credentials', {
            email: user.email,
            password: plainPassword
        });
        
        return { success: true, message: "User created successfully. Please sign in." };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return { success: false, message: "Error creating user." };
    }   
}