"use client"; // use as client for server action use

import { useState } from "react";
import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
// import { createClient } from "@/lib/supabase/server"; // create supabase client
import { Loader } from "lucide-react";

// group transactions method
import { groupAndSumTransactionsByDate } from "@/lib/utils";
import Button from "@/components/button";
import { fetchTransactions } from "@/lib/actions"; // use fetchtransactions function

// export default async function TransactionList() { // supabase client
// export default async function TransactionList({range}) { // supabase rpc
export default function TransactionList({ range, initialTransactions }) {
  // supabase server action

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
  // const supabase = await createClient(); // create client for supabase

  // use supabase client
  // const {data: transactions, error} =  await supabase // await data from client
  //   .from('transactions') // from transactions table
  //   .select('*') // select all columns
  //   .order('created_at', {ascending: false}) // order by created_at field for most recent transactions first

  // use supabase rpc function fetch transactions
  //   let { data: transactions, error } = await supabase
  //   .rpc('fetch_transactions', {
  //     // arg_limit,
  //     // arg_offset,
  //     arg_range: range
  //   })
  // if (error) throw new Error("We can't fetch transactions");

  // const grouped = groupAndSumTransactionsByDate(transactions); // use supabase rpc
  // const grouped = groupAndSumTransactionsByDate(initialTransactions); // use supabase server action
  const [transactions, setTransactions] = useState(initialTransactions); // use client and initialize transactions
  // const [offset, setOffset] = useState(initialTransactions.length); // set offset length from the initial transactions number but this usecase is buggy and shifts the result transactions on pagination
  const [showButton, setShowButton] = useState(
    initialTransactions.length !== 0
  ); // if no transactions hide load more button
  const [loading, setLoading] = useState(false); // set loading state
  const grouped = groupAndSumTransactionsByDate(transactions); // use client with supabase

  // load more button handler
  const handleClick = async () => {
    setLoading(true); // begin loading
    let getNextTransactions = null; // initalize get transactions
    try {
      // getNextTransactions = await fetchTransactions(range, offset, 10); // get the next 10 transactions with the offset state but this usecase is buggy and shifts the result transactions on pagination
      getNextTransactions = await fetchTransactions(range, transactions.length, 10); // dynamic offset to avoid buggy pagination shifting records
      setShowButton(getNextTransactions.length !== 0); // show button if there are transactions
      // setOffset((prevValue) => prevValue + 10); // add 10 to the previous offset value | with updater function add new state value to current state value
      setTransactions((prevTransactions) => [
        ...prevTransactions, // add previous transactions to the array with spread operator
        ...getNextTransactions, // add the next transactions to the array with spread operator
      ]);
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleRemoved = (id) => () => {
  // higher order function | function returns another function with arguments that doesnt immediately run
  setTransactions((prev) => // previous transactions
    [...prev].filter((t)  => // use spread operator to fill the array from the previous transactions 
      t.id !== id)); // return transactions and filter out the transaction that doesn't include the id from the argument
  }

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
                    <TransactionItem
                      {...transaction}
                      onRemoved={handleRemoved(transaction.id)} // handle the removed transaction
                    />
                  </div>
                ))}
              </section>
            </div>
          )
        )}
      {/* display message of no transactions found */}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No transactions found
        </div>
      )}
      {/* show button if there are transactions */}
      {showButton && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={handleClick}
            disabled={loading} // disabled if loading
          >
            <div className="flex items-center space-x-1">
              {/* display the loader if loading */}
              {loading && <Loader className="animate-spin" />}
              <div>Load More</div>
            </div>
          </Button>
        </div>
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
