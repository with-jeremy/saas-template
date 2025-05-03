import { requireDatabaseUser } from "@/lib/auth-guards";

export default async function DashboardPage() {
  // This will automatically redirect if user doesn't exist in DB
  const { dbUser } = await requireDatabaseUser();
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {dbUser.firstName}!</p>
      {/* Rest of your dashboard */}
    </div>
  );
}