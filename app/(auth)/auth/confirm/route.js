
// import { createClient } from "@/lib/supabase/server";
// import { NextResponse } from "next/server"; // import NextResponse

// export async function GET(request) { // use get Http method
//   // opt out of caching using request object
//   // test endpoint
//   //   return NextResponse.json({
//   //     name: "Leon Kountouras"
//   //   })
//   const { searchParams } = new URL(request.url); // create url object from request.url to get access to searchParams
//   const token_hash = searchParams.get("token_hash"); // url token needs to be same with supabase token
//   const type = searchParams.get("type"); // operation type signin or signup
//   const next = searchParams.get("next") ?? "/"; // redirect the uder to the specific path after login else to route if no specific path provided
//   const redirectTo = request.nextUrl.clone(); // redirect tool is cloning the object

//   // prepare url to redirect
//   redirectTo.pathname = next; // set pathname to the object
//   redirectTo.searchParams.delete("token_hash"); // delete token hash from search parameters not needed for protected signin page
//   redirectTo.searchParams.delete("type"); // delete type from search parameters not needed for protected signin page

//   if (token_hash && type) { // if token and type is provided
//     const supabase = await createClient(); // create supabase client
//     const { error } = await supabase.auth.verifyOtp({ // use verify auth one time password to make sure this is a proper token for the operation
//       type,
//       token_hash,
//     });
//     // if no error occurs supabase sets data inside cookies that will be sended through the requests
//     // supabase on server and client side is authendicated
//     if (!error) {
//       redirectTo.searchParams.delete("next"); 
//       return NextResponse.redirect(redirectTo); // redirects to the page
//     }
//   }
//   // if the operation fails return the user to an error page with some instructions
//   redirectTo.pathname = "/error";
//   return NextResponse.redirect(redirectTo);
// }


// Nextjs16 with supabase 
// import { createClient } from '@/lib/supabase/server';
// import { redirect } from 'next/navigation';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const token_hash = searchParams.get('token_hash');
//   const type = searchParams.get('type');
//   const nextParam = searchParams.get('next') ?? '/';

//   if (token_hash && type) {
//     const supabase = await createClient();
//     const { error } = await supabase.auth.verifyOtp({ token_hash, type });

//     if (!error) {
//       redirect(nextParam); // ✅ Redirect μετά το verify
//     }
//   }

//   redirect('/auth/auth-code-error');
// }

// app/(auth)/auth/confirm/route.js
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type'); // usually "email"
  const nextParam = searchParams.get('next') ?? '/';
  const nextRoute = nextParam.startsWith('http') ? new URL(nextParam).pathname : nextParam;

  if (!token_hash || !type) {
    // No token or type => invalid request
    return redirect('/auth/auth-code-error');
  }

  // Create server-side Supabase client
  const supabase = await createClient();

  // Verify OTP / magic link
  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type,
  });

  if (error) {
    // Only redirect to error if verification actually failed
    return redirect('/auth/auth-code-error');
  }

  // OTP verified successfully, session is now persisted via cookies
  return redirect(nextRoute); // go to home or next
}





