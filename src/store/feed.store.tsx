"use client";

import React, { createContext, useContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFeed } from "@/actions/post/feed.action";
import { Post } from "@/types";

interface FeedStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  posts: Post[];
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const FeedStoreContext = createContext<FeedStoreInterface | null>(null);

export const FeedStore = ({ children }: { children: React.ReactNode }) => {
  const {
    data,
    isFetching,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage = false,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: async ({ pageParam = 1 }) => {
      return fetchFeed({
        limit: 10,
        pageCursor: pageParam,
      });
    },

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNext) return undefined;
      return allPages.length + 1; 
    },

    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <FeedStoreContext.Provider
      value={{
        isLoading,
        isError,
        isFetching,
        posts,
        error: error as Error | null,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      }}
    >
      {children}
    </FeedStoreContext.Provider>
  );
};

export const useFeedStore = () => {
  const ctx = useContext(FeedStoreContext);
  if (!ctx) {
    throw new Error("useFeedStore must be used inside FeedStore");
  }
  return ctx;
};
