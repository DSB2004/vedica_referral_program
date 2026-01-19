"use client";

import React, { useState, useCallback } from "react";
import { Post } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link, Archive, Trash2 } from "lucide-react";
import UpdatePostDialog from "./update";
import { PostPublishedDialog } from "./archive";
import { PostDeleteDialog } from "./delete";
type PostCardProps = {
  post?: Post;
  loading?: boolean;
};

export function PostCard({ post, loading }: PostCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading || !post) {
    return (
      <div className="border rounded-lg p-4 flex flex-col gap-2 animate-pulse">
        <Skeleton className="h-72 w-full rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
      </div>
    );
  }

  const assets = post.assets.slice(0, 5);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!assets.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, assets.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    },
    [assets.length]
  );

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      {/* Media Carousel */}
      {assets.length > 0 && (
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="relative h-150 overflow-hidden rounded-md outline-none focus:ring-2 focus:ring-primary"
        >
          {/* Slides */}
          <div
            className="h-full transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateY(-${activeIndex * 100}%)`,
            }}
          >
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="bg-muted h-150 w-full flex items-center justify-center"
              >
                {asset.type === "VIDEO" ? (
                  <video
                    src={asset.url}
                    poster={asset.thumbnail}
                    preload="none"
                    controls
                    autoPlay
                    muted
                    className="h-auto max-h-150 w-full object-cover"
                  />
                ) : (
                  <img
                    src={asset.thumbnail || asset.url}
                    alt={post.title}
                    className="h-auto max-h-150 w-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Dot Navigation */}
          {assets.length > 1 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {assets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full bg-white/50 transition-all",
                    activeIndex === index && "bg-white scale-125"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-3">
        {post.summary}
      </p>

      <div className="mt-auto flex justify-between items-center pt-2">
        <span className="text-xs text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2 items-center">
          <UpdatePostDialog post={post}></UpdatePostDialog>
          <PostPublishedDialog {...post}></PostPublishedDialog>
          <PostDeleteDialog {...post}></PostDeleteDialog>
          {post.sharableLink && (
            <a
              href={post.sharableLink}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              <Link size={15}></Link>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
