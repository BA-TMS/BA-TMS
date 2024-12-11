import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@util/supabase/middleware';
import { createSupabaseServerClient } from '@util/supabase/server';

// Specify protected and public routes
// NOTE: some pages may move or be renamed

const protectedRoutes = [
  '/',
  '/carriers',
  '/customers',
  '/dashboard',
  '/dispatch',
  '/drayage',
  '/drivers',
  '/other-numbers',
  '/preferences',
  '/settings',
  '/third-party',
];
const publicRoutes = ['/login', '/signup'];

export default async function middleware(request: NextRequest) {
  // check if the current route is protected or public
  const path = request.nextUrl.pathname;

  const pathSegment = `/${path.split('/')[1]}`;

  // handle nested routes
  const isProtectedRoute = protectedRoutes.includes(pathSegment);

  // handle public routes
  const isPublicRoute = publicRoutes.includes(pathSegment);

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
  // / will redirect (see next.config)
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
