"use client";
// import "../../../../envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const accessToken = state.auth.accessToken;
        if (accessToken) {
            // headers.set("Authorization", `Bearer ${accessToken}`);
            // headers.Authorization = `Bearer ${accessToken}`;
            console.log(true);
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);

//     if (result?.error?.status === 401) {
//         const refreshResult = await baseQuery(
//             {
//                 url: "/refresh-token",
//                 method: "POST",
//             },
//             api,
//             extraOptions,
//         );
//         if (refreshResult?.data) {
//             const user = api.getState().auth.user;
//             api.dispatch(
//                 setCredentials({ user, token: refreshResult.data.accessToken }),
//             );
//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             api.dispatch(logOut());
//         }
//     }
//     return result;
// };

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
});
