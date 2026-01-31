"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, Handshake, Globe, ArrowRight, ShieldCheck, Loader2, Search, Filter, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { useGetPartnerStatsQuery, useGetPartnersQuery, Partner } from "../Featuers/Partners/PartnerStatsApi";
import PartnerAboutSheet from "../Components/PartnerAboutSheet";
import { toast } from "sonner";

export default function PartnersPage() {
    const { data: statsData, isLoading: isStatsLoading } = useGetPartnerStatsQuery();
    const { data: partnersData, isLoading: isPartnersLoading } = useGetPartnersQuery();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const stats = statsData?.stats || { ngos: 0, corporates: 0 };
    const partners = partnersData?.partners || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.05),transparent_50%)]" />
                <MaxWidthRappers>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6 relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                            <Handshake className="w-3.5 h-3.5" />
                            Our Global Network
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
                            Growing Together with <span className="text-primary">World-Class Partners</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            Join our ecosystem of dedicated NGOs and forward-thinking Corporate partners working together to restore the planet&apos;s green cover.
                        </p>
                    </motion.div>
                </MaxWidthRappers>
            </section>

            {/* Stats Section */}
            <section className="py-20 relative">
                <MaxWidthRappers>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {/* NGOs Stat Card */}
                        <motion.div
                            variants={itemVariants}
                            className="group relative p-8 rounded-[2.5rem] bg-card border border-border shadow-sm hover:shadow-xl hover:bg-card/80 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Users className="w-32 h-32 text-primary" />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <div className="p-3 bg-primary/20 text-primary rounded-2xl w-fit">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-foreground mb-1">
                                        {isStatsLoading ? <Loader2 className="w-8 h-8 animate-spin inline" /> : stats.ngos}+
                                    </div>
                                    <div className="text-xl font-bold text-muted-foreground uppercase tracking-wide">NGO Partners</div>
                                </div>
                                <p className="text-muted-foreground font-medium">
                                    Ground-level organizations executing impactful reforestation projects across various biomes and territories.
                                </p>
                                <Button variant="link" className="px-0 text-primary font-bold group-hover:gap-3 transition-all">
                                    View NGO Directory <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>

                        {/* Corporate Stat Card */}
                        <motion.div
                            variants={itemVariants}
                            className="group relative p-8 rounded-[2.5rem] bg-card border border-border shadow-sm hover:shadow-xl hover:bg-card/80 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Building2 className="w-32 h-32 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-2xl w-fit">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-foreground mb-1">
                                        {isStatsLoading ? <Loader2 className="w-8 h-8 animate-spin inline" /> : stats.corporates}+
                                    </div>
                                    <div className="text-xl font-bold text-muted-foreground uppercase tracking-wide">Corporate Allies</div>
                                </div>
                                <p className="text-muted-foreground font-medium">
                                    Businesses committed to sustainability and carbon neutrality, funding global environmental initiatives.
                                </p>
                                <Button variant="link" className="px-0 text-blue-600 dark:text-blue-400 font-bold group-hover:gap-3 transition-all">
                                    Explore CSR Opportunities <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                </MaxWidthRappers>
            </section>

            {/* Partner Directory Section */}
            <section className="py-20 border-t border-border">
                <MaxWidthRappers>
                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-foreground">Partner Directory</h2>
                                <p className="text-muted-foreground font-medium">Discover organizations driving environmental change.</p>
                            </div>
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    className="pl-12 rounded-2xl border-border bg-muted/50 focus:bg-background h-12 text-sm font-medium"
                                    placeholder="Search by name, mission, or industry..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <Tabs defaultValue="NGO" className="space-y-8">
                            <TabsList className="bg-muted p-1.5 rounded-2xl h-14 w-fit border border-border">
                                <TabsTrigger value="NGO" className="rounded-xl px-8 h-full data-[state=active]:bg-background data-[state=active]:shadow-lg active:scale-95 transition-all text-sm font-bold">
                                    NGOs ({partners.filter(p => p.role === "NGO").length})
                                </TabsTrigger>
                                <TabsTrigger value="CORPORATE" className="rounded-xl px-8 h-full data-[state=active]:bg-background data-[state=active]:shadow-lg active:scale-95 transition-all text-sm font-bold">
                                    Businesses ({partners.filter(p => p.role === "CORPORATE").length})
                                </TabsTrigger>
                            </TabsList>

                            {["NGO", "CORPORATE"].map((role) => (
                                <TabsContent key={role} value={role} className="mt-0">
                                    {isPartnersLoading ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-64 rounded-[2.5rem] bg-muted animate-pulse border border-border" />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {partners
                                                .filter(p => p.role === role && (
                                                    p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    p.profile?.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    p.profile?.roleSpecificData?.ngoName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    p.profile?.roleSpecificData?.corporateName?.toLowerCase().includes(searchQuery.toLowerCase())
                                                ))
                                                .map((partner) => {
                                                    const name = partner.role === "NGO"
                                                        ? partner.profile?.roleSpecificData?.ngoName || `${partner.firstName} ${partner.lastName}`
                                                        : partner.profile?.roleSpecificData?.corporateName || `${partner.firstName} ${partner.lastName}`;

                                                    return (
                                                        <motion.div
                                                            key={partner._id}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.4 }}
                                                            viewport={{ once: true }}
                                                            className="group flex flex-col p-6 rounded-[2.5rem] bg-card border border-border shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                                                        >
                                                            <div className="flex items-start justify-between mb-8">
                                                                <div className="relative">
                                                                    <Avatar className="w-16 h-16 border-2 border-muted shadow-md">
                                                                        <AvatarImage src={partner.image} />
                                                                        <AvatarFallback className="bg-muted text-muted-foreground font-bold">
                                                                            {partner.firstName[0]}{partner.lastName[0]}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    <Badge variant="secondary" className="bg-muted text-muted-foreground font-bold text-[10px] rounded-lg">
                                                                        {partner.associationCount}+ {partner.role === "NGO" ? "Businesses" : "NGOs"}
                                                                    </Badge>
                                                                </div>
                                                            </div>

                                                            <div className="flex-1 space-y-3">
                                                                <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                                    {name}
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground font-medium line-clamp-3 leading-relaxed">
                                                                    {partner.profile?.bio || "Committed to restoring our planet's green lungs through sustainable practices."}
                                                                </p>
                                                            </div>

                                                            <div className="mt-8 pt-6 border-t border-border flex flex-col gap-4">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex gap-1">
                                                                        <ShieldCheck className="w-4 h-4 text-green-500" />
                                                                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">Verified Partner</span>
                                                                    </div>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="rounded-xl font-bold text-xs px-5 border-border hover:bg-muted transition-all active:scale-95"
                                                                        onClick={() => {
                                                                            setSelectedPartner(partner);
                                                                            setIsSheetOpen(true);
                                                                        }}
                                                                    >
                                                                        See About
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                        </div>
                                    )}
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </MaxWidthRappers>
            </section>

            <PartnerAboutSheet
                partner={selectedPartner}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
            />

            {/* Features/Trust Section */}
            <section className="py-20 bg-muted/30">
                <MaxWidthRappers>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-4">
                            <div className="mx-auto p-4 bg-card rounded-3xl w-fit shadow-md border border-border text-primary">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Global Presence</h3>
                            <p className="text-muted-foreground font-medium">Operating in 30+ countries with localized expertise and sustainable practices.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="mx-auto p-4 bg-card rounded-3xl w-fit shadow-md border border-border text-primary">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Verified Impact</h3>
                            <p className="text-muted-foreground font-medium">Rigorous audit processes for every tree planted and every carbon credit generated.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="mx-auto p-4 bg-card rounded-3xl w-fit shadow-md border border-border text-primary">
                                <Handshake className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Transparent Partnership</h3>
                            <p className="text-muted-foreground font-medium">Real-time reporting and blockchain-verified tracking for all environmental contributions.</p>
                        </div>
                    </div>
                </MaxWidthRappers>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <MaxWidthRappers>
                    <div className="p-12 rounded-[3.5rem] bg-gradient-to-br from-green-600 to-green-700 dark:from-green-700 dark:to-green-900 text-white text-center space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />

                        <h2 className="text-3xl md:text-5xl font-black leading-tight relative z-10">
                            Ready to Make <span className="text-green-200">History?</span>
                        </h2>
                        <p className="text-xl text-green-50/80 max-w-2xl mx-auto font-medium relative z-10">
                            Whether you&apos;re an NGO looking for funding or a corporation seeking impact, there&apos;s a place for you in the forest.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 px-10 rounded-2xl font-black shadow-lg">
                                Partner with Us
                            </Button>
                            <Button size="lg" variant="outline" className="border-green-700 text-green-700 hover:bg-green-50 px-10 rounded-2xl font-bold backdrop-blur-sm">
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </MaxWidthRappers>
            </section>
        </div>
    );
}
