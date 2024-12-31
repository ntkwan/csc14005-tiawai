import "jwt-decode";

declare module "jwt-decode" {
    interface JwtPayload {
        id?: string;
        email?: string;
        role?: string | null;
    }
}
