"use client";
import React from 'react'
import { Card, CardHeader , CardTitle , CardDescription, CardContent, CardFooter} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from "react";
import { signUp } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';



const SignUp = () => {

    // STATE TO KEEP TRACK OF SIGNUP FORM VALUES (FOR SIGN-UP AUTHENTICATION)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // STATE FOR HANDLING ERROR AND LOADING (FOR SIGN-UP AUTHENTICATION)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // NEXT ROUTER FOR AUTOMATICALLY NAVIGATING AND REDIRECTING
    const router = useRouter();

    // FUNCTION THAT RUNS WHENEVER THE FORM IS SUBMITTED (FOR SIGN-UP AUTHENTICATION)
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setError("")
        setLoading(true);

        try {
            const result = await signUp.email({
                name,
                email,
                password,
            });

            // LOGIC THAT GIVES USERS ACCESS TO DASHBOARD AFTER SIGN UP
            if (result.error) {
                setError(result.error.message ?? "failed to sign up")
            } else {
                router.push("/dashboard");
            }

        } catch (err) {
            setError("An unexpected error occurred")
        } finally {
            setLoading(false);
        }
    }



  return (
    <div className='flex min-h-[calc(100vh-4rem)]  items-center justify-center bg-white p-4'>
        {/* SIGN-UP CARD WITH SHADCN COMPONENTS */}
        <Card className='w-full max-w-md border-gray-200 shadow-lg'>
            <CardHeader  className="space-y-1">
                <CardTitle className="text-2xl font-bold text-black">Sign Up</CardTitle>
                <CardDescription className="text-gray-600">Create an account to start tracking your job applications</CardDescription>
            </CardHeader>
            <form  onSubmit={handleSubmit} className="space-y-4">
                <CardContent className="space-y-4">
                        {/* DISPLAYS ERROR BOX IF THERE IS A VALUE TO THE ERROR STATE */}
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                    {/* NAME */}
                    <div className='space-y-2'>
                        <Label htmlFor='name' className="text-gray-700">Name</Label>
                        <Input 
                            id="name" 
                            type="text" 
                            placeholder='Precise Egbo' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required className="border-gray-300 focus:border-primary focus:ring-primary" 
                        />
                    </div>

                    {/* EMAIL */}
                    <div className='space-y-2'>
                        <Label htmlFor='email'  className="text-gray-700">Email</Label>
                        <Input 
                            id="email" 
                            type="text" 
                            placeholder='Precise@example.com' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className="border-gray-300 focus:border-primary focus:ring-primary" 
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className='space-y-2'>
                        <Label htmlFor='password'  className="text-gray-700">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder='Create your unique password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            minLength={8} 
                            className="border-gray-300 focus:border-primary focus:ring-primary" 
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button 
                        type='submit' 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={loading} // USER CAN'T KEEP CLICKING IF LOADING IS TRUE
                    >
                        {loading ? "Creating account..." : "Sign Up"} {/*DISPLAY Creating Account... WHILE LOADING IS TRUE ELSE DISPLAY Sign Up*/}
                    </Button>
                    <p className="text-center text-sm text-gray-600">Already have an account? <Link href={"/sign-in"} className="font-medium text-primary hover:underline">Sign In</Link></p>
                </CardFooter>
            </form>
        </Card>
    </div>
  )
}

export default SignUp