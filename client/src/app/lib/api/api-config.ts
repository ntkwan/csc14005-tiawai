"use client";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { CredentialsProps } from "@/app/lib/slices/auth-slice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken, setSignOut } from "@/app/lib/slices/auth-slice";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
});

const getBaseQueryWithReauth = (
    baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
    return async function (args, api, extraOptions) {
        let result = await baseQuery(args, api, extraOptions);

        if (
            result.error &&
            (result.error.status === 401 ||
                result.error.data === "Unauthorized")
        ) {
            const refreshResult = await baseQuery(
                {
                    url: "/auth/refresh-token",
                    method: "GET",
                },
                api,
                extraOptions,
            );

            const refreshData = refreshResult.data as CredentialsProps;

            if (refreshData?.accessToken) {
                api.dispatch(
                    setAccessToken({ accessToken: refreshData.accessToken }),
                );
                result = await baseQuery(args, api, extraOptions);
                return result;
            } else {
                api.dispatch(setSignOut());
            }
        }

        return result;
    };
};

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: getBaseQueryWithReauth(baseQuery),
    endpoints: () => ({}),
});
