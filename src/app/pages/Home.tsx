// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   MapPin,
//   Trophy,
//   Leaf,
//   Gift,
//   Heart,
//   Clock,
//   Users,
//   TreePine,
//   CheckCircle,
//   GraduationCap,
//   Briefcase,
//   Baby,
//   Star,
//   Medal,
//   Award,
// } from "lucide-react";
// import PopupModal from "../Components/Pop_up";

// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState("how-it-works");

//   return (
//     <div className="min-h-screen bg-background font-sans">
//       {/* Header */}
//       <PopupModal />

//       {/* Hero Section */}


//       {/* Popular Milestones Section */}
//       <section className="py-16 md:py-24 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//               What Milestones Are People Celebrating?
//             </h2>
//             <p className="text-muted-foreground max-w-2xl mx-auto">
//               From life-changing moments to personal victories, every
//               achievement deserves a lasting celebration.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 category: "Education & Career",
//                 icon: <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
//                 examples: [
//                   "College Graduation",
//                   "PhD Defense",
//                   "First Job",
//                   "Promotion",
//                   "Career Change",
//                 ],
//                 color: "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800",
//                 accent: "text-blue-800 dark:text-blue-200",
//               },
//               {
//                 category: "Life Events",
//                 icon: <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />,
//                 examples: [
//                   "Wedding Day",
//                   "New Baby",
//                   "Home Purchase",
//                   "Anniversary",
//                   "Retirement",
//                 ],
//                 color: "bg-pink-50 dark:bg-pink-900/10 border-pink-200 dark:border-pink-800",
//                 accent: "text-pink-800 dark:text-pink-200",
//               },
//               {
//                 category: "Personal Achievements",
//                 icon: <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />,
//                 examples: [
//                   "Fitness Goal",
//                   "Marathon Finish",
//                   "Recovery Milestone",
//                   "Creative Project",
//                   "Business Launch",
//                 ],
//                 color: "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800",
//                 accent: "text-yellow-800 dark:text-yellow-200",
//               },
//             ].map((category, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2 }}
//                 viewport={{ once: true }}
//                 className={`${category.color} rounded-xl p-6 border`}
//               >
//                 <div className="flex items-center gap-3 mb-4">
//                   {category.icon}
//                   <h3 className={`text-xl font-bold ${category.accent}`}>
//                     {category.category}
//                   </h3>
//                 </div>
//                 <ul className="space-y-2">
//                   {category.examples.map((example, i) => (
//                     <li
//                       key={i}
//                       className="flex items-center gap-2 text-foreground/80"
//                     >
//                       <div className="w-2 h-2 bg-primary rounded-full"></div>
//                       <span>{example}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="mt-4 text-sm text-muted-foreground">
//                   <span className="font-medium">Starting from ₹499</span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Custom Milestone CTA */}
//           <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-8 text-center border border-purple-200 dark:border-purple-800 mt-12">
//             <h3 className="text-2xl font-bold text-foreground mb-4">
//               🌟 Don&apos;t See Your Milestone?
//             </h3>
//             <p className="text-lg text-muted-foreground mb-4">
//               Every achievement is worth celebrating! We&apos;ll create a custom
//               milestone package for any special moment in your life.
//             </p>
//             <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
//               Create Custom Milestone
//             </button>
//           </div>
//         </div>
//       </section>


//     </div>
//   );
// }

import React, { useState } from 'react';
import Hero from '../Components/Home/Hero';
import AsSeenIn from '../Components/Home/AsSeenIn';
import Certifications from '../Components/Home/Certifications';
import Stats from '../Components/Home/Stats';
import Process from '../Components/Home/Process';
import GlobalMap from '../Components/Home/GlobalMap';
import Testimonials from '../Components/Home/Testimonials';
import ForestAssistant from '../Components/Home/ForestAssistant';
import Newsletter from '../Components/Home/Newsletter';
import PopupModal from '../Components/Pop_up';

const App: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow">
        <Hero />
        <AsSeenIn />
        <Certifications />
        <Stats />
        <Process />
        <GlobalMap />
        <Testimonials />
        <Newsletter />
      </main>


      {/* Floating Action Button for Gemini Forest Assistant */}
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-8 right-8 z-50 size-16 rounded-full bg-primary text-deep-forest shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">
          eco
        </span>
        <span className="absolute -top-2 -right-2 bg-white text-xs font-bold px-2 py-1 rounded-full text-deep-forest shadow-sm">AI</span>
      </button>
      <PopupModal />
      {isAssistantOpen && (
        <ForestAssistant onClose={() => setIsAssistantOpen(false)} />
      )}
    </div>
  );
};

export default App;
