import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import SignInForm from "./signin-form";
import { auth } from "@/auth";  
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign In to your account"
}

const SignInPage = async (props: {
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
                    <h2 className="h2-bold">Sign In</h2>
                    <p className="text-sm text-muted-foreground">Sign in to your account</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SignInForm />
                </CardContent>
            </Card>
        </div>
     );
}
 
export default SignInPage;