import { appApi } from "./api-config";

const userApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: "/auth/get-my-profile",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetMyProfileQuery } = userApi;
