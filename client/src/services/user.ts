import { appApi } from "@/services/config";

const userApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ["Auth"],
        }),

        getMyStatistics: builder.query({
            query: () => ({
                url: "/user/exam",
                method: "GET",
            }),
            providesTags: ["Auth"],
        }),
    }),
});

export const { useGetMyProfileQuery, useGetMyStatisticsQuery } = userApi;
