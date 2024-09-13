"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";
import MaxWidthRappers from "@/components/MaxWidthRapper";

// Mocking the Save_cot_user function
const Save_cot_user = async ({
  email,
  name,
  message,
}: {
  email: string;
  name: string;
  message: string;
}) => {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return null; // Simulating successful save
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      toast.error("Please provide all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const err = await Save_cot_user({ email, name, message });
      if (err) {
        toast.error(String(err));
      } else {
        toast.success("Message sent successfully!");
        setFormStep(1); // Move to thank you step
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      text: "123 Business Ave, City, Country",
    },
    { icon: <Mail className="w-6 h-6" />, text: "contact@example.com" },
    { icon: <Phone className="w-6 h-6" />, text: "+1 (555) 123-4567" },
  ];

  return (
    <MaxWidthRappers>
      <div className="min-h-screen max-w-4xl m-auto  bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
        <motion.header
          className="p-6 bg-white shadow-md"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-blue-600">Get in Touch</h1>
            <p className="mt-2 text-lg text-gray-600">
              We have here to help and answer any question you might have
            </p>
          </div>
        </motion.header>

        <main className="container mx-auto p-6 flex-grow flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <motion.div
              className="bg-white rounded-xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-blue-600 p-8 text-white">
                  <motion.h2
                    className="text-3xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Contact Information
                  </motion.h2>
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        {item.icon}
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </motion.div>
                  <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Contact illustration"
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  </motion.div>
                </div>
                <div className="md:w-1/2 p-8">
                  <AnimatePresence mode="wait">
                    {formStep === 0 ? (
                      <motion.form
                        key="contact-form"
                        action={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Label
                            htmlFor="name"
                            className="text-lg font-semibold"
                          >
                            Name
                          </Label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full"
                          />
                        </motion.div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <Label
                            htmlFor="email"
                            className="text-lg font-semibold"
                          >
                            Email
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full"
                          />
                        </motion.div>
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <Label
                            htmlFor="message"
                            className="text-lg font-semibold"
                          >
                            Message
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            className="w-full"
                          />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </motion.div>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="thank-you"
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-3xl font-bold text-green-600 mb-4">
                          Thank You!
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                          We have received your message and will get back to you
                          soon.
                        </p>
                        <Button
                          onClick={() => setFormStep(0)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <motion.section
          className="container mx-auto p-6 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Our Location
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Our Location"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <p className="text-lg leading-7 text-gray-600 text-center">
                  Visit us at our main office located in the heart of the city.
                  We are easily accessible and always ready to welcome you.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </MaxWidthRappers>
  );
}
