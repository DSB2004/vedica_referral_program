"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useUserStore();
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Benefits", href: "#benefits" },
    { name: "How to Apply", href: "#process" },
    { name: "Who Should Apply", href: "#apply" },
  ];
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { push } = useRouter();
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "bg-white shadow-md border-b border-border"
              : " bg-white md:bg-transparent"
          }
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image alt="logo" src="/logo.png" height={75} width={75} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {data ? (
              <Button size="sm" className="bg-burgundy hover:bg-burgundy/80">
                View Dashboard
              </Button>
            ) : (
              <>
                <div className="flex gap-2 items-center">
                  <div className="hidden md:flex items-center gap-3">
                    <Link href="/login">
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        size="sm"
                        className="bg-burgundy hover:bg-burgundy/80"
                      >
                        Apply Now
                      </Button>
                    </Link>
                  </div>

                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-foreground"
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-in">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* 🔼 FLOATING SCROLL TO TOP BUTTON */}
      {scrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-burgundy text-white p-3 shadow-lg hover:bg-burgundy/80 transition-all"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
};

export default Header;
