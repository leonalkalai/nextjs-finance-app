// "use client";

// import { useActionState } from "react";
// import { createClient } from "@/lib/supabase/client";
// import Button from "@/components/button";
// import Input from "@/components/input";
// import { Loader } from "lucide-react";

// const initialState = {
//   error: false,
//   message: "",
// };

// async function resetPasswordAction(prevState, formData) {
//   const password = formData.get("password");
//   const confirm = formData.get("confirm");

//   if (password !== confirm) {
//     return { error: true, message: "Passwords do not match" };
//   }

//   const supabase = await createClient();

//   const { error } = await supabase.auth.updateUser({ password });

//   if (error) {
//     return { error: true, message: error.message };
//   }

//   return {
//     error: false,
//     message: "Password updated successfully. You can now log in.",
//   };
// }

// export default function ResetPasswordPage() {
//   const [state, action, pending] = useActionState(
//     resetPasswordAction,
//     initialState
//   );

//   return (
//     <main className="max-w-sm mx-auto mt-20 space-y-4">
//       <h1 className="text-xl font-semibold text-center">Reset your password</h1>

//       <form action={action} className="space-y-3" aria-busy={pending}>
//         <label htmlFor="password" className="sr-only">
//           New password
//         </label>

//         <Input
//           id="password"
//           type="password"
//           name="password"
//           placeholder="New password"
//           required
//           autoComplete="new-password"
//         />

//         <label htmlFor="confirm" className="sr-only">
//           Confirm password
//         </label>

//         <Input
//           id="confirm"
//           type="password"
//           name="confirm"
//           placeholder="Confirm new password"
//           required
//           autoComplete="new-password"
//         />

//         <Button
//           type="submit"
//           className="w-full flex items-center justify-center gap-2"
//           disabled={pending}
//         >
//           {pending && <Loader className="w-4 h-4 animate-spin" />}
//           Update password
//         </Button>

//         {state.message && (
//           <p
//             role="status"
//             className={`text-sm text-center ${
//               state.error ? "text-red-500" : "text-green-500"
//             }`}
//           >
//             {state.message}
//           </p>
//         )}
//       </form>
//     </main>
//   );
// }

"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/button";
import PasswordInput from "@/components/password-input";
import { Loader } from "lucide-react";
import Link from "next/link";

const initialState = {
  error: false,
  message: "",
};

async function resetPasswordAction(prevState, formData) {
  const password = formData.get("password");
  const confirm = formData.get("confirm");

  if (password !== confirm) {
    return { error: true, message: "Passwords do not match" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: true, message: error.message };
  }

  return {
    error: false,
    message: "Password updated successfully. You can now log in.",
  };
}

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const [linkError, setLinkError] = useState(null);

  const [state, action, pending] = useActionState(
    resetPasswordAction,
    initialState
  );

  /* 🔐 expired / invalid reset link check */
  useEffect(() => {
    const code = params.get("error_code");

    if (code === "otp_expired") {
      setLinkError(
        "This reset link has expired or has already been used. Please request a new one."
      );
    }
  }, [params]);

  /* ❌ Expired link UI */
  if (linkError) {
    return (
      <main className="max-w-sm mx-auto mt-20 space-y-4 text-center">
        <h1 className="text-xl font-semibold">Reset link expired</h1>

        <p role="alert" className="text-sm text-red-500">
          {linkError}
        </p>

        <Link href="/login" className="underline text-sm">
          Back to login
        </Link>
      </main>
    );
  }

  /* ✅ Reset password form */
  return (
    <main className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-semibold text-center">
        Reset your password
      </h1>

      <form action={action} className="space-y-3" aria-busy={pending}>
        <PasswordInput
          name="password"
          placeholder="New password"
          autoComplete="new-password"
          required
        />

        <PasswordInput
          name="confirm"
          placeholder="Confirm new password"
          autoComplete="new-password"
          required
        />

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2"
          disabled={pending}
        >
          {pending && <Loader className="w-4 h-4 animate-spin" />}
          Update password
        </Button>

        {state.message && (
          <p
            role="status"
            className={`text-sm text-center ${
              state.error ? "text-red-500" : "text-green-500"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>

      {state.message && !state.error && (
        <p className="text-sm text-center">
          <Link href="/login" className="underline">
            Go to login
          </Link>
        </p>
      )}
    </main>
  );
}


