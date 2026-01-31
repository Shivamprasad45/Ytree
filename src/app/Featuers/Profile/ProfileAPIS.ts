import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ProfileData {
    user: {
        firstName?: string;
        lastName?: string;
        email?: string;
        role?: string;
        image?: string;
        referredUsers?: number;
    };
    profile: {
        bio?: string;
        phoneNumber?: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            zip?: string;
            country?: string;
        };
        socialLinks?: {
            website?: string;
            twitter?: string;
            linkedin?: string;
            instagram?: string;
            facebook?: string;
        };
        roleSpecificData?: {
            ngoName?: string;
            registrationNumber?: string;
            missionStatement?: string;
            areasOfOperation?: string[];
            certificateUrl?: string;
            companyName?: string;
            industry?: string;
            csrFocus?: string;
            sustainabilityGoals?: string;
        };
    };
}

export const ProfileApi = createApi({
    reducerPath: "ProfileApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/user" }),
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileData, void>({
            query: () => "/profile",
            providesTags: ["Profile"],
        }),
        updateProfile: builder.mutation<any, any>({
            query: (data) => ({
                url: "/profile",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = ProfileApi;
