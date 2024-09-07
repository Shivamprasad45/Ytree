"use server";
import { cookies } from "next/headers";

export default async function Check_data() {
  const cookieStore = cookies();
  const theme = cookieStore.get("authjs.session-token");
  return theme;
}
