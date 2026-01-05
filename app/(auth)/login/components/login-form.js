// use magic link
// "use client";

// import Button from "@/components/button";
// import Input from "@/components/input";
// import SubmitButton from "@/components/submit-button";  // deprecated: import useFormState hook
// import { login } from "@/lib/actions";
// import { useActionState } from "react"; // import useActionState instead of useFormStatus
// import { Loader } from "lucide-react";  // use useActionState instead of useFormStatus
// // import { useFormState } from "react-dom"; // deprecated: import useFormState hook

// // define initial form state
// const initialState = {
//   message: "",
//   error: false,
// };

// export default function LoginForm() {
//   // const [state, formAction, pending] = useActionState(login, null);  // use useActionState instead of useFormStatus
//   const [state, formAction, pending] = useActionState(login, initialState); // after ReactDOM.useFormState has been renamed to React.useActionState
//   // const [state, formAction] = useFormState(login, initialState); // deprecated: useFormState and set form initial state ReactDOM.useFormState has been renamed to React.useActionState.
//   return (
//     <form
//       //  action={login} // use useFormStatus instead of useActionState
//       action={formAction} // use useFormState
//       // action={formAction} // use useActionState instead of useFormStatus
//       className="space-y-2"
//     >
//       <Input
//         type="email"
//         placeholder="name@example.com"
//         name="email"
//         required
//       />

//       {/* use useActionState instead of useFormStatus */}
//       <Button
//         type="submit"
//         size="sm"
//         className="w-full flex items-center justify-center space-x-2"
//         disabled={pending}
//       >
//         {pending && <Loader className="animate-spin w-4 h-4" />}
//         <span>Sign in with email</span>
//       </Button>

//       {/* optional */}
//       {/* {state?.error && (
//         <p className="text-sm text-red-500">{state.error}</p>
//       )} */}

//       {/* deprecated: use useFormStatus instead of  useActionState*/}
//       {/* <SubmitButton
//         type="submit"
//         size="sm"
//         className="w-full" // use the classname prop
//       >
//         Sign in with email
//       </SubmitButton> */}
//       {state.message && (
//         <p
//           className={`${
//             state?.error ? "text-red-500" : "text-green-500"
//           } text-sm text-center`}
//         >
//           {state?.message}
//         </p>
//       )}
//     </form>
//   );
// }

// use password
// "use client";

// import Button from "@/components/button";
// import Input from "@/components/input";
// import { useActionState, useState } from "react";
// import { Loader } from "lucide-react";
// import Link from "next/link";
// import { forgotPassword, loginWithPassword } from "@/lib/actions";

// const initialState = {
//   message: "",
//   error: false,
// };

// export default function LoginForm() {
//   const [loginState, loginAction, loginPending] = useActionState(
//     loginWithPassword,
//     initialState
//   );

//   const [forgotState, forgotAction, forgotPending] = useActionState(
//     forgotPassword,
//     initialState
//   );

//   const [showForgot, setShowForgot] = useState(false);
//   const [email, setEmail] = useState("");

//   const toggleForgot = () => {
//     if (showForgot) {
//       // reset forgot state when closing
//       forgotAction(new FormData());
//     }
//     setShowForgot((prev) => !prev);
//   };

//   return (
//     <div className="space-y-4">
//       {/* LOGIN FORM */}
//       <form
//         action={loginAction}
//         className="space-y-3"
//         aria-busy={loginPending}
//       >
//         <label className="sr-only" htmlFor="email">
//           Email
//         </label>
//         <Input
//           id="email"
//           type="email"
//           name="email"
//           placeholder="name@example.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           autoComplete="email"
//         />

//         {/* Only show password input if forgot form is NOT visible */}
//         {!showForgot && (
//           <>
//             <label className="sr-only" htmlFor="password">
//               Password
//             </label>
//             <Input
//               id="password"
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               autoComplete="current-password"
//             />

//             {/* Sign in button */}
//             <Button
//               type="submit"
//               className="w-full flex items-center justify-center gap-2"
//               disabled={loginPending || forgotPending}
//             >
//               {loginPending && <Loader className="w-4 h-4 animate-spin" />}
//               <span>Sign in</span>
//             </Button>

//             {/* Only show login error if password input is visible */}
//             {loginState.error && (
//               <p role="alert" className="text-sm text-center text-red-500">
//                 {loginState.message}
//               </p>
//             )}
//           </>
//         )}
//       </form>

//       {/* FORGOT PASSWORD TOGGLE */}
//       <p className="text-sm text-center">
//         <button
//           type="button"
//           onClick={toggleForgot}
//           className="underline"
//           disabled={loginPending}
//           aria-expanded={showForgot}
//         >
//           Forgot your password?
//         </button>
//       </p>

//       {/* FORGOT PASSWORD FORM */}
//       {showForgot && (
//         <form
//           action={forgotAction}
//           className="space-y-2"
//           aria-busy={forgotPending}
//         >
//           {/* reuse SAME email */}
//           <input type="hidden" name="email" value={email} />

//           <Button
//             type="submit"
//             size="sm"
//             className="w-full flex items-center justify-center gap-2"
//             disabled={forgotPending || !email}
//           >
//             {forgotPending && <Loader className="w-4 h-4 animate-spin" />}
//             Send reset link
//           </Button>

//           {forgotState.message && (
//             <p
//               role="status"
//               className={`text-sm text-center ${
//                 forgotState.error ? "text-red-500" : "text-green-500"
//               }`}
//             >
//               {forgotState.message}
//             </p>
//           )}
//         </form>
//       )}

//       {/* SIGN UP */}
//       <p className="text-sm text-center">
//         Don’t have an account?{" "}
//         <Link href="/signup" className="underline">
//           Sign up
//         </Link>
//       </p>
//     </div>
//   );
// }

"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import PasswordInput from "@/components/password-input";
import { useActionState, useState } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";
import { forgotPassword, loginWithPassword } from "@/lib/actions";

const initialState = {
  message: "",
  error: false,
};

export default function LoginForm() {
  const [loginState, loginAction, loginPending] = useActionState(
    loginWithPassword,
    initialState
  );

  const [forgotState, forgotAction, forgotPending] = useActionState(
    forgotPassword,
    initialState
  );

  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");

  const toggleForgot = () => {
    if (showForgot) {
      // reset forgot state when closing
      forgotAction(new FormData());
    }
    setShowForgot((prev) => !prev);
  };

  return (
    <div className="space-y-4">
      {/* LOGIN FORM */}
      <form
        action={loginAction}
        className="space-y-3"
        aria-busy={loginPending}
      >
        <Input
          type="email"
          name="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        {/* Password + Sign in (hidden when forgot is active) */}
        {!showForgot && (
          <>
            <PasswordInput
              name="password"
              placeholder="Password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={loginPending || forgotPending}
            >
              {loginPending && <Loader className="w-4 h-4 animate-spin" />}
              Sign in
            </Button>

            {loginState.error && (
              <p role="alert" className="text-sm text-center text-red-500">
                {loginState.message}
              </p>
            )}
          </>
        )}
      </form>

      {/* FORGOT PASSWORD TOGGLE */}
      <p className="text-sm text-center">
        <button
          type="button"
          onClick={toggleForgot}
          className="underline"
          disabled={loginPending}
          aria-expanded={showForgot}
        >
          Forgot your password?
        </button>
      </p>

      {/* FORGOT PASSWORD FORM */}
      {showForgot && (
        <form
          action={forgotAction}
          className="space-y-2"
          aria-busy={forgotPending}
        >
          {/* reuse SAME email */}
          <input type="hidden" name="email" value={email} />

          <Button
            type="submit"
            size="sm"
            className="w-full flex items-center justify-center gap-2"
            disabled={forgotPending || !email}
          >
            {forgotPending && <Loader className="w-4 h-4 animate-spin" />}
            Send reset link
          </Button>

          {forgotState.message && (
            <p
              role="status"
              className={`text-sm text-center ${
                forgotState.error ? "text-red-500" : "text-green-500"
              }`}
            >
              {forgotState.message}
            </p>
          )}
        </form>
      )}

      {/* SIGN UP */}
      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}


