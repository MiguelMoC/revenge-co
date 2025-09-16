'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SIGN_UP_DEFAULTS } from "@/lib/constants";
import { signUpUser } from "@/lib/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false, message: '', 
    });

    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callbackUrl') || '/';

    const SignInButton = () => {
        const status = useFormStatus();        
        return <Button disabled={ status.pending } className="w-full">
                { status.pending ? 'Creating Account...' : 'Sign Up' }
            </Button>
    }
    return ( 
        <form action={action}
            className="space-y-6">
            <input type="hidden" name="callbackUrl" value={callbackURL} />
            <div className="space-y-6">
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                        id='name'
                        name='name'
                        type='text'
                        autoComplete='name'
                        defaultValue={SIGN_UP_DEFAULTS.name || data.name }
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        defaultValue={SIGN_UP_DEFAULTS.email || data.email}
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
                        defaultValue={SIGN_UP_DEFAULTS.password}
                        className="mt-1 w-full"
                    />
                </div><div>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        autoComplete='confirmPassword'
                        defaultValue={SIGN_UP_DEFAULTS.password}
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
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Button variant={'link'} className="p-0">
                        <a href="/sign-in" className="text-sm">Sign In</a>  
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
 
export default SignUpForm;