import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { getUserByClerkId, upsertUser } from "@/db/users";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

// Define server action for upserting user
async function syncUserData(formData: FormData) {
  "use server";

  const userData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    clerkUserId: formData.get("clerkUserId") as string,
  };

  await upsertUser(userData);
  redirect("/dashboard");
}

export default async function EditProfilePage() {
  const clerkUser = await currentUser();

  // Attempt to fetch user from Neon if Clerk user exists
  let neonUser = null;
  let newUser = null;
  if (clerkUser?.id) {
    try {
      newUser = {
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        clerkUserId: clerkUser.id,
      };
      neonUser = await getUserByClerkId(clerkUser.id);
      if (!neonUser) {
        neonUser = {
          firstName: "N/A",
          lastName: "N/A",
          email: "N/A",
          clerkUserId: "N/A",
        };
      }
    } catch (error) {
      console.error("Error fetching Neon user:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-16 font-[var(--font-geist-sans)]">
      <section className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold">Sync User Profile to the App!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Clerk User Data Column */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-indigo-600">
              Clerk User Data
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-medium">First Name:</span>{" "}
                <span>{newUser?.firstName}</span>
              </p>
              <p>
                <span className="font-medium">Last Name:</span>{" "}
                <span>{newUser?.lastName}</span>
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <span>{newUser?.email}</span>
              </p>
              <p>
                <span className="font-medium">Clerk User ID:</span>{" "}
                <span>{newUser?.clerkUserId}</span>
              </p>
            </div>
          </div>

          {/* Neon User Data Column */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-600">
              Our App User Data
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-medium">First Name:</span>{" "}
                <span>{neonUser?.firstName || "..."}</span>
              </p>
              <p>
                <span className="font-medium">Last Name:</span>{" "}
                <span>{neonUser?.lastName || "..."}</span>
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <span>{neonUser?.email || "..."}</span>
              </p>
              <p>
                <span className="font-medium">Clerk User ID:</span>{" "}
                <span>{neonUser?.clerkUserId || "..."}</span>
              </p>
            </div>
          </div>
        </div>

        {newUser && (
          <form action={syncUserData} className="mt-4">
            <input
              type="hidden"
              name="firstName"
              value={newUser.firstName || ""}
            />
            <input
              type="hidden"
              name="lastName"
              value={newUser.lastName || ""}
            />
            <input type="hidden" name="email" value={newUser.email || ""} />
            <input
              type="hidden"
              name="clerkUserId"
              value={newUser.clerkUserId || ""}
            />
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded"
            >
              Sync User Data to Database
            </Button>
          </form>
        )}
      </section>
    </div>
  );
}
