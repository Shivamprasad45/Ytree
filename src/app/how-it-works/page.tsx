"use client";

import React from 'react';
import {
    ShoppingBag,
    ExternalLink,
    ShoppingCart,
    Trees,
    ShieldCheck,
    Users,
    Heart,
    Info,
    CheckCircle,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HowItWorksPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* SECTION 1: Introduction */}
            <section className="relative py-20 px-6 lg:px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" className="text-primary" />
                    </svg>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-block p-2 px-4 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                        Eco-Friendly Shopping 🌍
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        How It Works – <span className="text-primary">Shop & Help Plant Trees 🌱</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Did you know your regular shopping can heal the planet? Shop from Amazon through our specific links, and we use the affiliate commissions to plant trees. No extra cost to you.
                    </p>
                </motion.div>
            </section>

            {/* SECTION 2: Step-by-Step Process */}
            <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-foreground">Simple 4-Step Process</h2>
                    <p className="mt-4 text-muted-foreground">Transparency at every click.</p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
                >
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-primary/20 -z-10" />

                    {/* Step 1 */}
                    <motion.div variants={itemVariants} className="bg-card p-8 rounded-2xl shadow-lg border border-border flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                            <ShoppingBag size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-card-foreground">1. Browse Products</h3>
                        <p className="text-muted-foreground text-sm">Discover eco-friendly finds and daily essentials right here on our website.</p>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div variants={itemVariants} className="bg-card p-8 rounded-2xl shadow-lg border border-border flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                            <ExternalLink size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-card-foreground">2. Click to Amazon</h3>
                        <p className="text-muted-foreground text-sm">Click “Buy on Amazon” and get redirected securely via our affiliate link.</p>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div variants={itemVariants} className="bg-card p-8 rounded-2xl shadow-lg border border-border flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400">
                            <ShoppingCart size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-card-foreground">3. Complete Purchase</h3>
                        <p className="text-muted-foreground text-sm">Amazon handles everything—payment, delivery, and returns. Same prices for you.</p>
                    </motion.div>

                    {/* Step 4 */}
                    <motion.div variants={itemVariants} className="bg-card p-8 rounded-2xl shadow-lg border border-primary/20 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 transform scale-105 ring-2 ring-primary ring-offset-2 ring-offset-background">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 text-primary">
                            <Trees size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-primary">4. We Plant Trees</h3>
                        <p className="text-muted-foreground text-sm">We earn a small commission and pool it to fund community tree plantation projects.</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* SECTION 3: Tree Plantation Explanation */}
            <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Your Impact Grows 🌳</h2>
                            <div className="space-y-6 text-muted-foreground">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-background rounded-lg">
                                        <ShieldCheck className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-lg">Private & Secure</h4>
                                        <p className="mt-1 text-sm opacity-90">Amazon does not share your individual purchase details with us. Your privacy is paramount.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-background rounded-lg">
                                        <Users className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-lg">Community Impact</h4>
                                        <p className="mt-1 text-sm opacity-90">We pool commissions from all users. It's not about one purchase, but the collective power of our community.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-background rounded-lg">
                                        <Heart className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-lg">Real World Action</h4>
                                        <p className="mt-1 text-sm opacity-90">Example: Every ₹500 earned in commissions helps us plant a sapling through verified NGO partners.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative h-64 lg:h-96 bg-background/50 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-border"
                        >
                            {/* Abstract Tree Illustration placeholder */}
                            <div className="flex flex-col items-center p-8 text-center">
                                <Trees size={120} className="text-primary/20 mb-4 animate-pulse" />
                                <p className="text-2xl font-bold text-foreground">Processing Nature...</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: Transparency & Trust */}
            <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-foreground">Built on Trust 🤝</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-card p-6 rounded-xl border border-border hover:border-primary transition-colors">
                        <div className="text-primary mb-4"><CheckCircle size={28} /></div>
                        <h3 className="font-bold text-lg mb-2 text-card-foreground">Zero Extra Cost</h3>
                        <p className="text-muted-foreground text-sm">You pay exactly the same price as you would on Amazon directly.</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border hover:border-primary transition-colors">
                        <div className="text-primary mb-4"><ShieldCheck size={28} /></div>
                        <h3 className="font-bold text-lg mb-2 text-card-foreground">Verified Partners</h3>
                        <p className="text-muted-foreground text-sm">We only work with registered, vetted NGOs for tree plantation.</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border hover:border-primary transition-colors">
                        <div className="text-primary mb-4"><Info size={28} /></div>
                        <h3 className="font-bold text-lg mb-2 text-card-foreground">Honest Reporting</h3>
                        <p className="text-muted-foreground text-sm">We share periodic updates on how many trees have been planted.</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border hover:border-primary transition-colors">
                        <div className="text-primary mb-4"><ShoppingCart size={28} /></div>
                        <h3 className="font-bold text-lg mb-2 text-card-foreground">Amazon Secure</h3>
                        <p className="text-muted-foreground text-sm">Transactions happen on Amazon's secure platform, not ours.</p>
                    </div>
                </div>
            </section>

            {/* SECTION 5: Disclaimer */}
            <section className="bg-muted py-10 px-6 border-t border-border">
                <div className="max-w-4xl mx-auto text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                    <Info size={16} />
                    <p>
                        "We are a participant in the Amazon Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.in and affiliated sites. Product prices, delivery, and returns are handled by Amazon."
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 text-center bg-secondary">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">Ready to Make a Difference?</h2>
                    <p className="text-xl text-muted-foreground mb-10">Start your shopping journey now and help us grow a greener future.</p>
                    <Link href="/Tree/Shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1">
                        Start Shopping & Make an Impact 🌱 <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
