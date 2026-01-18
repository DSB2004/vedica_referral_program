import { isValidateUser } from "@/actions/auth/get.action";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const user = await isValidateUser();

  if (user) redirect("/dashboard");
  return <>{children}</>;
}
