"use client";

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"; // Unused in this section
import Link from "next/link";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import {
  TreePine, Handshake, Building2, Users, CheckCircle2,
  CreditCard, MapPin, ShieldCheck, ArrowRight, Search, Clock, Upload
} from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <MaxWidthRappers>
        <Tabs defaultValue="individuals" className="space-y-12">
          <div className="flex justify-center">
            <TabsList className="bg-muted p-1.5 rounded-2xl h-16 border border-border shadow-inner">
              <TabsTrigger value="individuals" className="rounded-xl px-6 md:px-10 h-full data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md transition-all text-sm md:text-base font-bold flex gap-2 items-center text-muted-foreground">
                <Users className="w-4 h-4" /> Individuals
              </TabsTrigger>
              <TabsTrigger value="businesses" className="rounded-xl px-6 md:px-10 h-full data-[state=active]:bg-card data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-md transition-all text-sm md:text-base font-bold flex gap-2 items-center text-muted-foreground">
                <Building2 className="w-4 h-4" /> Businesses
              </TabsTrigger>
              <TabsTrigger value="ngos" className="rounded-xl px-6 md:px-10 h-full data-[state=active]:bg-card data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-md transition-all text-sm md:text-base font-bold flex gap-2 items-center text-muted-foreground">
                <Handshake className="w-4 h-4" /> NGOs
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Individuals Content */}
          <TabsContent value="individuals" className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-foreground">Plant & Track Your Impact</h2>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  Anyone can contribute to global reforestation. Select native tree species, choose a trusted partner, and watch your impact grow from the comfort of your home.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Browse verified tree species suited for local climates.",
                    "Directly fund verified NGOs during checkout.",
                    "Receive digital certificates and updates."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start font-medium text-foreground/80">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link href="/Tree/Plant_tree">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold h-12 px-8">
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
                  color="text-primary"
                  bg="bg-primary/10"
                />
                <StepCard
                  number="02"
                  title="Select an NGO"
                  desc="Pick a verified partner at checkout to handle the plantation."
                  icon={Handshake}
                  color="text-blue-600 dark:text-blue-400"
                  bg="bg-blue-50 dark:bg-blue-900/20"
                />
                <StepCard
                  number="03"
                  title="Track Progress"
                  desc="Get updates when your trees are assigned, planted, and verified."
                  icon={MapPin}
                  color="text-purple-600 dark:text-purple-400"
                  bg="bg-purple-50 dark:bg-purple-900/20"
                />
              </div>
            </div>
          </TabsContent>

          {/* Businesses Content */}
          <TabsContent value="businesses" className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 md:order-2">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-foreground">Corporate CSR & Sustainability</h2>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  Meet your sustainability goals with transparent, scalable plantation drives. We provide the tools for businesses to fund projects and report on their environmental ROI.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Dedicated Business Dashboard for bulk order tracking.",
                    "Partner with specific NGOs aligned with your corporate values.",
                    "Downloadable impact reports for stakeholders."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start font-medium text-foreground/80">
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
                  color="text-blue-600 dark:text-blue-400"
                  bg="bg-blue-50 dark:bg-blue-900/20"
                />
                <StepCard
                  number="02"
                  title="Monitor Impact"
                  desc="Real-time dashboard showing total trees, partners, and status."
                  icon={Search}
                  color="text-primary"
                  bg="bg-primary/10"
                />
                <StepCard
                  number="03"
                  title="Verified Reports"
                  desc="Receive third-party verified data for your sustainability audits."
                  icon={ShieldCheck}
                  color="text-purple-600 dark:text-purple-400"
                  bg="bg-purple-50 dark:bg-purple-900/20"
                />
              </div>
            </div>
          </TabsContent>

          {/* NGOs Content */}
          <TabsContent value="ngos" className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                  <Handshake className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-foreground">Partner & Execute</h2>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  NGOs are the backbone of our platform. We connect you with funding and provide a streamlined task management system to report your on-ground progress.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Receive funded tasks directly from users and businesses.",
                    "Simple dashboard to update status from Assigned to Planted.",
                    "Upload proof of plantation for verification."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start font-medium text-foreground/80">
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
                  color="text-purple-600 dark:text-purple-400"
                  bg="bg-purple-50 dark:bg-purple-900/20"
                />
                <StepCard
                  number="02"
                  title="Execute & Update"
                  desc="Mark tasks as 'Planted' once saplings are in the ground."
                  icon={TreePine}
                  color="text-primary"
                  bg="bg-primary/10"
                />
                <StepCard
                  number="03"
                  title="Provide Proof"
                  desc="Upload photos/geo-tags to achieve 'Verified' status."
                  icon={Upload}
                  color="text-blue-600 dark:text-blue-400"
                  bg="bg-blue-50 dark:bg-blue-900/20"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </MaxWidthRappers>
    </section>
  );
};

function StepCard({ number, title, desc, icon: Icon, color, bg }: { number: string, title: string, desc: string, icon: any, color: string, bg: string }) {
  return (
    <Card className="border-border shadow-sm hover:shadow-lg transition-all duration-300 bg-card">
      <CardContent className="p-6 flex items-start gap-4">
        <div className={`p-3 rounded-xl ${bg} ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Step {number}</span>
          </div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground font-medium mt-1">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default HowItWorks;
