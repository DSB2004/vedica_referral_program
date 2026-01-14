"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/actions/auth/logout-admin.action";
import { logout } from "@/actions/auth/logout.action";
export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between p-3 border-b">
      <h2 className="font-semibold">Vedica Referral Program</h2>
      {pathname === "/" ? (
        <>
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
        </>
      ) : (
        <></>
      )}

      {pathname.startsWith("/admin") ? (
        <>
          <Button variant={"destructive"} onClick={() => adminLogout()}>
            Logout
          </Button>
        </>
      ) : (
        <></>
      )}

      {pathname.startsWith("/dashboard") ? (
        <>
          <Button variant={"destructive"} onClick={() => logout()}>
            Logout
          </Button>
        </>
      ) : (
        <></>
      )}
    </header>
  );
}
