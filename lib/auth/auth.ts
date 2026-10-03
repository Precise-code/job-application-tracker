import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();


// CREATING AN INSTANCE OF BETTER AUTH
export const auth = betterAuth({
  database: mongodbAdapter(db, {client,}), // SPECIFYING DATABASE TYPE TO BETTER AUTH
    session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {enabled: true,}, // SIGNIN AUTHENTICATION TYPE
  trustedOrigins: [
    "https://precise-quest.vercel.app",
    "http://localhost:3000",
  ],
  databaseHooks: {user: {create: {after: async (user) => {if (user.id) {await initializeUserBoard(user.id)}}}}}, // CALL THE INITIALIZE USER BOARD FUNCTION WHEN USER IS DONE CREATING ACCOUNT TO SHOW DEFAULT BOARD
  logger: { level: "debug" },
});

// DETECT IF A USER IS LOGGED IN TO RENDER APPROPRIATE UI 
export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  }
  ); // RETURNS JSON OF LOGGED IN USER DETAILS

  return result; // ELSE RETURN NULL DATA IF USER NOT LOGGED IN
}

// HELPS USERS SIGNOUT OF APPLICATION
export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  }
  ); 

  if (result.success) {
    redirect("/sign-in");
  } // REDIRECT USER TO SIGN IN PAGE IF SIGNOUT IS SUCCESSFUL
}