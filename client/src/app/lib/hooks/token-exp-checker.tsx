import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hook";
import { setSignOut } from "@/lib/slices/auth-slice";
import { jwtDecode } from "jwt-decode";

const useTokenExpirationChecker = () => {
    const dispatch = useAppDispatch();
    const { refreshToken } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (refreshToken) {
                const decodedToken = jwtDecode(refreshToken);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken.exp && decodedToken.exp < currentTime) {
                    dispatch(setSignOut());
                }
            }
        };

        const interval = setInterval(checkTokenExpiration, 60 * 1000);
        return () => clearInterval(interval);
    }, [refreshToken, dispatch]);
};

export default useTokenExpirationChecker;
