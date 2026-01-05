"use client";

import Link from "next/link";
import {
  ArrowRight,
  Wallet,
  BarChart3,
  PieChart,
  Shield,
  TrendingUp,
} from "lucide-react";

export default function LandingPageContent() {
  return (
    <>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Track Your Personal Finances
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              A simple, beautiful dashboard to track your income, expenses, and
              savings. Sign up for free and start managing your money today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <Wallet size={24} />
                <span>Sign Up Free</span>
                <ArrowRight size={24} />
              </Link>

              <Link
                href="/dashboard"
                className="border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
              >
                Sign In
              </Link>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
              No credit card required • Your data is private and secure
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              How Oikonomia Works
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    1
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Create Account
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Sign up with your email in seconds. No complicated forms.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    2
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Add Transactions
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Quickly log your income and expenses with our simple
                  interface.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    3
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  See Insights
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Get clear visualizations of your spending and saving patterns.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Everything You Need
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <BarChart3
                      className="text-blue-600 dark:text-blue-400"
                      size={20}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Expense Tracking
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Categorize and track every expense. Set monthly budgets and
                  get alerts.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <TrendingUp
                      className="text-green-600 dark:text-green-400"
                      size={20}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Income Management
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Log all income sources and track your earning trends over
                  time.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <PieChart
                      className="text-purple-600 dark:text-purple-400"
                      size={20}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Visual Reports
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Beautiful charts and graphs to visualize your financial
                  health.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <Shield
                      className="text-red-600 dark:text-red-400"
                      size={20}
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Secure & Private
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Your financial data is encrypted and protected. We never share
                  your information.
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Start Managing Your Money Better Today
            </h3>
            <p className="text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
              Join others who have taken control of their finances with our
              simple, powerful tool.
            </p>

            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-3 bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 dark:hover:bg-white transition-colors shadow-2xl"
            >
              <Wallet size={24} />
              <span>Get Started For Free</span>
              <ArrowRight size={24} />
            </Link>

            <p className="text-blue-200 dark:text-blue-300 text-sm mt-6">
              Already have an account?{" "}
              <Link
                href="/dashboard"
                className="underline hover:text-white dark:hover:text-gray-200 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer - Now inside the client component */}
      <footer className="mt-20 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
            Oikonomia
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            A personal finance tracking application • Made with Next.js
          </p>
          <p className="text-xs mt-4 text-gray-500 dark:text-gray-400">
            This is a functional demo application. Real users can register and
            use all features.
          </p>
        </div>
      </footer>
    </>
  );
}
