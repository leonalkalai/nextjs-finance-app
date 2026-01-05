import MainFinancialIndicator from "@/components/financial-indicator";
import { createClient } from "@/lib/supabase/server"; // import supabase client

export default async function DashboardFinancialIndicator({ type, range }) {
  // json fake API
  // const response = await fetch(`${process.env.API_URL}/indicators/${type}`); // get the API_URL value from the .env.local file
  // const {amount, prevAmount} = await response.json();

  // supabase
  const supabase = await createClient(); // call the supabase client
  // use rpc remote procedure call to an API , call procedures or functions from a remote server
  let { data, error } = await supabase.rpc("calculate_total", {
    arg_range: range, // pass the range to the range_type
    arg_type: type, // pass the type to the arg_type
  });

  if (error) throw new Error("Could not fetch the financial data");

  console.log("Supabase RPC result:", { data, error });

  // const amount = data ?? 0; // set amount from data value and if null set to 0
  // const prevAmount = amount - 50; // test the prev amount

  // const amounts = data[0];
  // const amounts = data?.[0] ?? { current_amount: 0, previous_amount: 0 };
  const { current_amount, previous_amount } = data?.[0] ?? {
    current_amount: 0,
    previous_amount: 0,
  };

  return (
    <MainFinancialIndicator
      type={type}
      // amount={amount}
      // prevAmount={prevAmount}
      // amount={amounts.current_amount}
      // prevAmount={amounts.previous_amount}
      amount={current_amount}
      prevAmount={previous_amount}
    />
  );
}
