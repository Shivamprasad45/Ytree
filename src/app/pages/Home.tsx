"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Trophy,
  Leaf,
  Gift,
  Heart,
  Clock,
  Users,
  TreePine,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Baby,
  Star,
  Medal,
  Award,
} from "lucide-react";
import PopupModal from "../Components/Pop_up";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("how-it-works");

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <PopupModal />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-100 -z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block -z-10">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop"
            alt="Achievement celebration with forest"
            width={800}
            height={800}
            className="object-cover h-full w-full opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-emerald-50/90" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Problem Hook */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
                <p className="text-amber-800 font-medium">
                  💭 &quot;How do I celebrate my achievement in a meaningful way
                  that lasts?&quot;
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-800 mb-4">
                Celebrate Milestones with Living Legacies
              </h1>
              <p className="text-xl md:text-2xl text-emerald-700 mb-6 leading-relaxed">
                <span className="font-semibold">Mark your achievements</span>{" "}
                with a tree that grows for decades — creating a lasting legacy
                in our protected forest.
              </p>

              {/* Milestone Examples */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-emerald-100 text-center">
                  <GraduationCap className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-emerald-800">
                    Graduation
                  </span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-emerald-100 text-center">
                  <Briefcase className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-emerald-800">
                    New Job
                  </span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-emerald-100 text-center">
                  <Baby className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-emerald-800">
                    New Baby
                  </span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md border border-emerald-100 text-center">
                  <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                  <span className="text-sm font-medium text-emerald-800">
                    Achievement
                  </span>
                </div>
              </div>

              {/* Main Value Prop */}
              <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl p-6 shadow-lg mb-8 text-white">
                <h3 className="text-2xl font-bold mb-3">
                  🌳 Your Milestone Tree Includes:
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-200" />
                    <span>Custom milestone plaque with your story</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-200" />
                    <span>GPS location pinned on our forest map</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-200" />
                    <span>Lifetime growth updates & photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-200" />
                    <span>Digital certificate to share & display</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/Tree/Shop" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                    Celebrate My Milestone
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/Tree/Learnmore" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-600 px-8 py-4 rounded-full font-bold text-lg transition-colors">
                    Explore Forest Map
                  </button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>2,847+ milestones celebrated</span>
                </div>
                <div className="flex items-center gap-1">
                  <TreePine className="w-4 h-4" />
                  <span>Growing legacy forest</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Milestones Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Milestones Are People Celebrating?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From life-changing moments to personal victories, every
              achievement deserves a lasting celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Education & Career",
                icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
                examples: [
                  "College Graduation",
                  "PhD Defense",
                  "First Job",
                  "Promotion",
                  "Career Change",
                ],
                color: "bg-blue-50 border-blue-200",
                accent: "text-blue-800",
              },
              {
                category: "Life Events",
                icon: <Heart className="w-8 h-8 text-pink-600" />,
                examples: [
                  "Wedding Day",
                  "New Baby",
                  "Home Purchase",
                  "Anniversary",
                  "Retirement",
                ],
                color: "bg-pink-50 border-pink-200",
                accent: "text-pink-800",
              },
              {
                category: "Personal Achievements",
                icon: <Trophy className="w-8 h-8 text-yellow-600" />,
                examples: [
                  "Fitness Goal",
                  "Marathon Finish",
                  "Recovery Milestone",
                  "Creative Project",
                  "Business Launch",
                ],
                color: "bg-yellow-50 border-yellow-200",
                accent: "text-yellow-800",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`${category.color} rounded-xl p-6 border`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h3 className={`text-xl font-bold ${category.accent}`}>
                    {category.category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.examples.map((example, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-gray-600">
                  <span className="font-medium">Starting from ₹499</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Milestone CTA */}
          <div className="bg-gradient-to-r from-purple-50 to-emerald-50 rounded-xl p-8 text-center border border-purple-200 mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🌟 Don&apos;t See Your Milestone?
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Every achievement is worth celebrating! We&apos;ll create a custom
              milestone package for any special moment in your life.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              Create Custom Milestone
            </button>
          </div>
        </div>
      </section>

      {/* How It Works - Milestone Focus */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Celebrate Your Milestone in 3 Steps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Turn your achievement into a growing legacy that you can visit,
              share, and watch flourish for decades.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  icon: <Award className="w-8 h-8 text-white" />,
                  title: "Share Your Story",
                  description:
                    "Tell us about your milestone and choose a tree species. We'll create a personalized plaque with your achievement story.",
                  color: "bg-emerald-600",
                  time: "5 minutes",
                },
                {
                  step: "2",
                  icon: <Leaf className="w-8 h-8 text-white" />,
                  title: "We Plant & Pin",
                  description:
                    "Your milestone tree gets planted in our protected forest with a GPS-tagged location and your custom story plaque.",
                  color: "bg-blue-500",
                  time: "Within 10 days",
                },
                {
                  step: "3",
                  icon: <MapPin className="w-8 h-8 text-white" />,
                  title: "Track Your Legacy",
                  description:
                    "Visit your tree on our interactive map, get growth updates, and share your living legacy with friends and family.",
                  color: "bg-purple-500",
                  time: "Lifetime access",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 z-10" />
                  )}

                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
                    <div className={`${item.color} p-6 text-center`}>
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        {item.icon}
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">
                        Step {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <div className="text-white/80 text-sm mt-2">
                        {item.time}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA in Process Section */}
          <div className="text-center mt-12">
            <Link href="/Tree/Shop">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                Plant My Milestone Tree
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </Link>
            <p className="text-gray-500 mt-4">
              Milestone packages from ₹499 • Custom plaques included • Lifetime
              updates
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories & Forest Map Preview */}
      <section id="impact" className="py-16 md:py-24 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              A Growing Forest of Achievements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every tree tells a story of success, growth, and celebration.
              Explore the milestones that make up our legacy forest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                number: "2,847",
                label: "Milestones Celebrated",
                description: "Each tree marking a special achievement",
                icon: <Medal className="w-8 h-8 text-emerald-600" />,
              },
              {
                number: "847",
                label: "Graduation Trees",
                description: "Celebrating educational achievements",
                icon: <GraduationCap className="w-8 h-8 text-emerald-600" />,
              },
              {
                number: "1,329",
                label: "Life Event Trees",
                description: "Marking life's precious moments",
                icon: <Heart className="w-8 h-8 text-emerald-600" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-medium text-emerald-800 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Featured Success Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    Medical School Graduation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Dr. Ananya Sharma • Planted March 2024
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                &quot; After 6 years of studies, planting this Neem tree felt
                like the perfect way to mark becoming a doctor. Now when
                I&apos;m having tough days, I look at the photos of
                &apos;my&apos; tree growing strong and remember why I started
                this journey.&quot;
              </blockquote>

              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <MapPin className="w-4 h-4" />
                <span>View on Forest Map →</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Baby className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Baby Girl Born</h4>
                  <p className="text-sm text-gray-600">
                    Rajesh & Priya Gupta • Planted June 2024
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                &quot;We planted a Banyan tree when our daughter Arya was born.
                The idea that she&apos;ll grow up alongside this tree, and maybe
                bring her own children to see it someday, makes us emotional
                every time we get the updates.&quot;
              </blockquote>

              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <MapPin className="w-4 h-4" />
                <span>View on Forest Map →</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Teaser */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              🗺️ Explore Our Interactive Forest Map
            </h3>
            <p className="text-lg mb-6 opacity-90">
              See every milestone tree, read their stories, and find inspiration
              for your own celebration. Each pin represents someone&apos;s proud
              moment growing into a lasting legacy.
            </p>
            <Link href="/Tree/Map">
              <button className="bg-white text-emerald-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg">
                Explore Forest Stories
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Achievement Will You Celebrate Next?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Don&apos;t let your milestone pass by unmarked. Create a living
              legacy that grows stronger every year, just like your
              achievement&apos;s impact on your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/Tree/Shop">
                <button className="bg-white text-emerald-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg">
                  Celebrate My Milestone
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </Link>
              <Link href="/Tree/Map">
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-700 transition-colors">
                  Browse Success Stories
                </button>
              </Link>
            </div>
            <p className="text-emerald-100 mt-6">
              Custom milestone packages • GPS tracking • Lifetime legacy
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
