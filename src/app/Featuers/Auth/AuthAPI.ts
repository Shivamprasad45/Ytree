"use client";
import axios from "axios";
import { EnterUser, LoginUser, UserMessage } from "../../../../type";

import { toast } from "sonner";

export async function SignupApi(data: EnterUser): Promise<any | undefined> {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `https://green-29u45vx8v-codewithharry35434gmailcoms-projects.vercel.app/api/auth/Signup`,
        data
      );

      // Check if the response status indicates a failure
      if (response.status !== 200) {
        throw new Error(`Signup failed with status: ${response.status}`);
      }

      // Extract the created user from the response data
      const Userdata: UserMessage = response.data;

      if (Userdata.message) {
        toast(Userdata.message);
        resolve(Userdata);
      }
      if (Userdata.error) {
        toast(Userdata.error);
      }
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
}

export async function LoginApi(data: LoginUser): Promise<any | undefined> {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `https://green-29u45vx8v-codewithharry35434gmailcoms-projects.vercel.app/api/auth/Login`,
        data
      );

      // Check if the response status indicates a failure
      if (response.status !== 200) {
        throw new Error(`Login failed with status: ${response.status}`);
      }

      // Extract the created user from the response data
      const Userdata: UserMessage = response.data;

      if (Userdata.message) {
        toast(Userdata.message);
        resolve(Userdata);
      }
      if (Userdata.error) {
        toast(Userdata.error);
      }
    } catch (error: any) {
      // Provide a more detailed error message
      const errorMessage = error.response?.data?.message || error.message;
      console.log(error);
      reject(new Error(`Login failed: ${errorMessage}`));
    }
  });
}
