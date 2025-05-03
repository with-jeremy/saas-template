"use server";

import { db } from "@/db/index";
import { users, type User, type NewUser } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get a user by their Clerk ID
 */
export async function getUserByClerkId(
  clerkId: string
): Promise<User | undefined> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkId));
  return result[0];
}

/**
 * Create or update a user based on their Clerk ID
 */
export async function upsertUser({
  clerkUserId,
  firstName,
  lastName,
  email,
}: Pick<NewUser, "clerkUserId" | "firstName" | "lastName" | "email">): Promise<User> {
  const existingUser = await getUserByClerkId(clerkUserId);

  if (existingUser) {
    // Update existing user
    const [updatedUser] = await db
      .update(users)
      .set({
        firstName,
        lastName,
        email,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkUserId, clerkUserId))
      .returning();

    return updatedUser;
  } else {
    // Insert new user
    const [newUser] = await db
      .insert(users)
      .values({
        clerkUserId,
        firstName,
        lastName,
        email,
      })
      .returning();

    return newUser;
  }
}
