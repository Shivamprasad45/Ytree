"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  BadgeIcon as Certificate,
  Leaf,
  Gift,
  Heart,
  Clock,
  Users,
  TreePine,
  CheckCircle,
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 -z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block -z-10">
          <Image
            src="https://media.istockphoto.com/id/1391173662/vector/customer-feedback-giving-rating-based-on-experience-or-quality-from-product-and-service.jpg?s=2048x2048&w=is&k=20&c=YHKml-eM5g5GdUwmtoDkLY00HPW3H-G5U6FeWVLlarc="
            alt="Forest view"
            width={800}
            height={800}
            className="object-cover h-full w-full opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-green-50/90" />
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
                  💭 &quot;I want to help the environment, but I don&apos;t know
                  where to start...&quot;
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-4">
                Make a Real Environmental Impact
              </h1>
              <p className="text-xl md:text-2xl text-green-700 mb-6 leading-relaxed">
                <span className="font-semibold">In just 2 minutes</span>, plant
                a real tree that will grow for decades — without getting your
                hands dirty.
              </p>

              {/* Value Proposition Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">
                      No Time Needed
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    We do all the planting, caring, and monitoring for you
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-green-800">
                      Track Your Tree
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Get GPS location, photos, and growth updates
                  </p>
                </div>
              </div>

              {/* Main CTA */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-lg mb-8 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  🌱 Here&apos;s How It Works:
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-200" />
                    <span>Choose a tree (starting at ₹299)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-200" />
                    <span>We plant it in our protected forest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-200" />
                    <span>You get updates & feel amazing!</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/Tree/Shop" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                    Plant My First Tree
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/Tree/Learnmore" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-white hover:bg-green-50 text-green-700 border-2 border-green-600 px-8 py-4 rounded-full font-bold text-lg transition-colors">
                    See How It Works
                  </button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>1,873+ happy tree parents</span>
                </div>
                <div className="flex items-center gap-1">
                  <TreePine className="w-4 h-4" />
                  <span>24,752 trees planted</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                We Get It. Environmental Action Feels Complicated.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Problems */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-4">
                  😔 Common Frustrations:
                </h3>
                <ul className="space-y-3 text-red-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      &quot;I don&apos;t have space to plant trees&quot;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      &quot;I don&apos;t know how to care for plants&quot;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      &quot;I&apos;m too busy to maintain a garden&quot;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>
                      &quot;I want to help but don&apos;t see the impact&quot;
                    </span>
                  </li>
                </ul>
              </div>

              {/* Solutions */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">
                  😊 VanaGrow Makes It Easy:
                </h3>
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>We plant in our dedicated forest space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Expert care by our forest team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Zero maintenance required from you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Track your tree&apos;s growth with photos</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Emotional Connection */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 text-center border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🌍 Imagine This Feeling...
              </h3>
              <p className="text-lg text-gray-700 mb-4 italic">
                &quot;I just planted a tree that will clean the air for 50+
                years. I can visit it, watch it grow, and my kids will see the
                forest I helped create. I made a real difference today.&quot;
              </p>
              <p className="text-green-600 font-semibold">
                That&apos;s the VanaGrow experience. Pure environmental impact,
                zero hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Process Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Plant a Tree in 3 Simple Steps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              No gardening experience needed. No tools required. Just genuine
              environmental impact.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  icon: <Gift className="w-8 h-8 text-white" />,
                  title: "Choose Your Tree",
                  description:
                    "Pick from native species like Neem, Banyan, or Mango. Each comes with a story and purpose.",
                  color: "bg-green-600",
                  time: "2 minutes",
                },
                {
                  step: "2",
                  icon: <Leaf className="w-8 h-8 text-white" />,
                  title: "We Plant & Care",
                  description:
                    "Our forest team plants your tree in our protected mini-forest and sends you the GPS location.",
                  color: "bg-blue-500",
                  time: "Within 7 days",
                },
                {
                  step: "3",
                  icon: <Heart className="w-8 h-8 text-white" />,
                  title: "Watch It Grow",
                  description:
                    "Get monthly photos, growth updates, and feel the satisfaction of your positive environmental impact.",
                  color: "bg-purple-500",
                  time: "For years to come",
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
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                Start My Environmental Journey
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </Link>
            <p className="text-gray-500 mt-4">
              Starting at just ₹299 • No hidden fees • Lifetime updates
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof & Impact */}
      <section id="impact" className="py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Join Thousands Making a Real Difference
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real people, real trees, real impact. Here&apos;s what our
              community has achieved together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                number: "24,752",
                label: "Trees Planted",
                description: "Each one growing stronger every day",
                icon: <TreePine className="w-8 h-8 text-green-600" />,
              },
              {
                number: "495",
                label: "Tons CO₂ Captured",
                description: "Equivalent to taking 200 cars off the road",
                icon: <Leaf className="w-8 h-8 text-green-600" />,
              },
              {
                number: "1,873",
                label: "Tree Parents",
                description: "People like you making it happen",
                icon: <Users className="w-8 h-8 text-green-600" />,
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
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-medium text-green-800 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">💚</div>
              <blockquote className="text-xl italic text-gray-700 mb-4">
                &quot;I planted my first tree 6 months ago and just got an
                update with photos. Seeing MY tree growing taller gave me
                chills. I&apos;ve already planted 3 more!&quot;
              </blockquote>

              <cite className="text-green-600 font-semibold">
                - Priya, Mumbai
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make Your Environmental Impact?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of people creating a greener future, one tree at a
              time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/Tree/Shop">
                <button className="bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-colors shadow-lg">
                  Plant My Tree Now
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </Link>
              <Link href="/Tree/Learnmore">
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-700 transition-colors">
                  Learn More First
                </button>
              </Link>
            </div>
            <p className="text-green-100 mt-6">
              No risk • Lifetime updates • Real impact
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
