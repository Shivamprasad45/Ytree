"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    TreePine,
    Handshake,
    Building2,
    Users,
    CheckCircle2,
    Leaf,
    CreditCard,
    MapPin,
    ShieldCheck,
    ArrowRight,
    Search,
    Clock,
    Upload
} from "lucide-react";
import Link from "next/link";
import MaxWidthRappers from "@/components/MaxWidthRapper";

export default function HowItWorksPage() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 overflow-hidden bg-green-50/50">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
                <MaxWidthRappers>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-6 max-w-3xl mx-auto relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-2">
                            <Leaf className="w-3.5 h-3.5" />
                            Transparent Reforestation
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                            How <span className="text-green-600">Ytree</span> Works
                        </h1>
                        <p className="text-lg text-gray-600 font-medium">
                            A unified platform connecting individuals and businesses with verified NGOs to restore our planet, one tree at a time.
                        </p>
                    </motion.div>
                </MaxWidthRappers>
            </section>

            {/* Role-Based Guides */}
            <section className="py-16">
                <MaxWidthRappers>
                    <Tabs defaultValue="individuals" className="space-y-12">
                        <div className="flex justify-center">
                            <TabsList className="bg-gray-100 p-1.5 rounded-2xl h-16 border border-gray-200 shadow-inner">
                                <TabsTrigger value="individuals" className="rounded-xl px-6 md:px-10 h-full data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-md transition-all text-sm md:text-base font-bold flex gap-2 items-center">
                                    <Users className="w-4 h-4" /> Individuals
                                </TabsTrigger>
                                <TabsTrigger value="businesses" className="rounded-xl px-6 md:px-10 h-full data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md transition-all text-sm md:text-base font-bold flex gap-2 items-center">
                                    <Building2 className="w-4 h-4" /> Businesses
                                </TabsTrigger>
                                <TabsTrigger value="ngos" className="rounded-xl px-6 md:px-10 h-full data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md transition-all text-sm md:text-base font-bold flex gap-2 items-center">
                                    <Handshake className="w-4 h-4" /> NGOs
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Individuals Content */}
                        <TabsContent value="individuals" className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900">Plant & Track Your Impact</h2>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        Anyone can contribute to global reforestation. Select native tree species, choose a trusted partner, and watch your impact grow from the comfort of your home.
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {[
                                            "Browse verified tree species suited for local climates.",
                                            "Directly fund verified NGOs during checkout.",
                                            "Receive digital certificates and updates."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-start font-medium text-gray-700">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4">
                                        <Link href="/Tree/Plant_tree">
                                            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold h-12 px-8">
                                                Start Planting <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid gap-6">
                                    <StepCard
                                        number="01"
                                        title="Choose Your Trees"
                                        desc="Explore our catalog of native plants suited for various regions."
                                        icon={TreePine}
                                        color="text-green-600"
                                    />
                                    <StepCard
                                        number="02"
                                        title="Select an NGO"
                                        desc="Pick a verified partner at checkout to handle the plantation."
                                        icon={Handshake}
                                        color="text-blue-600"
                                    />
                                    <StepCard
                                        number="03"
                                        title="Track Progress"
                                        desc="Get updates when your trees are assigned, planted, and verified."
                                        icon={MapPin}
                                        color="text-purple-600"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* Businesses Content */}
                        <TabsContent value="businesses" className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6 md:order-2">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900">Corporate CSR & Sustainability</h2>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        Meet your sustainability goals with transparent, scalable plantation drives. We provide the tools for businesses to fund projects and report on their environmental ROI.
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {[
                                            "Dedicated Business Dashboard for bulk order tracking.",
                                            "Partner with specific NGOs aligned with your corporate values.",
                                            "Downloadable impact reports for stakeholders."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-start font-medium text-gray-700">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4">
                                        <Link href="/dashboard">
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold h-12 px-8">
                                                View Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid gap-6 md:order-1">
                                    <StepCard
                                        number="01"
                                        title="Fund Projects"
                                        desc="Allocate CSR funds to specific large-scale plantation drives."
                                        icon={CreditCard}
                                        color="text-blue-600"
                                    />
                                    <StepCard
                                        number="02"
                                        title="Monitor Impact"
                                        desc="Real-time dashboard showing total trees, partners, and status."
                                        icon={Search}
                                        color="text-green-600"
                                    />
                                    <StepCard
                                        number="03"
                                        title="Verified Reports"
                                        desc="Receive third-party verified data for your sustainability audits."
                                        icon={ShieldCheck}
                                        color="text-purple-600"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* NGOs Content */}
                        <TabsContent value="ngos" className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
                                        <Handshake className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900">Partner & Execute</h2>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        NGOs are the backbone of our platform. We connect you with funding and provide a streamlined task management system to report your on-ground progress.
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {[
                                            "Receive funded tasks directly from users and businesses.",
                                            "Simple dashboard to update status from Assigned to Planted.",
                                            "Upload proof of plantation for verification."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-start font-medium text-gray-700">
                                                <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4">
                                        <Link href="/partners">
                                            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold h-12 px-8">
                                                Join Network <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid gap-6">
                                    <StepCard
                                        number="01"
                                        title="Receive Tasks"
                                        desc="Tasks appear in your queue when users select you at checkout."
                                        icon={Clock}
                                        color="text-purple-600"
                                    />
                                    <StepCard
                                        number="02"
                                        title="Execute & Update"
                                        desc="Mark tasks as 'Planted' once saplings are in the ground."
                                        icon={TreePine}
                                        color="text-green-600"
                                    />
                                    <StepCard
                                        number="03"
                                        title="Provide Proof"
                                        desc="Upload photos/geo-tags to achieve 'Verified' status."
                                        icon={Upload}
                                        color="text-blue-600"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </MaxWidthRappers>
            </section>

            {/* Verification Process Section */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <MaxWidthRappers>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <Badge variant="outline" className="mb-4 bg-white text-gray-900 border-gray-200 uppercase tracking-widest font-black py-1 px-3">
                            Transparency First
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">The Cycle of Trust</h2>
                        <p className="text-gray-500 font-medium text-lg">
                            We ensure that every donation results in a living tree through our rigorous 3-step verification process.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-0" />

                        {[
                            { step: "1", title: "Assignment", desc: "User selects NGO & pays. Funds are held in escrow.", color: "bg-blue-600" },
                            { step: "2", title: "Plantation", desc: "NGO executes planting and updates status with proofs.", color: "bg-green-600" },
                            { step: "3", title: "Verification", desc: "Third-party audit confirms impact. Funds released.", color: "bg-purple-600" },
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4">
                                <div className={`w-24 h-24 rounded-3xl ${item.color} text-white flex items-center justify-center shadow-xl shadow-gray-200`}>
                                    <span className="text-4xl font-black">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-black text-gray-900">{item.title}</h3>
                                <p className="text-gray-500 font-medium max-w-xs">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </MaxWidthRappers>
            </section>
        </div>
    );
}

function StepCard({ number, title, desc, icon: Icon, color }: { number: string, title: string, desc: string, icon: any, color: string }) {
    return (
        <Card className="border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gray-50 ${color}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Step {number}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">{desc}</p>
                </div>
            </CardContent>
        </Card>
    );
}
