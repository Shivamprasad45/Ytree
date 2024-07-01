"use server";
import { cookies } from "next/headers";

export default async function Ai() {
  const cookieStore = cookies();
  const id = cookieStore.get("id");
  return id;
}
