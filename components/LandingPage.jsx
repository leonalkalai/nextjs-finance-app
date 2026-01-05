import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import useServerDarkMode from "@/hooks/use-server-dark-mode";
import { Wallet, ArrowRight } from "lucide-react";
import LandingPageContent from "./LandingPageContent";

export default async function LandingPage() {
  const theme = await useServerDarkMode();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 w-full">
      {/* Navigation - Server Component */}
      <nav className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <Wallet className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Oikonomia
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center space-x-1 transition-colors"
            >
              <span>Go to App</span>
              <ArrowRight size={18} />
            </Link>
            <DarkModeToggle defaultMode={theme} />
          </div>
        </div>
      </nav>

      {/* Main Content + Footer - Client Component */}
      <LandingPageContent />
    </div>
  );
}
