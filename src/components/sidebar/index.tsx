"use client";

import { ReactNode, useCallback } from "react";

import {
  User,
  Home,
  UtensilsCrossed,
  BadgeIndianRupee,
  Settings,
  CookingPot,
  ClipboardClock,
  List,
  Users,
  Presentation,
  Headset,
} from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useProfileStore } from "@/store/profile.store";

type NavItemProps = {
  children: ReactNode;
  className?: string;
  active: boolean;
  icon: ReactNode;
  disable?: boolean;
  href: string;
};

export function NavItem({
  children,
  active,
  icon,
  href,
  className = "",
  disable = false,
}: NavItemProps) {
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(href)}
      className={`
        flex items-center rounded-md overflow-hidden transition-all duration-300
        ${
          active
            ? "bg-muted text-inherit!"
            : "hover:bg-muted hover:text-inherit"
        }
        ${disable ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      <div className="p-2.5 flex items-center justify-center">{icon}</div>

      <div
        className={`box-border w-48 transition-all duration-300 overflow-hidden`}
      >
        <div className="w-48">{children}</div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const active = useCallback(
    (path: string) => pathname.includes(path),
    [pathname]
  );

  const disable = false;

  return (
    <aside className="h-full overflow-hidden transition-all duration-300">
      <div className="flex flex-col gap-2 p-2 h-full">
        <NavItem
          icon={<Home size={20} />}
          href="/admin/dashboard/post"
          active={active("/post")}
          disable={disable}
        >
          <span className="text-sm">Post</span>
        </NavItem>
      </div>
    </aside>
  );
}
