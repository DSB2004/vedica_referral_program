"use client";

import React from "react";
import { usePostsStore } from "@/store/post.store";
import { PostCard } from "./card";
import { Pagination } from "../../common/pagination";

export default function Grid() {
  const { data, isLoading } = usePostsStore();

  if (!data && isLoading) {
    const skeletons = Array.from({ length: 8 });

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skeletons.map((_, i) => (
          <PostCard key={i} loading />
        ))}
      </div>
    );
  }
  if (!data && !isLoading)
    return (
      <div className="my-5 text-center text-sm text-muted-foreground">
        No posts found
      </div>
    );

  return (
    <>
      {data?.posts.length === 0 ? (
        <>
          <div className="my-5 text-center text-sm text-muted-foreground">
            No posts found
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        <div className="col-span-full mt-4">
          {data && <Pagination {...data} />}
        </div>
      </div>
    </>
  );
}
