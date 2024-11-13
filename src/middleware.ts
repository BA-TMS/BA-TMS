import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@util/supabase/middleware';
import { createSupabaseServerClient } from '@util/supabase/server';

// old code just handling supabase middleware
// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

// Specify protected and public routes
// NOTE: some pages may move or be renamed

const protectedRoutes = [
  '/',
  '/dashboard',
  '/dispatch',
  '/carriers',
  '/customers',
  '/drayage',
  '/other-numbers',
  '/preferences',
  '/third-party',
  '/settings',
];
const publicRoutes = ['/login', '/signup'];

export default async function middleware(request: NextRequest) {
  // check if the current route is protected or public
  const path = request.nextUrl.pathname;
  // handle routes nested under dashboard
  const isProtectedRoute =
    protectedRoutes.includes(path) || path.startsWith('/dashboard');
  const isPublicRoute = publicRoutes.includes(path);

  // update session using supabase middleware- do we need?
  await updateSession(request);

  // checking for a user
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Redirect to / if the user is authenticated
  // / will redirect to /dashboard (see next.config)
  if (isPublicRoute && user && !request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
