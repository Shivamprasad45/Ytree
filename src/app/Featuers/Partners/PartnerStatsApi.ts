import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PartnerStats {
    ngos: number;
    corporates: number;
}

export interface PartnerStatsResponse {
    success: boolean;
    stats: PartnerStats;
    error?: string;
}

export interface Partner {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "NGO" | "CORPORATE";
    image?: string;
    associationCount: number;
    profile?: {
        bio?: string;
        phoneNumber?: string;
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
            corporateName?: string;
            industry?: string;
        };
    };
}

export interface PartnerListResponse {
    success: boolean;
    partners: Partner[];
    error?: string;
}

export interface PlantationTask {
    _id: string;
    assignedBuyer: any;
    assignedNGO: Partner;
    orderId: string;
    plants: any[];
    status: "assigned" | "planted" | "verified";
    proofImages: string[];
    createdAt: string;
    updatedAt: string;
}

export interface TaskListResponse {
    tasks: PlantationTask[];
    error?: string;
}

export const PartnerStatsApi = createApi({
    reducerPath: "PartnerStatsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["PartnerStats"],
    endpoints: (builder) => ({
        getPartnerStats: builder.query<PartnerStatsResponse, void>({
            query: () => "/partners/stats",
            providesTags: ["PartnerStats"],
        }),
        getPartners: builder.query<PartnerListResponse, void>({
            query: () => "/partners/list",
            providesTags: ["PartnerStats"],
        }),
        getNgoTasks: builder.query<TaskListResponse, void>({
            query: () => "/partners/tasks",
            providesTags: ["PartnerStats"],
        }),
        getBuyerTasks: builder.query<TaskListResponse, void>({
            query: () => "/partners/buyer-tasks",
            providesTags: ["PartnerStats"],
        }),
        updateTaskStatus: builder.mutation<any, { taskId: string; status: string; proofImages?: string[] }>({
            query: (data) => ({
                url: "/partners/tasks",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["PartnerStats"],
        }),
    }),
});

export const {
    useGetPartnerStatsQuery,
    useGetPartnersQuery,
    useGetNgoTasksQuery,
    useGetBuyerTasksQuery,
    useUpdateTaskStatusMutation
} = PartnerStatsApi;
