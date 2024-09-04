import LoginForm from "@/app/Featuers/Auth/Components/Login";
import ResendVerifyForm from "@/app/Featuers/Auth/Components/Resend";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";

const Resend = () => {
  return (
    <MaxWidthRappers className="items-center flex justify-center pt-12">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Verify email</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Resend email</CardTitle>
              <CardDescription>
                Please check your email and verify
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ResendVerifyForm />
            </CardContent>
            <CardFooter className="justify-between">
              <Link href="/">Skip</Link>
              <Button>
                <Link href="/login">Login</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MaxWidthRappers>
  );
};

export default Resend;
