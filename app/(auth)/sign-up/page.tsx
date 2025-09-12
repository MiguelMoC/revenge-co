import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@/auth";  
import { redirect } from "next/navigation";
import SignUpForm from "./signup-form";
export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign In to your account"
}

const SignUpPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string
    }>
}) => {

    const { callbackUrl } = await props.searchParams;
    const session = await auth();
    if (session) {
        redirect(callbackUrl || '/');
    }

    return ( 
        <div className="max-w-md w-full space-y-8">
            <Card>
                <CardHeader className="text-center p-8">
                    <Link href="/">
                        <Image
                            src="/images/logo.svg"
                            alt={`${APP_NAME} Logo`}
                            width={50}
                            height={50}
                            className="mt-4 mx-auto"
                        />
                    </Link>
                    <h2 className="h2-bold">Create Account</h2>
                    <p className="text-sm text-muted-foreground">Create an account.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SignUpForm />
                </CardContent>
            </Card>
        </div>
     );
}
 
export default SignUpPage;