export type Role = "user" | "administrator";

export type User = {
    id?: string | undefined;
    email?: string | undefined;
    role?: Role | undefined;
};
