"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPartnersQuery, Partner } from "../Featuers/Partners/PartnerStatsApi";
import { assignNGO, Before_PlantOrder_Selector } from "../Featuers/TreeOrder/TreeOrderSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, MapPin, Building2, Loader2, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NgoSelection() {
    const { data, isLoading } = useGetPartnersQuery();
    const dispatch = useDispatch();
    const orderBefore = useSelector(Before_PlantOrder_Selector);
    const selectedNgoId = orderBefore?.assignedNGO;

    const ngos = data?.partners?.filter(p => p.role === "NGO") || [];

    const handleSelect = (id: string) => {
        dispatch(assignNGO(id));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <Loader2 className="w-6 h-6 animate-spin text-green-600 mr-2" />
                <span className="font-bold text-gray-500">Loading verified NGOs...</span>
            </div>
        );
    }

    if (ngos.length === 0) {
        return (
            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4 text-amber-800">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="text-sm font-bold">No NGOs available at the moment. Please contact support before proceeding.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">Select Plantation Partner</h3>
                {selectedNgoId && (
                    <Badge className="bg-green-100 text-green-700 border-0 font-black text-[10px]">
                        Choice Recorded
                    </Badge>
                )}
            </div>

            <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                    {ngos.map((ngo) => {
                        const isSelected = selectedNgoId === ngo._id;
                        const ngoName = ngo.profile?.roleSpecificData?.ngoName || `${ngo.firstName} ${ngo.lastName}`;
                        const location = ngo.profile?.roleSpecificData?.areasOfOperation?.[0] || "Global Partner";

                        return (
                            <Card
                                key={ngo._id}
                                className={`cursor-pointer transition-all duration-300 rounded-2xl border-2 hover:shadow-md ${isSelected
                                        ? "border-green-500 bg-green-50/50 shadow-inner"
                                        : "border-gray-100 bg-white hover:border-gray-200"
                                    }`}
                                onClick={() => handleSelect(ngo._id)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                                                <AvatarImage src={ngo.image} />
                                                <AvatarFallback className="bg-green-100 text-green-700 font-bold">
                                                    {ngo.firstName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            {isSelected && (
                                                <div className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full p-0.5 border-2 border-white shadow-sm">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className={`font-black text-sm truncate ${isSelected ? "text-green-800" : "text-gray-900"}`}>
                                                {ngoName}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    <MapPin className="w-3 h-3 text-green-500" />
                                                    <span className="truncate">{location}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    <Building2 className="w-3 h-3 text-blue-500" />
                                                    <span>Verified</span>
                                                </div>
                                            </div>
                                        </div>

                                        {!isSelected && (
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-green-300 transition-colors" />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </ScrollArea>

            {!selectedNgoId && (
                <p className="text-[10px] font-bold text-red-500 text-center animate-pulse">
                    Please select an NGO to handle your plantation tasks.
                </p>
            )}
        </div>
    );
}
