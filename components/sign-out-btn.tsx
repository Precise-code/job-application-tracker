"use client"
import React from 'react'
import { DropdownMenuItem , DropdownMenuGroup } from './ui/dropdown-menu';
import { signOut } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';


const SignOutbutton = () => {
    const router = useRouter();
  return (
    <DropdownMenuGroup className={"py-2"}>
        <DropdownMenuItem onClick= {async () => {
            const result = await signOut();
            if (result.data) {
                router.push("/sign-in") // REDIRECT USER TO SIGN IN PAGE IF SIGNOUT IS SUCCESSFUL
            } else {
                alert("Error signing out")
            }
            
        }} 
            className={"py-2"}>
            Log out
        </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}

export default SignOutbutton