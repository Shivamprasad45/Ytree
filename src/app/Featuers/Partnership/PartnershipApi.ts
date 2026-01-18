import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PartnershipData } from "../../Components/IndestriesColab/vanagrow-corporate-reforestation/types";

export const PartnershipApi = createApi({
    reducerPath: "PartnershipApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/partnership" }),
    endpoints: (builder) => ({
        submitApplication: builder.mutation<any, PartnershipData>({
            query: (applicationData) => ({
                url: "/apply",
                method: "POST",
                body: applicationData,
            }),
        }),
    }),
});

export const { useSubmitApplicationMutation } = PartnershipApi;
