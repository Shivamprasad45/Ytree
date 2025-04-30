// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { TreeDeciduous } from "lucide-react";
// import Link from "next/link";

// const Hero = () => {
//   return (
//     <div className="relative overflow-hidden bg-gradient-to-b from-green-800 via-green-700 to-green-600 dark:from-green-900 dark:via-green-800 dark:to-green-700">
//       {/* Background elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 -left-10 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
//         <div className="absolute bottom-0 -right-10 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
//         <div className="absolute top-1/4 right-1/3 w-60 h-60 bg-yellow-100 rounded-full mix-blend-overlay filter blur-2xl opacity-20"></div>
//         <div className="absolute inset-0 bg-[url('/src/assets/trees-pattern.png')] opacity-5"></div>
//       </div>

//       {/* Hero content */}
//       <div className="relative container mx-auto px-4 py-16 md:py-24">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <div className="flex flex-col justify-center">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <span className="inline-block bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 text-sm font-medium px-3 py-1 rounded-full mb-6">
//                 🌱 A New Way To Plant Trees
//               </span>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//                 Plant Trees <br />
//                 <span className="text-green-200">Without Limitations</span>
//               </h1>
//               <p className="text-lg text-green-100 mb-8 max-w-lg">
//                 No space? No time? No problem. Contribute to reforestation and
//                 track your impact, even if you don't have a yard or time to care
//                 for trees.
//               </p>

//               <div className="flex flex-wrap gap-4">
//                 <Button
//                   asChild
//                   size="lg"
//                   className="bg-white hover:bg-green-50 text-green-800 px-6"
//                 >
//                   <Link href="/Tree/Shop">
//                     <TreeDeciduous className="mr-2 h-5 w-5" />
//                     Plant a Tree
//                   </Link>
//                 </Button>
//                 <Button
//                   asChild
//                   variant="outline"
//                   size="lg"
//                   className="border-green-200 text-green-100 hover:bg-green-700 hover:text-white"
//                 >
//                   <Link href="/Tree/Learnmore">How It Works</Link>
//                 </Button>
//               </div>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="flex items-center justify-center lg:justify-end relative"
//           >
//             <div className="relative w-full max-w-md">
//               <div className="absolute inset-0 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-3xl transform rotate-3 scale-105"></div>
//               <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1013&q=80"
//                   alt="Person planting a tree"
//                   className="w-full h-auto"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-white font-bold text-xl mb-2">
//                     Make a Real Impact
//                   </h3>
//                   <p className="text-green-100 text-sm mb-4">
//                     Our team plants and cares for trees in locations where
//                     they're needed most.
//                   </p>
//                   <div className="flex items-center space-x-4">
//                     <div className="flex -space-x-2">
//                       {[1, 2, 3].map((i) => (
//                         <div
//                           key={i}
//                           className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center border-2 border-white text-white text-xs"
//                         >
//                           🌳
//                         </div>
//                       ))}
//                     </div>
//                     <span className="text-sm text-green-200">
//                       Join 10,000+ tree planters
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
//           <path
//             fill="#f0fdf4"
//             fillOpacity="1"
//             d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,197.3C672,213,768,203,864,181.3C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//             className="fill-green-50 dark:fill-green-950"
//           ></path>
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default Hero;
