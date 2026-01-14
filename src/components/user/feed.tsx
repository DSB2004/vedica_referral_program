"use client";

import React, { useEffect, useRef } from "react";
import { useFeedStore } from "@/store/feed.store";
import FeedPostCard from "./card";
import FeedSkeleton from "./skeleton";

export default function FeedSection() {
  const { posts, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFeedStore();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (!posts.length) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        No posts available
      </div>
    );
  }

  return (
    <>
      <section className="p-10 flex gap-10 flex-col">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Our Recent Feed
          </h2>
          <p className="text-muted-foreground mt-2">
            Explore what's new and trending
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  w-[90%] lg:w-[80%] m-auto ">
          {posts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}

          {/* Load more trigger */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="py-6 text-center">
              {isFetchingNextPage && (
                <span className="text-sm text-muted-foreground">
                  Loading more posts…
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
