import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-black p-2 flex-col gap-2 flex items-center justify-center">
      <h2 className="text-gold font-semibold">
        Copyright © Vedica Fellows Programme 2026
      </h2>
      <Link href="https://makeamine.com/" className="text-muted text-sm">
        Developed By MakeAMine
      </Link>
    </footer>
  );
}
