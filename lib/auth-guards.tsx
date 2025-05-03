import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/db/users";
import { redirect } from "next/navigation";

export async function requireDatabaseUser() {
  // Get the authenticated Clerk user
  const clerkUser = await currentUser();
  
  // If no user is authenticated at all, redirect to sign-in
  if (!clerkUser) {
    redirect("/sign-in");
  }
  
  // Check if user exists in your database
  const dbUser = await getUserByClerkId(clerkUser.id);
  
  // If no database user found, redirect to edit-profile
  if (!dbUser) {
    redirect("/edit-profile");
  }
  
  return { clerkUser, dbUser };
}