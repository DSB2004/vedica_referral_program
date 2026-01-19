"use client";

import React, { useCallback, useState } from "react";
import { Post } from "@/types";
import { cn } from "@/lib/utils";
import { Share2, Copy, Linkedin, Facebook, Instagram } from "lucide-react";

function ShareMenu({ url }: { url: string }) {
  const [open, setOpen] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
  };

  const encoded = encodeURIComponent(url);

  return (
    <div className="absolute top-3 right-3 z-50">
      <div className="flex">
        <button
          onClick={() => setOpen((p) => !p)}
          className="rounded-full ml-auto bg-black/70 p-2 text-white hover:bg-black transition "
        >
          <Share2 size={16} />
        </button>
      </div>

      <div
        className={`mt-2 w-40 ${
          open ? "max-h-48" : "max-h-0"
        } transition-all duration-100  rounded-md bg-background shadow-lg  overflow-hidden`}
      >
        <div className="max-h-48 overflow-hidden">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 hover:bg-muted text-sm"
          >
            <Facebook size={14} /> Facebook
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 hover:bg-muted text-sm"
          >
            <Linkedin size={14} /> LinkedIn
          </a>

          <button
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              window.open("https://www.instagram.com/", "_blank");
            }}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted text-sm"
          >
            <Instagram size={14} /> Instagram
          </button>

          <button
            onClick={copyToClipboard}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted text-sm"
          >
            <Copy size={14} /> Copy link
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeedPostCard({ post }: { post: Post }) {
  const { assets } = post;
  const [activeIndex, setActiveIndex] = useState(0);

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
    [assets.length],
  );

  return (
    <article className="rounded-xl mb-10 relative border bg-background overflow-hidden group">
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition z-20" />

      {post.sharableLink && <ShareMenu url={post.sharableLink} />}

      {assets.length > 0 && (
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="relative h-150 overflow-hidden outline-none focus:ring-2 focus:ring-primary"
        >
          <div
            className="h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateY(-${activeIndex * 100}%)` }}
          >
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="h-150 w-full flex items-center justify-center bg-muted relative overflow-hidden"
              >
                {asset.type === "VIDEO" ? (
                  <video
                    src={asset.url}
                    poster={asset.thumbnail || undefined}
                    preload="none"
                    autoPlay
                    muted
                    loop
                    className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
                  />
                ) : (
                  <img
                    src={asset.thumbnail || asset.url}
                    alt={post.title}
                    className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {assets.length > 1 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
              {assets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full bg-white/50",
                    activeIndex === index && "bg-white scale-125",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="absolute z-40 bottom-5 left-4 w-[90%] text-white opacity-0 group-hover:opacity-100 transition">
        <h2 className="text-lg font-semibold line-clamp-2">{post.title}</h2>
        <p className="text-sm line-clamp-2">{post.summary}</p>
      </div>
    </article>
  );
}
