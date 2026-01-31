"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import BusinessDashboard from "./BusinessDashboard";
import NgoDashboard from "./NgoDashboard";
import { Loader2, LayoutDashboard, TreePine, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/dashboard");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-green-600" />
                    <p className="text-sm font-bold text-gray-500 animate-pulse">Initializing your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!session) return null;

    const role = session.user?.role?.toUpperCase();
    const isNGO = role === "NGO";
    const isBusiness = role === "CORPORATE" || role === "BUSINESS";

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Dashboard Hero */}
            <section className="relative pt-16 pb-12 overflow-hidden bg-gray-50/50">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50 rounded-full -mr-64 -mt-64 blur-3xl opacity-50" />
                <MaxWidthRappers>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 shadow-sm text-green-700 text-[10px] font-black uppercase tracking-wider">
                                <LayoutDashboard className="w-3 h-3" />
                                Interactive Hub
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                {isNGO ? "Partner " : "Impact "}
                                <span className="text-green-600">Dashboard</span>
                            </h1>
                            <p className="text-gray-500 font-medium max-w-xl">
                                {isNGO
                                    ? "Manage your plantation tasks, update progress, and coordinate with corporate sponsors."
                                    : "Monitor your funded projects, track tree growth, and verify your environmental impact."}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                                    <TreePine className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Earth Status</p>
                                    <p className="text-sm font-black text-gray-900">Active Monitor</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Nodes</p>
                                    <p className="text-sm font-black text-gray-900">Verified Sync</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthRappers>
            </section>

            {/* Dashboard Content */}
            <MaxWidthRappers>
                <div className="mt-12">
                    {isNGO ? (
                        <NgoDashboard />
                    ) : (
                        <BusinessDashboard />
                    )}
                </div>
            </MaxWidthRappers>
        </div>
    );
}
