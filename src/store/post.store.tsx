"use client";

import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";
import { listPost } from "@/actions/post/list.action";
import { ListPostsResponse, Post } from "@/types";

interface PostsStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: ListPostsResponse | undefined;
  error: Error | null;
}

const PostsStoreContext = createContext<PostsStoreInterface | null>(null);

function PostsStoreContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const filter = useMemo(() => {
    return {
      page: Number(searchParams.get("page") || "1"),
      limit: Number(searchParams.get("limit") || "10"),
      q: searchParams.get("q") || undefined,
      onlyPublished: searchParams.get("onlyPublished") === "true" || false,
    };
  }, [searchParams]);

  const { isFetching, isError, isLoading, data, error } = useQuery<
    ListPostsResponse | undefined
  >({
    queryKey: ["posts", filter],
    queryFn: async () => {
      const res = await listPost(filter);

      return res;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <PostsStoreContext.Provider
      value={{ isLoading, isError, isFetching, data, error }}
    >
      {children}
    </PostsStoreContext.Provider>
  );
}

export const PostsStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <PostsStoreContent>{children}</PostsStoreContent>
    </Suspense>
  );
};

export const usePostsStore = () => {
  const ctx = useContext(PostsStoreContext);
  if (!ctx) throw new Error("usePostsStore must be used inside PostsStore");
  return ctx;
};
