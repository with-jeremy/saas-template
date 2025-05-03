import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

export default async function MainNav() {
  const { userId } = await auth();

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
      {/* Logo */}
      <div>
        <Link href="/" className="text-2xl font-bold" style={{ fontFamily: "cursive" }}>
          SaaS Users Template
        </Link>
      </div>

      {/* Nav Items */}
      <div className="flex space-x-6">
        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
          About
        </Link>
        <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
          Explore
        </Link>
      </div>

      {/* Auth Items */}
      <div>
        {userId ? (
          <Button>
            <Link href="/dashboard">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </Button>
        ) : (
          <SignInButton />
        )}
      </div>
    </nav>
  );
}