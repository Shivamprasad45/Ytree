"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="text-gray-900 min-h-screen flex flex-col max-w-6xl m-auto">
      <header className="p-6 bg-white shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">About Vanagrow</h1>
          <p className="mt-2 text-lg">Cultivating Sustainable Growth</p>
        </div>
      </header>

      <main className="container mx-auto p-6 flex-grow">
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-16 space-y-6 lg:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Vanagrow Mission"
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full lg:w-[30vw]"
              />
            </motion.div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-7">
                At <strong>Vanagrow</strong>, our mission is to revolutionize
                urban agriculture through innovative, sustainable solutions.
                We&apos;re dedicated to making growing your own food accessible,
                efficient, and enjoyable for everyone—from experienced gardeners
                to complete beginners. By combining cutting-edge technology with
                time-tested growing practices, we empower people to cultivate
                their own fresh produce regardless of space limitations.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between lg:space-x-16 space-y-6 lg:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Vanagrow Story"
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full lg:w-[30vw]"
              />
            </motion.div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-7">
                <strong>Vanagrow</strong> was founded in 2023 with a vision to
                address the growing challenges of food security and
                sustainability in urban environments. Our founder recognized
                that as cities expand and climate challenges intensify, people
                need better ways to grow their own food. Drawing from expertise
                in agriculture, technology, and sustainable design, we developed
                innovative growing systems that maximize yield while minimizing
                resource use. What began as a small experiment has blossomed
                into a movement to transform how urban dwellers connect with
                their food.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>
          <p className="text-lg leading-7 text-center mb-8">
            Vanagrow provides comprehensive solutions for urban agriculture,
            combining innovative growing systems with expert guidance and
            community support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-green-50 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-3">Growing Systems</h3>
              <p>
                Space-efficient vertical gardens, hydroponic setups, and smart
                planters designed for urban environments.
              </p>
            </motion.div>

            <motion.div
              className="bg-green-50 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-3">Smart Technology</h3>
              <p>
                Automated monitoring systems that track plant health, water
                levels, and nutrient needs for optimal growth.
              </p>
            </motion.div>

            <motion.div
              className="bg-green-50 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-3">Education</h3>
              <p>
                Comprehensive guides, workshops, and personalized advice to help
                you succeed in your growing journey.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="border border-green-200 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p>
                We design all our products and systems with minimal
                environmental impact, using recycled materials and reducing
                water consumption.
              </p>
            </motion.div>

            <motion.div
              className="border border-green-200 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p>
                We continuously research and develop new solutions that make
                growing food more efficient, accessible, and enjoyable.
              </p>
            </motion.div>

            <motion.div
              className="border border-green-200 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p>
                We believe in the power of shared knowledge and collective
                action to create more resilient food systems.
              </p>
            </motion.div>

            <motion.div
              className="border border-green-200 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-3">Education</h3>
              <p>
                We&apos;re committed to empowering people with the knowledge and
                skills to grow their own food successfully.
              </p>
            </motion.div>

            <motion.div
              className="border border-green-200 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p>
                We design solutions for people of all backgrounds, abilities,
                and living situations to enjoy growing food.
              </p>
            </motion.div>

            <motion.div
              className="border border-green-200 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p>
                We maintain the highest standards in our products, ensuring
                they&apos;re durable, effective, and user-friendly.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Team Member"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Alex Chen</h3>
              <p className="text-green-700">Founder & CEO</p>
              <p className="text-center mt-2">
                Agricultural engineer with a passion for sustainable urban
                development.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Team Member"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Maya Rodriguez</h3>
              <p className="text-green-700">Head of Product Development</p>
              <p className="text-center mt-2">
                Designer and plant scientist focused on creating intuitive
                growing systems.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Team Member"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold">Jordan Taylor</h3>
              <p className="text-green-700">Community Manager</p>
              <p className="text-center mt-2">
                Urban farming advocate with expertise in building educational
                programs.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Customer Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="italic mb-4">
                &quot;Vanagrow has completely transformed my tiny apartment
                balcony into a thriving garden. I&apos;m growing more vegetables
                than I ever thought possible in such a small space!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Customer"
                    width={50}
                    height={50}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">Sarah K.</p>
                  <p className="text-sm text-gray-600">
                    Urban Apartment Dweller
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="italic mb-4">
                &quot;As a teacher, I&apos;ve used Vanagrow&apos;s systems in my
                classroom to teach students about biology, sustainability, and
                nutrition. The support from their team has been
                incredible!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Customer"
                    width={50}
                    height={50}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">Michael T.</p>
                  <p className="text-sm text-gray-600">
                    High School Science Teacher
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg leading-7 mb-6">
              Have questions about our products or want to learn more about how
              Vanagrow can help you start your growing journey? We&apos;d love
              to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/products"
                className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Explore Our Products
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-green-50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Vanagrow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
