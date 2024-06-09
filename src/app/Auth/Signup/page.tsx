"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../../Featuers/Auth/Components/Login";

import SignForm from "../../Featuers/Auth/Components/Signup";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { loginSelector, signupSelector } from "../../Featuers/Auth/AuthSlice";
import { UserMessage } from "../../../../type";

import MaxWidthRappers from "@/components/MaxWidthRapper";

export default function TabsDemo() {
  const router = useRouter();

  const user: UserMessage | null = useSelector(signupSelector);

  if (user && user.success) {
    router.push("/Login");
  }
  const Login = useSelector(loginSelector);

  if (Login && Login.success) {
    router.push("/");
  }
  // console.log(user.success, "User");
  return (
    <MaxWidthRappers className="items-center flex justify-center pt-12">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Sign up</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when youre done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SignForm />
            </CardContent>
            <CardFooter>Fill it freely</CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Please fill your form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <LoginForm />
            </CardContent>
            <CardFooter>Fill it freely</CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MaxWidthRappers>
  );
}
