"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Partner } from "@/app/Featuers/Partners/PartnerStatsApi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Globe, Twitter, Linkedin, Instagram, Facebook, MapPin, ShieldCheck, Building2, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PartnerAboutSheetProps {
    partner: Partner | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function PartnerAboutSheet({ partner, open, onOpenChange }: PartnerAboutSheetProps) {
    if (!partner) return null;

    const isNGO = partner.role === "NGO";
    const name = isNGO
        ? partner.profile?.roleSpecificData?.ngoName || `${partner.firstName} ${partner.lastName}`
        : partner.profile?.roleSpecificData?.corporateName || `${partner.firstName} ${partner.lastName}`;

    const socialLinks = partner.profile?.socialLinks || {};

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-xl w-full p-0 flex flex-col h-full bg-background border-l border-border">
                <ScrollArea className="flex-1">
                    <div className="p-8 space-y-8">
                        {/* Header Section */}
                        <div className="flex flex-col items-center text-center space-y-4 pt-4">
                            <Avatar className="w-24 h-24 border-4 border-primary/10 shadow-xl">
                                <AvatarImage src={partner.image} />
                                <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                                    {partner.firstName[0]}{partner.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                    <h2 className="text-2xl font-black text-foreground">{name}</h2>
                                    <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 fill-green-50 dark:fill-green-900/20" />
                                </div>
                                <Badge variant="secondary" className={isNGO ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"}>
                                    {isNGO ? "Verified NGO" : "Corporate Ally"}
                                </Badge>
                            </div>
                        </div>

                        <Separator className="bg-border" />

                        {/* About Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-muted-foreground uppercase tracking-wider">About</h3>
                            <p className="text-muted-foreground leading-relaxed font-medium">
                                {partner.profile?.bio || "No description provided yet."}
                            </p>
                            {isNGO && partner.profile?.roleSpecificData?.missionStatement && (
                                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800 italic text-green-800 dark:text-green-300 text-sm font-semibold">
                                    &quot;{partner.profile.roleSpecificData.missionStatement}&quot;
                                </div>
                            )}
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-3xl bg-card border border-border">
                                <div className="text-2xl font-black text-foreground">{partner.associationCount}+</div>
                                <div className="text-xs font-bold text-muted-foreground uppercase">{isNGO ? "Businesses Helped" : "NGOs Supported"}</div>
                            </div>
                            <div className="p-4 rounded-3xl bg-card border border-border">
                                <div className="text-2xl font-black text-foreground">
                                    {isNGO ? (partner.profile?.roleSpecificData?.areasOfOperation?.length || 0) : "12"}
                                </div>
                                <div className="text-xs font-bold text-muted-foreground uppercase">{isNGO ? "Regions Active" : "Impact Projects"}</div>
                            </div>
                        </div>

                        {/* Areas of Operation (NGO Only) */}
                        {isNGO && (partner.profile?.roleSpecificData?.areasOfOperation?.length || 0) > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-muted-foreground uppercase tracking-wider">Areas of Operation</h3>
                                <div className="flex flex-wrap gap-2">
                                    {partner.profile?.roleSpecificData?.areasOfOperation?.map((area, idx) => (
                                        <Badge key={idx} variant="outline" className="rounded-lg py-1 px-3 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                            <MapPin className="w-3 h-3 mr-1" /> {area}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact & Socials */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-muted-foreground uppercase tracking-wider">Connect</h3>
                            <div className="flex flex-wrap gap-4">
                                {socialLinks.website && (
                                    <a href={socialLinks.website} target="_blank" className="p-3 bg-muted rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                                        <Globe className="w-5 h-5" />
                                    </a>
                                )}
                                {socialLinks.twitter && (
                                    <a href={socialLinks.twitter} target="_blank" className="p-3 bg-muted rounded-2xl text-muted-foreground hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                                {socialLinks.linkedin && (
                                    <a href={socialLinks.linkedin} target="_blank" className="p-3 bg-muted rounded-2xl text-muted-foreground hover:text-blue-700 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {socialLinks.instagram && (
                                    <a href={socialLinks.instagram} target="_blank" className="p-3 bg-muted rounded-2xl text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                )}
                                {socialLinks.facebook && (
                                    <a href={socialLinks.facebook} target="_blank" className="p-3 bg-muted rounded-2xl text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <div className="p-8 border-t border-border bg-muted/20">
                    <button className="w-full py-4 bg-primary text-primary-foreground rounded-[2rem] font-black shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                        {isNGO ? "Collaborate with this NGO" : "Partner with this Business"}
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
