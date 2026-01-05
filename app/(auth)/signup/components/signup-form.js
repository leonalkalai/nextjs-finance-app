// "use client";

// import Button from "@/components/button";
// import Input from "@/components/input";
// import { signup } from "@/lib/actions";
// import { useActionState } from "react";
// import { Loader } from "lucide-react";
// import Link from "next/link";

// const initialState = {
//   message: "",
//   error: false,
// };

// export default function SignupForm() {
//   const [state, formAction, pending] = useActionState(signup, initialState);

//   return (
//     <form action={formAction} className="space-y-3">
//       <Input type="text" name="username" placeholder="Username" required />

//       <Input
//         type="email"
//         name="email"
//         placeholder="name@example.com"
//         required
//       />

//       <Input type="password" name="password" placeholder="Password" required />

//       <Button
//         type="submit"
//         className="w-full flex items-center justify-center gap-2"
//         disabled={pending}
//       >
//         {pending && <Loader className="w-4 h-4 animate-spin" />}
//         <span>Create account</span>
//       </Button>

//       {state.message && (
//         <p
//           className={`text-sm text-center ${
//             state.error ? "text-red-500" : "text-green-500"
//           }`}
//         >
//           {state.message}
//         </p>
//       )}

//       {/* Navigation */}
//       <p className="text-sm text-center">
//         Already have an account?{" "}
//         <Link href="/login" className="underline">
//           Sign in
//         </Link>
//       </p>
//     </form>
//   );
// }


"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import PasswordInput from "@/components/password-input";
import { signup } from "@/lib/actions";
import { useActionState } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";

const initialState = {
  message: "",
  error: false,
};

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <Input
        type="text"
        name="username"
        placeholder="Username"
        required
        autoComplete="username"
      />

      <Input
        type="email"
        name="email"
        placeholder="name@example.com"
        required
        autoComplete="email"
      />

      {/* Password with show / hide */}
      <PasswordInput
        name="password"
        placeholder="Password"
        autoComplete="new-password"
      />

      <Button
        type="submit"
        className="w-full flex items-center justify-center gap-2"
        disabled={pending}
      >
        {pending && <Loader className="w-4 h-4 animate-spin" />}
        <span>Create account</span>
      </Button>

      {state.message && (
        <p
          className={`text-sm text-center ${
            state.error ? "text-red-500" : "text-green-500"
          }`}
        >
          {state.message}
        </p>
      )}

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
