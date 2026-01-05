import { createClient } from "@/lib/supabase/server"; // import supabase client
import TransactionForm from "@/app/dashboard/components/transaction-form";
import { notFound } from "next/navigation"; // import not found

// use metadata
export const metadata = {
  title: "Edit Transaction",
};

// export default async function Page({ params: { id } }) { // nest the id variable to the params object but buggy turbopack for nextjs16
// nest the id variable to the params object

export default async function Page({ params }) {
  const { id } = await params;
  console.log(id);
  const supabase = await createClient(); // create supabase client
  const { data: transaction, error } = await supabase // alias data to transaction
    .from("transactions") // get from transactions table
    .select("*") // select all columns
    .eq("id", id) // that table id is the params id
    .single(); // get single value

  if (error || !transaction) {
    notFound();
  }

  console.log(transaction);
  return (
    // <div>
    //   <h1>Transaction #{transaction.id}</h1>
    //   <p>Amount: {transaction.amount}</p>
    //   <p>Type: {transaction.type}</p>
    //   <p>Date: {transaction.created_at}</p>
    // </div>
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
}
