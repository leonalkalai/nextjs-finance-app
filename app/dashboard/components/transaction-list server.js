import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { createClient } from "@/lib/supabase/server" // create supabase client

// group transactions method
import { groupAndSumTransactionsByDate } from "@/lib/utils";

export default async function TransactionList({range}) {

  // get from json server
  // const response = await fetch(`${process.env.API_URL}/transactions`,
  //   {
  //     next: {
  //       tags: ['transaction-list'] // as next cache data by default, add tags or paths for server revalidation | user should be added here
  //     }
  //   }
  // ); // get the API_URL value from the .env.local file
  // const transactions = await response.json();

  // console.log(groupAndSumTransactionsByDate(transactions));

  // get from supabase 
  // get database query getting data as transactions and error
  const supabase = await createClient(); // create client for supabase

  // use supabase client
  // const {data: transactions, error} =  await supabase // await data from client
  //   .from('transactions') // from transactions table
  //   .select('*') // select all columns
  //   .order('created_at', {ascending: false}) // order by created_at field for most recent transactions first

  // use supabase rpc function fetch transactions
    let { data: transactions, error } = await supabase
    .rpc('fetch_transactions', {
      // arg_limit,
      // arg_offset,
      arg_range: range
    })
  if (error) throw new Error("We can't fetch transactions")

  const grouped = groupAndSumTransactionsByDate(transactions);
  return (
    // <section className="space-y-4">
    //   {transactions.map(transaction => <div key={transaction.id}>
    //     {/* <TransactionItem type={transaction.type} category={transaction.category} description={transaction.description} amount={transaction.amount} /> */}
    //     <TransactionItem {...transaction} />
    //   </div>)}
    // </section>

    <div className="space-y-8">
      {Object.entries(grouped) // get the group object entries
        .map(
          (
            [date, { transactions, amount }] // get the date and the group object properties
          ) => (
            // set date as key
            <div key={date}>
              {/* pass the date and ammount to the TransactionSummaryItem */}
              <TransactionSummaryItem date={date} amount={amount} />
              {/* <hr className="my-4 border-gray-200 dark:border-gray-800" /> */}
              <Separator />
              <section className="space-y-4">
                {/* loop over the transactions amd display the TransactionItem */}
                {transactions.map((transaction) => (
                  <div key={transaction.id}>
                    {/* insert the TransactionItem properties */}
                    <TransactionItem {...transaction} />
                  </div>
                ))}
              </section>
            </div>
          )
        )}
    </div>
  );

  //   Object.entries(grouped) // get the group object entries
  //     .map(
  //       (
  //         [date, { transactions, amount }] // get the date and the group object properties
  //       ) => {
  //         // set date as key
  //         return (
  //           <div key={date}>
  //             <TransactionSummaryItem date={date} amount={amount} />
  //             <hr className="my-4 border-gray-200 dark:border-gray-800" />
  //             <section className="space-y-4">
  //               {/* loop over the transactions amd display the TransactionItem */}
  //               {transactions.map((transaction) => (
  //                 <div key={transaction.id}>
  //                   {/* insert the TransactionItem properties */}
  //                   <TransactionItem {...transaction} />
  //                 </div>
  //               ))}
  //             </section>
  //           </div>
  //         );
  //       }
  //     )
  // );

  //   Object.entries(grouped) // get the group object entries
  //     .map(
  //       (
  //         [date, { transactions, amount }] // get the date and the group object properties
  //       ) => (
  //         // set date as key
  //         <div key={date}>
  //           <TransactionSummaryItem date={date} amount={amount} />
  //           <hr className="my-4 border-gray-200 dark:border-gray-800" />
  //           <section className="space-y-4">
  //             {/* loop over the transactions amd display the TransactionItem */}
  //             {transactions.map((transaction) => (
  //               <div key={transaction.id}>
  //                 {/* insert the TransactionItem properties */}
  //                 <TransactionItem {...transaction} />
  //               </div>
  //             ))}
  //           </section>
  //         </div>
  //       )
  //     )
  // );
}
