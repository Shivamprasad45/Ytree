"use client";

import { motion } from "framer-motion";
import { TreePine, Handshake, Calendar, CheckCircle2, Clock, MapPin, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useGetBuyerTasksQuery } from "../Featuers/Partners/PartnerStatsApi";

export default function BusinessDashboard() {
    const { data, isLoading } = useGetBuyerTasksQuery();
    const tasks = data?.tasks || [];

    const stats = {
        totalTrees: tasks.reduce((acc, task) => acc + task.plants.reduce((sum: number, p: any) => sum + p.quantity, 0), 0),
        totalOrders: tasks.length,
        partnerNgos: new Set(tasks.map(t => t.assignedNGO._id)).size
    };

    if (isLoading) return <DashboardSkeleton />;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Trees Funded", value: stats.totalTrees, icon: TreePine, color: "text-primary", bg: "bg-primary/10" },
                    { label: "Plantation Orders", value: stats.totalOrders, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50/50 dark:bg-blue-900/20" },
                    { label: "NGO Partners", value: stats.partnerNgos, icon: Handshake, color: "text-purple-600", bg: "bg-purple-50/50 dark:bg-purple-900/20" },
                ].map((stat, i) => (
                    <Card key={i} className="border-border shadow-sm overflow-hidden relative bg-card">
                        <div className={`absolute top-0 right-0 p-4 opacity-10 ${stat.color}`}>
                            <stat.icon className="w-16 h-16" />
                        </div>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                                    <h3 className="text-3xl font-black text-foreground">{stat.value}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Orders List */}
            <Card className="border-border shadow-xl rounded-[2.5rem] overflow-hidden bg-card">
                <CardHeader className="p-8 border-b border-border bg-muted/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-black text-foreground">Plantation Orders</CardTitle>
                            <CardDescription className="text-muted-foreground font-medium pt-1">Track the progress of your reforestation contributions.</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-background text-muted-foreground border-border font-bold px-4 py-1.5 rounded-full">
                            {tasks.length} Total
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {tasks.length === 0 ? (
                            <div className="p-20 text-center space-y-4">
                                <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                                    <TreePine className="w-10 h-10" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">No orders found</h3>
                                <p className="text-muted-foreground max-w-xs mx-auto">Start your plantation journey by choosing an NGO from the directory.</p>
                                <Button className="rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground">Explore Partners</Button>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div key={task._id} className="p-8 hover:bg-muted/50 transition-colors group">
                                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                                        <div className="flex gap-6 items-start">
                                            <div className="relative">
                                                <Avatar className="w-16 h-16 border-4 border-background shadow-xl">
                                                    <AvatarImage src={task.assignedNGO.image} />
                                                    <AvatarFallback className="bg-primary/10 text-primary font-black">
                                                        {task.assignedNGO.firstName[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 shadow-md border border-border">
                                                    <Handshake className="w-3.5 h-3.5 text-primary" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                                                        {task.assignedNGO.profile?.roleSpecificData?.ngoName || `${task.assignedNGO.firstName} ${task.assignedNGO.lastName}`}
                                                    </h4>
                                                    <StatusBadge status={task.status} />
                                                </div>
                                                <p className="text-sm text-muted-foreground font-medium flex items-center gap-4">
                                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Order: {task.orderId}</span>
                                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(task.createdAt).toLocaleDateString()}</span>
                                                </p>
                                                <div className="pt-3 flex gap-2">
                                                    {task.plants.map((p: any, idx: number) => (
                                                        <Badge key={idx} variant="secondary" className="bg-muted text-muted-foreground font-bold text-[10px] rounded-lg">
                                                            {p.quantity}x {p.commonName}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                                            <div className="flex-1 lg:text-right space-y-1 pr-4">
                                                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Target Location</p>
                                                <p className="text-sm font-bold text-foreground flex items-center lg:justify-end gap-1.5">
                                                    <MapPin className="w-4 h-4 text-primary" />
                                                    {task.assignedNGO.profile?.roleSpecificData?.areasOfOperation?.[0] || "Global Project"}
                                                </p>
                                            </div>
                                            <Button variant="outline" className="rounded-xl font-bold border-border hover:bg-background hover:border-primary hover:text-primary shadow-sm active:scale-95 transition-all">
                                                View Details <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Progress Timeline */}
                                    <div className="mt-10 relative">
                                        <div className="absolute top-4 left-0 w-full h-1 bg-muted rounded-full" />
                                        <div
                                            className="absolute top-4 left-0 h-1 bg-primary rounded-full transition-all duration-1000"
                                            style={{ width: task.status === 'verified' ? '100%' : task.status === 'planted' ? '50%' : '5%' }}
                                        />
                                        <div className="relative flex justify-between">
                                            {[
                                                { label: "Assigned", status: "assigned", icon: Handshake },
                                                { label: "Planted", status: "planted", icon: TreePine },
                                                { label: "Verified", status: "verified", icon: CheckCircle2 },
                                            ].map((step, idx) => {
                                                const isActive = task.status === step.status;
                                                const isCompleted = isStatusCompleted(task.status, step.status);
                                                return (
                                                    <div key={idx} className="flex flex-col items-center gap-3 relative z-10 w-24">
                                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border-4 border-background shadow-xl ${isCompleted ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
                                                            }`}>
                                                            <step.icon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
                                                        </div>
                                                        <span className={`text-[10px] font-black uppercase tracking-wider ${isCompleted ? "text-primary" : "text-muted-foreground"
                                                            }`}>
                                                            {step.label}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const configs: Record<string, { label: string, className: string }> = {
        assigned: { label: "Assigned", className: "bg-blue-100 text-blue-700 animate-pulse" },
        planted: { label: "Fully Planted", className: "bg-green-100 text-green-700" },
        verified: { label: "Impact Verified", className: "bg-purple-100 text-purple-700" }
    };
    const config = configs[status] || configs.assigned;
    return <Badge className={`${config.className} rounded-lg font-black text-[10px] px-2.5 shadow-sm border-0`}>{config.label}</Badge>;
}

function isStatusCompleted(current: string, target: string) {
    const levels = ["assigned", "planted", "verified"];
    return levels.indexOf(current) >= levels.indexOf(target);
}

function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-3xl" />)}
            </div>
            <Skeleton className="h-[600px] rounded-[2.5rem]" />
        </div>
    );
}
