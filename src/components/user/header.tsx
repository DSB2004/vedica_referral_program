"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/actions/auth/logout.action";
import { useUserStore } from "@/store/user.store";
import { User } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const { data, isLoading } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();

    // clear cached user data
    queryClient.clear();

    // redirect to home or login
    router.push("/");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image alt="logo" src="/logo.png" height={100} width={100} />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {isLoading ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : data ? (
            <Link href="/dashboard">
              {data.avatar ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border bg-muted">
                  <Image
                    src={data.avatar}
                    alt="user"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </Link>
          ) : null}

          {/* Logout Button */}
          {pathname.startsWith("/dashboard") && (
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
