"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import MaxWidthWrapper from "../Components/Anothers/MaxWidthWrapper";

// Mocking the Save_contact_user function
const Save_contact_user = async ({
  email,
  name,
  message,
}: {
  email: string;
  name: string;
  message: string;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return null;
};

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      const err = await Save_contact_user({ email, name, message });
      if (err) {
        toast.error(String(err));
      } else {
        toast.success("Message sent successfully!");
        setFormStep(1);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Address",
      text: "A-12, SG Highway, Ahmedabad, Gujarat, India",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      text: "vanagrow@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      text: "+91 8303367981",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <MaxWidthWrapper>
        <div className="py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We&#39;re here to help and answer any
              questions you might have.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Contact Information Card */}
            <Card className="lg:col-span-4 shadow-lg border-0 bg-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 mt-1 bg-primary-foreground/20 p-2 rounded-full">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        <p className="mt-1">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <h3 className="font-semibold mb-3">Follow Us</h3>
                  <div className="flex space-x-3">
                    {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
                      (platform, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 cursor-pointer transition-colors"
                        >
                          {/* Icons would go here */}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Card */}
            <Card className="lg:col-span-8 shadow-lg border-0">
              <CardContent className="p-6 sm:p-8">
                {formStep === 0 ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6">
                      Send us a message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-base font-medium"
                          >
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="h-11"
                            autoComplete="name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-base font-medium"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="h-11"
                            autoComplete="email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-base font-medium"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="How can we help you?"
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="w-full sm:w-auto px-8 h-11"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-green-100 mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-primary mb-4">
                      Thank You!
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                      Your message has been sent successfully. We&#39;ll get
                      back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setFormStep(0)}
                      variant="outline"
                      className="px-6"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Our Location
            </h2>
            <Card className="shadow-lg border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[21/9] w-full relative bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117423.7552953445!2d72.4498632!3d23.022604999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1654285380000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  ></iframe>
                </div>
                <div className="p-6 bg-card">
                  <p className="text-center text-muted-foreground">
                    Visit us at our main office located in the heart of
                    Ahmedabad. We are easily accessible from the major landmarks
                    of the city.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "How quickly do you respond to inquiries?",
                  a: "We strive to respond to all inquiries within 24 business hours.",
                },
                {
                  q: "What are your business hours?",
                  a: "We are available Monday to Friday, 9:00 AM to 6:00 PM IST.",
                },
                {
                  q: "Do you offer any support on weekends?",
                  a: "We offer limited support on weekends for urgent matters via email.",
                },
                {
                  q: "Can I schedule a meeting with your team?",
                  a: "Yes, you can request a meeting through our contact form or by directly emailing us.",
                },
              ].map((faq, i) => (
                <Card
                  key={i}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Index;
