import { NextResponse } from 'next/server';

// middleware applies to every request on the app
// matcher tells it to apply to any route inside api directory

export const config = {
  matcher: '/api/:path*',
};

export function middleware(request: Request) {
  console.log('Middleware');
  console.log('Method: ', request.method);
  console.log('url: ', request.url);

  const origin = request.headers.get('origin');
  console.log('Origin: ', origin);

  return NextResponse.next();
}
