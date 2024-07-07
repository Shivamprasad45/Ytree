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
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/app/Store/ConfigStore";
import { useCreateUserMutation } from "../AuthAPIS";
import { toast } from "sonner";

const formSchema = z.object({
  Username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function SignForm() {
  // ...useCreateUserMutation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Username: "",
      Email: "",
      password: "",
    },
  });
  const [signupUser, { data: Signupdata, isLoading: isCreating }] =
    useCreateUserMutation();

  if (Signupdata?.error) {
    console.log("OK i error");
    toast(Signupdata.error);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("click");
    await signupUser(values);
    // console.log(values);
    // dispatch(signupUserAsync(values) as any);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="Username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{isCreating ? "...Creating" : "Singup"}</Button>
      </form>
    </Form>
  );
}
