"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResend_email_verificationMutation } from "../AuthAPIS";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const formSchema = z.object({
  ResendEmail: z.string().email().nonempty("Email is required"),
});

export default function ResendVerifyForm() {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [start, setStart] = useState<number>(60); // Set initial countdown to 60 seconds
  const [Resend_verification, { data: Logindata, isLoading: Resendloading }] =
    useResend_email_verificationMutation();

  useEffect(() => {
    if (Logindata?.success) {
      toast(Logindata.message);
    }
    if (Logindata?.error) {
      toast(Logindata.error);
    }
  }, [Logindata]);

  useEffect(() => {
    if (start <= 0 && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [start, intervalId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ResendEmail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setStart(60); // Reset the countdown to 60 seconds

    const newIntervalId = setInterval(() => {
      setStart((prevStart) => prevStart - 1);
    }, 1000);

    setIntervalId(newIntervalId);

    try {
      await Resend_verification(values.ResendEmail).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="ResendEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={intervalId !== null}>
          {Resendloading ? "....Sending" : "Send"}
        </Button>

        <div className="flex justify-between pt-6">
          <p>{start}</p>
          <div className="">Resend</div>
        </div>
      </form>
    </Form>
  );
}
