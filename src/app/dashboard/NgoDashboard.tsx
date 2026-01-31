"use client";

import { motion } from "framer-motion";
import { TreePine, Handshake, CheckCircle2, Clock, Upload, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetNgoTasksQuery, useUpdateTaskStatusMutation } from "../Featuers/Partners/PartnerStatsApi";
import { toast } from "sonner";

export default function NgoDashboard() {
    const { data, isLoading, refetch } = useGetNgoTasksQuery();
    const [updateStatus, { isLoading: isUpdating }] = useUpdateTaskStatusMutation();
    const tasks = data?.tasks || [];

    const stats = {
        pending: tasks.filter(t => t.status === 'assigned').length,
        planted: tasks.filter(t => t.status === 'planted').length,
        verified: tasks.filter(t => t.status === 'verified').length,
    };

    const handleStatusUpdate = async (taskId: string, newStatus: string) => {
        try {
            await updateStatus({ taskId, status: newStatus }).unwrap();
            toast.success("Task status updated successfully!", {
                description: `Moving towards ${newStatus} phase.`
            });
            refetch();
        } catch (err) {
            toast.error("Failed to update status. Please try again.");
        }
    };

    if (isLoading) return <DashboardSkeleton />;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* NGO Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Pending Tasks", value: stats.pending, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Fully Planted", value: stats.planted, icon: TreePine, color: "text-green-600", bg: "bg-green-50" },
                    { label: "Verified Impact", value: stats.verified, icon: CheckCircle2, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((stat, i) => (
                    <Card key={i} className="border-gray-100 shadow-sm relative overflow-hidden">
                        <div className={`absolute top-0 right-0 p-4 opacity-10 ${stat.color}`}>
                            <stat.icon className="w-16 h-16" />
                        </div>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                    <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tasks Queue */}
            <Card className="border-gray-100 shadow-xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50 bg-gray-50/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-black text-gray-900">Task Management Queue</CardTitle>
                            <CardDescription className="text-gray-500 font-medium pt-1">Execute and track your assigned reforestation projects.</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-white text-gray-600 border-gray-200 font-bold px-4 py-1.5 rounded-full">
                            {tasks.length} Assigned Tasks
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-50">
                        {tasks.length === 0 ? (
                            <div className="p-20 text-center space-y-4">
                                <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                    <Clock className="w-10 h-10" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Active queue is empty</h3>
                                <p className="text-gray-500">New assignments from partners will appear here automatically.</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div key={task._id} className="p-8 hover:bg-gray-50/50 transition-colors group">
                                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                                        {/* Buyer Info */}
                                        <div className="flex gap-4 min-w-[300px]">
                                            <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                                                <AvatarFallback className="bg-blue-50 text-blue-700 font-black">
                                                    {task.assignedBuyer?.firstName?.[0] || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <h4 className="font-black text-gray-900">
                                                    {task.assignedBuyer?.firstName} {task.assignedBuyer?.lastName}
                                                </h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {task.plants.map((p: any, idx: number) => (
                                                        <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-600 font-bold text-[9px] px-2">
                                                            {p.quantity}x {p.commonName}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-1 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {new Date(task.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Management Controls */}
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                            <div className="space-y-3">
                                                <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Plantation Status</label>
                                                <Select
                                                    defaultValue={task.status}
                                                    onValueChange={(val) => handleStatusUpdate(task._id, val)}
                                                    disabled={isUpdating || task.status === 'verified'}
                                                >
                                                    <SelectTrigger className="rounded-xl border-gray-100 bg-white font-bold h-12 shadow-sm focus:ring-green-500/20">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        <SelectItem value="assigned" className="font-bold">Assigned</SelectItem>
                                                        <SelectItem value="planted" className="font-bold text-green-600">Mark as Planted</SelectItem>
                                                        <SelectItem value="verified" className="font-bold text-purple-600" disabled>Pending Verification</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Proof of Plantation</label>
                                                <div className="flex gap-3">
                                                    <Button
                                                        variant="outline"
                                                        className="flex-1 rounded-xl border-dashed border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all h-12 font-bold text-gray-500 hover:text-green-700"
                                                        onClick={() => toast.info("Image upload coming soon!")}
                                                    >
                                                        <Upload className="w-4 h-4 mr-2" /> Upload Images
                                                    </Button>
                                                    {task.proofImages.length > 0 && (
                                                        <div className="flex -space-x-2">
                                                            {task.proofImages.map((img, i) => (
                                                                <Avatar key={i} className="w-12 h-12 border-2 border-white">
                                                                    <AvatarImage src={img} />
                                                                </Avatar>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Alert */}
                                        <div className="lg:w-48">
                                            {task.status === 'assigned' && (
                                                <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl flex gap-3 text-xs font-bold leading-tight">
                                                    <AlertCircle className="w-8 h-8 shrink-0" />
                                                    Pending: Prepare saplings for the assigned location.
                                                </div>
                                            )}
                                            {task.status === 'planted' && (
                                                <div className="p-3 bg-green-50 text-green-700 rounded-2xl flex gap-3 text-xs font-bold leading-tight">
                                                    <CheckCircle2 className="w-8 h-8 shrink-0" />
                                                    Planted: Waiting for third-party verification.
                                                </div>
                                            )}
                                            {task.status === 'verified' && (
                                                <div className="p-3 bg-purple-50 text-purple-700 rounded-2xl flex gap-3 text-xs font-bold leading-tight">
                                                    <CheckCircle2 className="w-8 h-8 shrink-0" />
                                                    Goal Met: Impact has been verified and recorded.
                                                </div>
                                            )}
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
