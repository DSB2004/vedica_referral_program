import React, { ReactNode } from "react";
import { UsersStore } from "@/store/users.store";
export default function layout({ children }: { children: ReactNode }) {
  return <UsersStore>{children}</UsersStore>;
}
