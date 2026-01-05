export const groupAndSumTransactionsByDate = (transactions) => {
  const grouped = {}; // create a new object grouped
  for (const transaction of transactions) {
    const date = transaction.created_at.split("T")[0]; // split date from time for the date value and keep date
    if (!grouped[date]) {
      // check if date property in group object doesnt exist
      grouped[date] = { transactions: [], amount: 0 }; // create an group date atribute with object having empty transactions array and amount 0
    }
    grouped[date].transactions.push(transaction); // else push the transaction inside the existing group date property
    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount; // case income adds to balance , case exprense subtract from balance
    grouped[date].amount += amount; // add the amount to the grouped indexed by date
  }
  return grouped; // return group object
};