/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import { login } from "@/action/action";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Login = () => {
  const route = useRouter();
  const { data: session, status } = useSession();

  if (session?.user) {
    route.push("/");
  }
  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-primary  dark:bg-black">
      <form
        className="my-8"
        action={async (formdata: FormData) => {
          const email = formdata.get("email") as string;
          const password = formdata.get("password") as string;

          if (!email || !password) {
            toast.error("Please provide all field");
            return;
          }
          const toastId = toast.loading("Logging in");
          const err = await login({ email, password });

          if (!err) {
            toast.success("Login successful", {
              id: toastId,
            });
            route.refresh();
          } else {
            toast.error(String(err), {
              id: toastId,
            });
          }
        }}
      >
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="Ram@gmail.com"
          type="email"
          name="email"
          className=" border-green-500"
        />

        <Label htmlFor="email">Password</Label>
        <Input
          id="password"
          placeholder="*************"
          type="password"
          name="password"
          className="mb-6 border-green-500"
        />

        <button className="bg-gradient-to-br relative group/btn  bg-primary dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
          Login &rarr;
        </button>

        <p className="text-right text-neutral-600 text-sm max-w-sm mt-4 dark:text-neutral-300">
          Dont have account? <Link href="/Signup">Register</Link>
        </p>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>

      <form className="">
        <div className="mx-auto space-y-2">
          <div className="flex space-x-2">
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                className="w-6 h-6"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </span>
            <p className="font-medium">Google</p>
          </div>
          <div className="flex space-x-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                className="w-6 h-6"
              >
                <path
                  fill="#3F51B5"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                ></path>
                <path
                  fill="#FFF"
                  d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                ></path>
              </svg>
            </span>
            <p className="font-medium">Facebook</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
