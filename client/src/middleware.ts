import { auth } from "@/auth";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

const protectedRoutes = ["/profile", "/admin"];

export default auth((req) => {
    if (
        !req.auth &&
        protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
    ) {
        const newUrl = new URL("/sign-in", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
});
