/* eslint-disable */
import { auth } from '@/auth';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const userRoutes = ['/profile'];
const adminRoutes = ['/admin'];
const authenticationRoutes = ['/sign-in', '/sign-up'];

export default auth((req: any) => {
    const user = req.auth?.user;

    const isUserRoute = userRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route),
    );

    const isAdminRoute = adminRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route),
    );

    const isAuthenticationRoute = authenticationRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route),
    );

    if (!user && isUserRoute) {
        const newUrl = new URL('/sign-in', req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    if (isAdminRoute && user.role !== 'administrator') {
        const newUrl = new URL('/', req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    if (user && isAuthenticationRoute) {
        let newUrl;
        if (user.role === 'administrator') {
            newUrl = new URL('/admin', req.nextUrl.origin);
        } else {
            newUrl = new URL('/', req.nextUrl.origin);
        }
        return Response.redirect(newUrl);
    }

    return;
});
