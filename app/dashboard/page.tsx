export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-16 font-[var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-lg">Welcome to your dashboard!</p>
      </main>
      <footer className="flex gap-4 items-center">
        <a
          href="/sign-out"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        >
          Sign Out
        </a>
      </footer>
    </div>
  );
}