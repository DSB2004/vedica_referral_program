"use client";

import React from "react";
import Image from "next/image";
import { Copy } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const Hero = () => {
  const { data, isLoading, isFetching } = useUserStore();

  const loading = isLoading || isFetching;

  const handleCopy = async () => {
    if (!data?.referralCode) return;
    await navigator.clipboard.writeText(data.referralCode);
    toast.info("Referral Code copied to clipboard");
  };

  return (
    <div className="flex min-h-150 flex-col items-center justify-center gap-6 px-4">
      {/* Avatar / Skeleton */}
      {loading ? (
        <div className="h-56 w-56 animate-pulse rounded-full bg-muted" />
      ) : (
        <div className="relative h-56 w-56 overflow-hidden rounded-full">
          <Image
            src={data?.avatar || "/images/avatar-placeholder.png"}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Welcome text */}
      {loading ? (
        <div className="h-6 w-48 animate-pulse rounded bg-muted" />
      ) : (
        <h1 className="text-2xl font-semibold text-center">
          Welcome {data?.name ?? "👋"}
        </h1>
      )}

      {/* Referral code */}
      {loading ? (
        <div className="h-12 w-72 animate-pulse rounded bg-muted" />
      ) : (
        <div className="flex items-center justify-between gap-2 rounded-lg border px-4 py-2">
          <span className="font-mono ">{data?.referralCode}</span>
          <Button
            onClick={handleCopy}
            className=""
            variant={"ghost"}
            aria-label="Copy referral code"
          >
            <Copy size={16} />
          </Button>
        </div>
      )}

      {/* Registration count */}
      {loading ? (
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      ) : (
        <p className="text-sm text-muted-foreground">
          Total registrations:{" "}
          <span className="font-medium text-foreground">
            {data?.registrationCount ?? 0}
          </span>
        </p>
      )}
    </div>
  );
};
