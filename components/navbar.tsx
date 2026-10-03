"use client"

import React from 'react'
import {Briefcase} from "lucide-react";
import Link from 'next/link';
import { Button } from './ui/button';
import { DropdownMenu , DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import SignOutbutton from './sign-out-btn';
import { useSession } from '@/lib/auth/auth-client';
import Image from "next/image";

const Navbar = () => {
    const {data: session} = useSession()

  return (
    <nav className='border-b border-gray-200 bg-white'>
        <div className='container mx-auto flex h-16 items-center px-4 justify-between'>
            <Link href="/" className='flex items-center gap-2 text-xl font-semibold text-primary'>
             <Image src={"/hero-images/Precise-quest-logo.png"} width={50} height={50} alt='Precise-Quest-Logo'/>
             Precise Quest
            </Link>

            <div className='flex items-center gap-4'>
                {session?.user ? ( // CHECK IF SESSION.USER IS NOT NULL AND RENDER LOGGED IN NAVBAR UI ELSE RENDER NOT LOGGED IN UI
                // LOGGED IN UI
                <>
                    {/* DASHBOARD NAV LINK */}
                    <Link href="/dashboard">
                    <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-black"
                    >
                    Dashboard
                    </Button>
                    </Link>

                    {/* USER PROFILE DROPDOWN */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full outline-none">                      
                            <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-white">
                                {session.user.name[0].toUpperCase()}
                            </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {session.user.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.user.email}
                            </p>
                            </div>
                        </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <SignOutbutton />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
                ) : (
                // NOT LOGGED IN UI
                <>
                    <Link href="/sign-in" className='text-grey-700 hover:text-black'>
                    <Button variant="ghost" className='text-grey-700 hover:text-black'>Log In </Button>
                    </Link>
                    <Link href="/sign-up">
                    <Button className='bg-primary hover:bg-primary/90'>Start for free</Button>
                    </Link>
                </>)}
            </div>
        </div>
    </nav>
  )
}

export default Navbar