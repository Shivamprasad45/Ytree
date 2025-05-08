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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-4">
                🌿 Fulfillment
              </h1>
              <p className="text-xl md:text-2xl text-green-700 mb-8 leading-relaxed">
                The deep satisfaction of making a real difference for the planet
                — even when you can&#39;t plant a tree yourself.
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                At Vanagrow, we understand that life gets busy. Not everyone has
                the time, space, or tools to plant a tree — but everyone wants
                to make a difference.
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100 mb-8">
                <p className="text-xl font-medium text-green-800 mb-2">
                  That&#39;s why we created Vanagrow:
                </p>
                <p className="text-2xl font-bold text-green-600">
                  Buy a plant, and we&#39;ll plant it for you in our dedicated
                  mini-forest.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/Tree/Shop" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg">
                    Start Planting
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/Tree/Learnmore" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-white hover:bg-green-50 text-green-700 border-2 border-green-600 px-8 py-4 rounded-full font-bold text-lg transition-colors">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Happens Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              🌱 What Happens After You Buy a Plant?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your journey to making a difference begins with a simple purchase,
              but the impact lasts for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-8 h-8 text-white" />,
                title: "We plant your tree",
                description:
                  "We plant your tree in our Vanagrow mini-forest — a growing ecosystem of life.",
                color: "bg-green-600",
              },
              {
                icon: <MapPin className="w-8 h-8 text-white" />,
                title: "You get the location",
                description:
                  "You get the GPS location, photo, and certificate of your tree.",
                color: "bg-blue-500",
              },
              {
                icon: <Gift className="w-8 h-8 text-white" />,
                title: "We care for it",
                description:
                  "We care for it, monitor the weather, and send you meaningful updates.",
                color: "bg-amber-500",
              },
              {
                icon: <Certificate className="w-8 h-8 text-white" />,
                title: "You earn eco-coins",
                description:
                  "You earn eco-coins and track your positive impact on our platform.",
                color: "bg-purple-500",
              },
              {
                icon: <Heart className="w-8 h-8 text-white" />,
                title: "You feel fulfillment",
                description:
                  "You feel the fulfillment of doing your part for a greener world — effortlessly.",
                color: "bg-red-500",
              },
              {
                icon: <ArrowRight className="w-8 h-8 text-white" />,
                title: "Spread the word",
                description:
                  "Share your impact with friends and inspire others to join the movement.",
                color: "bg-teal-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`${item.color} p-6`}>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Visualization */}
      <section id="impact" className="py-16 md:py-24 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Your Impact Matters
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every tree planted contributes to a healthier planet. Here&#39;s
              how your contribution makes a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "24,752",
                label: "Trees Planted",
                description: "And growing every day with your help",
              },
              {
                number: "495",
                label: "Tons CO₂ Captured",
                description: "Directly offsetting carbon emissions",
              },
              {
                number: "1,873",
                label: "Community Members",
                description: "Growing our forest together",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-8 text-center"
              >
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
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
