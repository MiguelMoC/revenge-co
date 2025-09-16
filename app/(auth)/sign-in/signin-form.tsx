'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SIGNIN_DEFAULTS } from "@/lib/constants";
import { signInUser } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SignInForm = () => {
    const [data, action] = useActionState(signInUser, {
        success: false, message: '',
    });

    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callbackUrl') || '/';
    const SignInButton = () => {
        const { pending } = useFormStatus();
        
        return <Button disabled={ pending } className="w-full">
                { pending ? 'Signing In...' : 'Sign In' }
            </Button>
        
    }
    return ( 
        <form action={action}
            className="space-y-6">
            <input type="hidden" name="callbackUrl" value={callbackURL} />
            <div className="space-y-6">
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        required
                        defaultValue={ data.email || SIGNIN_DEFAULTS.email }
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='password'
                        required
                        defaultValue={SIGNIN_DEFAULTS.password}
                        className="mt-1 w-full"
                    />
                </div>
                <SignInButton />
                {data.message != '' && data.success === false && (
                    <Alert variant="destructive">
                    <AlertCircle />
                    <AlertTitle className="font-bold">Something went wrong, please try again.</AlertTitle>
                        <AlertDescription>
                            <Badge variant={`outline`} className="px-4 mt-4">Hints:</Badge>
                            {
                                data.message.split('\n').map((line, idx) => (
                                    <div className="odd:font-bold even:border-1 even:border-amber-300 even:px-4 even:rounded-full" key={idx}>{line}</div>
                                ))
                            }
                    </AlertDescription>
                    </Alert>
                )}

                <div className="text-sm text-center">
                    <span className="text-muted-foreground">Don&apos;t have an account? </span>
                    <Button variant={'link'} className="p-0">
                        <a href="/sign-up" className="text-sm">Sign Up</a>  
                    </Button>
                </div>
                <div className="text-sm text-center">
                    <Button variant={'link'} className="p-0">
                        <a href="/forgot-password" className="text-sm">Forgot Password?</a>  
                    </Button>
                </div>
            </div>
        </form>
     );
}
 
export default SignInForm;