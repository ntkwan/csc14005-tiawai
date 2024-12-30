export const handleSignIn = async ({
    username,
    password,
}: {
    username: string | unknown;
    password: string | unknown;
}) => {
    try {
        const res = await fetch(process.env.BACKEND_BASE_URL + "auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        if (res.ok) {
            const data = await res.json();
            return {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            };
        }
    } catch (error) {
        return error;
    }
};
