import { fetchTransactions } from "@/lib/actions";
import TransactionList from "./transaction-list";

export default async function TransactionListWrapper({ range }) {
  const transactions = await fetchTransactions(range); // use fetchtransactions server action
  console.log('transactions:',transactions)
  return (
    <TransactionList
      initialTransactions={transactions} // use prop initialTransactions
      key={range} // use range as key value to trigger the update
      range={range} // pass the range prop
    />
  );
}
