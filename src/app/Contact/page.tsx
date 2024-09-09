"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { Save_cot_user } from "@/action/action";

const ContactPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      <header className="p-6 bg-white shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">We’d Love to Hear From You</p>
        </div>
      </header>

      <main className="container mx-auto p-6 flex-grow">
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-12"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex-1"
            >
              <Image
                src="/About/Get in Touch Image.jpg"
                alt="Contact Us"
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex-1"
            >
              <p className="text-lg leading-7 mb-4">
                Feel free to reach out with any questions or inquiries. Our team
                is here to assist you and provide support.
              </p>
              <form
                action={async (formdata: FormData) => {
                  const name = formdata.get("name") as string;
                  const email = formdata.get("email") as string;
                  const message = formdata.get("message") as string;

                  if (!name || !email || !message) {
                    toast.error("Please provide all field");
                    return;
                  }
                  const err = await Save_cot_user({ email, name, message });

                  if (err) {
                    toast.error(String(err));
                  } else {
                    toast("Contact created succesfully");
                  }
                }}
                className="space-y-4"
              >
                <motion.div
                  className="flex flex-col space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6 }}
                >
                  <label htmlFor="name" className="text-lg font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="border rounded-lg p-2 w-full"
                  />
                </motion.div>
                <motion.div
                  className="flex flex-col space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <label htmlFor="email" className="text-lg font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="border rounded-lg p-2 w-full"
                  />
                </motion.div>
                <motion.div
                  className="flex flex-col space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <label htmlFor="message" className="text-lg font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="border rounded-lg p-2 w-full"
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Our Location</h2>
          <div className="flex flex-col items-center space-y-6">
            <p className="text-lg leading-7 text-center">
              We are located in the heart of the city. Feel free to visit us or
              reach out through the contact form above.
            </p>
            <Image
              src="/Contact/location.jpg"
              alt="Our Location"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full lg:w-[50vw]"
            />
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ContactPage;
