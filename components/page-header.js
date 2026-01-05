import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import useServerDarkMode from "@/hooks/use-server-dark-mode";
import { createClient } from "@/lib/supabase/server";
import { CircleUser, KeyRound } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import SignOutButton from "./sign-out-button";
import Avatar from "./avatar";

export default async function PageHeader({ className }) {
  const theme = await useServerDarkMode();

  const supabase = await createClient(); // create supabase client
  const getUser = await supabase.auth.getUser(); // get user
  const {
    data: { user },
    error,
  } = getUser; // get user and error if exist

  console.log(user);
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>

      <div className="flex items-center space-x-4">
        <DarkModeToggle defaultMode={theme} />
        {/* simple button */}
        {/* {user && (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <CircleUser className="w-6 h-6" />
            <span>{user?.email}</span>
          </Button>
        )} */}

        {/* link to dashboard */}
        {user && (
          <Link
            href="/dashboard/settings"
            className={`flex items-center space-x-1 ${variants["ghost"]} ${sizes["sm"]}`}
          >
            {/* <CircleUser className="w-6 h-6" /> */}
            <Avatar />
            {/* <span>{user?.email}</span> */}
            {/* if user exists display user metadata fullname else display user email  */}
            {/* <span>{user?.user_metadata?.fullName ?? user?.email}</span> this doesnt check for empty string and doesnt work fully */}
            {/* {user?.user_metadata?.fullName ? user.user_metadata.fullName : user?.email} this is working fine */}
            {/* <span>{user?.user_metadata?.fullName || user?.email} </span> this is working because it checks for any falsy value */}
            <span>{user?.user_metadata?.fullName || user?.email}</span>
          </Link>
        )}
        {/* if user then signout */}
        {user && <SignOutButton />}
        {/* if not user then signin */}
        {!user && (
          <Link href="/login" className={`${variants["ghost"]} ${sizes["sm"]}`}>
            <KeyRound className="w-6 h-6" />
          </Link>
        )}
      </div>
    </header>
  );
}
