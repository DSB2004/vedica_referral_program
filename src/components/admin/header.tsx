"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/actions/auth/logout-admin.action";

import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between p-3 border-b">
      <Link href="/" className="flex items-center gap-2">
        <Image alt="logo" src="/logo.png" height={100} width={100} />
      </Link>

      {pathname.startsWith("/admin/dashboard") ? (
        <>
          <Button
            className="border-red-500 text-red-500 bg-white border hover:bg-white cursor-pointer"
            onClick={() => adminLogout()}
          >
            Logout
          </Button>
        </>
      ) : (
        <></>
      )}
    </header>
  );
}
