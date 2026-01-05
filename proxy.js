import { updateSession } from "./lib/supabase/middleware";
import { createClient } from "./lib/supabase/server";
// export async function middleware(request) { // ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
export async function proxy(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser(); // get the authendicated user getting a property 'user' of data as a variable

  // if no authendicated user and user is in dashboard redirect to login
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", request.url));
  }

  // if user is already authendicated and tries to login again redirect to dashboard
  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  return await updateSession(request); // use the updateSession function from supabase docs
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
