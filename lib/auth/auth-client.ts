import { createAuthClient } from "better-auth/react";

// CONNECTION BETWEEN NEXT.JS AND AUTH-CLIENT SERVER FOR CLIENT AUTHENTICATION OPERATIONS
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
})

export const {signIn, signUp, signOut, useSession} = authClient;