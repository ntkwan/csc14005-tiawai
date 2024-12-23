import { appApi } from "./api-config";

const userApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
        }),
        getMyStatistics: builder.query({
            query: () => ({
                url: "/user/exam",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetMyProfileQuery, useGetMyStatisticsQuery } = userApi;
