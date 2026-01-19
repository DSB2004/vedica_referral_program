"use client";

import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";
import { listUsers } from "@/actions/user/list.action";
import { ListUsersResponse, User } from "@/types";

interface UsersStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data: ListUsersResponse | undefined;
  error: Error | null;
}

const UsersStoreContext = createContext<UsersStoreInterface | null>(null);

function UsersStoreContent({ children }: { children: React.ReactNode }) {
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
    ListUsersResponse | undefined
  >({
    queryKey: ["users", filter],
    queryFn: async () => {
      const res = await listUsers(filter);

      return res;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <UsersStoreContext.Provider
      value={{ isLoading, isError, isFetching, data, error }}
    >
      {children}
    </UsersStoreContext.Provider>
  );
}

export const UsersStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <UsersStoreContent>{children}</UsersStoreContent>
    </Suspense>
  );
};

export const useUsersStore = () => {
  const ctx = useContext(UsersStoreContext);
  if (!ctx) throw new Error("useUsersStore must be used inside UsersStore");
  return ctx;
};
