import { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useFormatCurrency } from "@/hooks/use-format-currency";

export default function FinancialIndicator({
  type, // income, investment, expense
  amount, // amount of the financial type
  prevAmount, // previous amount of the financial type to compair
}) {
  const colorClasses = {
    Income: "text-green-700 dark:text-green-300",
    Expense: "text-red-700 dark:text-red-300",
    Investment: "text-indigo-700 dark:text-indigo-300",
    Saving: "text-yellow-700 dark:text-yellow-300",
  };
  const calcPercentageChange = (amount, prevAmount) => {
    if (prevAmount === 0 || !prevAmount || !amount) return 0; // if prev ammount is 0 then return 0 else return the calculation
    return ((amount - prevAmount) / prevAmount) * 100;
  };

  // use memo to recalculate the ammount when either of amount or previous ammount change
  const percentageChange = useMemo(
    () => calcPercentageChange(amount, prevAmount).toFixed(0),
    [amount, prevAmount]
  );

  // calculate currency and return the string
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  // const formatCurrency = (amount) =>
  //   new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "EUR",
  //   }).format(amount);

  const formattedAmount = useFormatCurrency(amount);
  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>

      <div className="text-2xl font-semibold text-black dark:text-white mb-2">
        {/* {amount ? formatCurrency(amount) : formatCurrency(0)} */}
        {formattedAmount}
      </div>
      <div className="flex space-x-1 items-center text-sm">
        {percentageChange <= 0 && (
          <ArrowDownLeft className="text-red-700 dark:text-red-300" />
        )}
        {percentageChange > 0 && (
          <ArrowUpRight className="text-green-700 dark:text-green-300" />
        )}
        {percentageChange}% vs last period
      </div>
    </div>
  );
}
