"use client";
import React from 'react'
import { Card, CardHeader , CardTitle , CardDescription, CardContent, CardFooter} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from "react";
import { signIn } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';



const SignIn = () => {

     // STATE TO KEEP TRACK OF SIGNUP FORM VALUES (FOR SIGN-UP AUTHENTICATION)
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
                const result = await signIn.email({
                    email,
                    password,
                });
    
                // LOGIC THAT GIVES USERS ACCESS TO DASHBOARD AFTER SIGN UP
                if (result.error) {
                    setError(result.error.message ?? "failed to sign In")
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
        {/* SIGN-IN CARD WITH SHADCN COMPONENTS */}
        <Card className='w-full max-w-md border-gray-200 shadow-lg'>
            <CardHeader  className="space-y-1">
                <CardTitle className="text-2xl font-bold text-black">Sign In</CardTitle>
                <CardDescription className="text-gray-600">Enter Your neccessary credentials to access your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardContent className="space-y-4">
                     {/* DISPLAYS ERROR BOX IF THERE IS A VALUE TO THE ERROR STATE */}
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                    {/* EMAIL */}
                    <div className='space-y-2'>
                        <Label htmlFor='email'  className="text-gray-700">Email</Label>
                        <Input 
                            id="email" 
                            type="text" 
                            placeholder='Precise@example.com' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required className="border-gray-300 focus:border-primary focus:ring-primary" 
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className='space-y-2'>
                        <Label htmlFor='password'  className="text-gray-700">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder='Enter your unique password' 
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
                        {loading ? "Signing In..." : "Sign In"} {/*DISPLAY Sign In... WHILE LOADING IS TRUE ELSE DISPLAY Sign In*/}
                    </Button>
                    <p className="text-center text-sm text-gray-600">Don't have an account? <Link href={"/sign-up"} className="font-medium text-primary hover:underline">Sign Up</Link></p>
                </CardFooter>
            </form>
        </Card>
    </div>
  )
}

export default SignIn