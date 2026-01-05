import { Suspense } from "react";
import TransactionListFallback from "@/components/transaction-list-fallback";
// import TransactionList from "./components/transaction-list"; // supabase client and rpc
import DashboardFinancialIndicator from "./components/financial-indicator";
import FinancialIndicatorFallback from "./components/financial-indicator-fallback";
// import FinancialIndicator from "@/components/financial-indicator";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { createClient } from "@/lib/supabase/server"; // create supabase client
import { ErrorBoundary } from "react-error-boundary"; // import error boundary to display errors in nested components
import { types } from "@/lib/constants"; // import the types
import Range from "./components/range";
import TransactionListWrapper from "./components/transaction-list-wrapper"; // use supabase server action

export default async function Page({ searchParams }) {
  // pass { searchParams } that makes page dynamic
  //console.log("searchParams:", searchParams);
  // const client = await createClient(); // create client for supabase

  // console.log(
  //  'supabase data: ',
  //   await client. // await data from client
  //   from('transactions'). // from transactions table
  //   select() // select all
  // )

  const params = await searchParams;
  // const range = params?.range ?? "last30days";

  const supabase = await createClient();
  // const { data, error } = await supabase.auth.getUser();
  // const {
  //   data: {
  //     // get user data
  //     user: { user_metadata: settings }, // get user metadata aliased as settings
  //   },
  //   error,
  // } = await supabase.auth.getUser();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log("Supabase auth error:", error.message);
  }
  // const user = data?.user;

  // if (!user) {
  //   console.log("No user logged in");
  //   // Optionally redirect to login
  //   //redirect("/login");
  // } else {
  //   console.log("This is the client user: ", user);
  // }

  if (!user) {
    console.log("No user logged in");
    // Optionally redirect to login
    // redirect("/login");
    return; // or handle the non-authenticated case
  }

  console.log("This is the client user: ", user);

  const settings = user.user_metadata;

  const range = params?.range ?? settings?.defaultView ?? "last30days"; // range value is set from searchparams, if nothing selected then the value is the settings defaultView else last 30 days

  return (
    <div className="space-y-8">
      <section className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          {/* <Range /> */}
          <Range defaultView={settings?.defaultView} />
        </aside>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {/* <FinancialIndicator amount={3000} prevAmount={4000} type="Income" />
        <FinancialIndicator amount={3000} prevAmount={4000} type="Expense" />
        <FinancialIndicator amount={3000} prevAmount={4000} type="Saving" />
        <FinancialIndicator amount={3000} prevAmount={4000} type="Investment" /> */}

        {/* <Suspense fallback={<FinancialIndicatorFallback />}>
          <DashboardFinancialIndicator type="Income" />
        </Suspense>
        <Suspense fallback={<FinancialIndicatorFallback />}>
          <DashboardFinancialIndicator type="Expense" />
        </Suspense>
        <Suspense fallback={<FinancialIndicatorFallback />}>
          <DashboardFinancialIndicator type="Saving" />
        </Suspense>
        <Suspense fallback={<FinancialIndicatorFallback />}>
          <DashboardFinancialIndicator type="Investment" />
        </Suspense> */}

        {/* loop of DashboardFinancialIndicators based on types array and controlled by ErrorBoundary   */}
        {types.map((type) => (
          <ErrorBoundary
            key={type}
            fallback={
              <div className="text-red-500">
                Cannot fetch {type} financial data
              </div>
            }
          >
            <Suspense fallback={<FinancialIndicatorFallback />}>
              <DashboardFinancialIndicator type={type} range={range} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </section>

      {/* add a transaction */}
      <section className="flex justify-between items-center">
        <h2 className="text-2xl">Transactions</h2>
        <Link
          href="/dashboard/transaction/add"
          className={`flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`}
        >
          <PlusCircle className="w-4 h-4" />
          <div>Add</div>
        </Link>
      </section>

      {/* <TransactionList /> */}
      <Suspense fallback={<TransactionListFallback />}>
        {/* <TransactionList /> supabase client
        {/* <TransactionList range={range}/> supabase rpc */}
        {/* supabase server action */}
        <TransactionListWrapper range={range} />
      </Suspense>
    </div>
  );
}
