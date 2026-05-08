import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGUAGES = ['en', 'fr', 'it', 'de'];
const DEFAULT_LANGUAGE = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has language prefix
  const pathnameHasLanguage = SUPPORTED_LANGUAGES.some(
    lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (pathnameHasLanguage) {
    return NextResponse.next();
  }

  // Skip middleware for API routes, _next files, and static assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') // common for static files like favicon.ico, images
  ) {
    return NextResponse.next();
  }

  // If no language in URL, detect and redirect
  const languageFromCookie = request.cookies.get('NEXT_LOCALE')?.value;
  const languageFromHeader = request.headers
    .get('accept-language')
    ?.split(',')[0]
    .split('-')[0];

  const detectedLanguage =
    languageFromCookie ||
    (SUPPORTED_LANGUAGES.includes(languageFromHeader || '') 
      ? languageFromHeader 
      : DEFAULT_LANGUAGE);

  // Redirect to localized path
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLanguage}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
