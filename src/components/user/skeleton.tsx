"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function FeedSkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  w-[90%] lg:w-[80%] m-auto ">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="border rounded-lg p-4 flex flex-col gap-2 animate-pulse">
          <Skeleton className="h-72 w-full rounded-md" />
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>
      ))}
    </section>
  );
}
