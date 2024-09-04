"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className=" text-gray-900 min-h-screen flex flex-col">
      <header className="p-6 bg-white shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">Bringing Nature Closer to You</p>
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
                src="/About/mission.jpg"
                alt="Our Mission"
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full lg:w-[30vw]"
              />
            </motion.div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-7">
                At <strong>Yplant</strong>, our mission is to make plant care
                easy, fun, and accessible for everyone. Whether you’re a
                seasoned gardener or just starting your green journey, we
                provide the tools and knowledge to help your plants thrive.
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
                src="/About/story.jpg"
                alt="Our Story"
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full lg:w-[30vw]"
              />
            </motion.div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-7">
                Founded in 2024, <strong>Your Site Name</strong> was born out of
                a desire to bring more green into urban spaces. Our founder,
                Shivam Prasad, realized that many people wanted to grow plants
                but didn’t know where to start. With a background in CSE, Shivam
                set out to create a platform that not only sells plants but also
                empowers users with personalized care advice.
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
          <p className="text-lg leading-7 text-center">
            We offer a wide range of indoor and outdoor plants, along with all
            the necessary tools and tips to keep them healthy. Our unique
            feature is personalized plant care recommendations based on your
            local weather conditions.
          </p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          <ul className="list-disc pl-6 text-lg leading-7 space-y-2">
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Sustainability
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Customer Satisfaction
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Innovation
            </motion.li>
          </ul>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Meet the Team</h2>
          <div className="flex flex-col items-center space-y-6">
            <p className="text-lg leading-7 text-center">
              Our team is made up of passionate individuals who love plants and
              are dedicated to helping you grow your green space.
            </p>
            <Image
              src="/About/Team.jpg"
              alt="Our Team"
              width={500}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full lg:w-[30vw]"
            />
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
          <div className="flex flex-col items-center space-y-6">
            <p className="text-lg leading-7 text-center">
              {`"Your Site Name has transformed my home into a green oasis. The personalized care tips are a game-changer!"`}
            </p>
            <Image
              src="/About/Customer Testimonials Image.jpg"
              alt="Customer Testimonial"
              width={500}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full lg:w-[30vw]"
            />
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
          <div className="text-center">
            <p className="text-lg leading-7">
              If you have any questions, feel free to reach out to us. We are
              here to help you every step of the way.
            </p>
            <Link
              href="/Contact"
              className="text-green-600 font-semibold hover:underline mt-4 block"
            >
              Contact Us
            </Link>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Your Site Name. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
