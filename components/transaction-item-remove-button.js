'use client'

import { deleteTransaction } from "@/lib/actions"; // use delete server action
import Button from "./button";
import { X, Loader } from "lucide-react";
import { useState } from "react";

// export default function TransactionItemRemoveButton({ id }) {
//   return (
//     <Button size="xs" variant='ghost'
//       onClick={async () => {
//         await deleteTransaction(id); // call delete server action
//       }}
//     >
//       <X />
//     </Button>
//   );
// }

export default function TransactionItemRemoveButton({
  id, // transaction id
  onRemoved, // on removed transaction
}) {
  const [loading, setLoading] = useState(); // set loading state for delete
  const [confirmed, setConfirmed] = useState(); // set delete confirm state

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true); // confirm the deletion if not confirmed
      return;
    }

    try {
      setLoading(true); // beging loading
      await deleteTransaction(id); // delete the transaction
      // notify the parent
      onRemoved(); // on removed transaction
    } finally {
      setLoading(false); // stop loading
    }
  };
  return (
    <Button
      variant={!confirmed ? "ghost" : "danger"} // if confirmed use danger button
      onClick={handleClick}
      aria-disabled={loading} // disable button functionality on loading without changing the style
    >
      {/* display X if not loading */}
      {!loading && <X className="w-4 h-4" />}
      {/* display loading spinner if loading */}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
}
