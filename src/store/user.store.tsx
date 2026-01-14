"use client";

import React, { createContext, useContext, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions/user/get.action";
import { User } from "@/types";

interface UserStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  data?: User;
  error: Error | null;
}

const UserStoreContext = createContext<UserStoreInterface | null>(null);

function UserStoreContent({ children }: { children: React.ReactNode }) {
  const { isFetching, isError, isLoading, data, error } = useQuery<
    User | undefined
  >({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await getUser();
      return res.user;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <UserStoreContext.Provider
      value={{ isLoading, isError, isFetching, data, error }}
    >
      {children}
    </UserStoreContext.Provider>
  );
}

export const UserStore = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <UserStoreContent>{children}</UserStoreContent>
    </Suspense>
  );
};

export const useUserStore = () => {
  const ctx = useContext(UserStoreContext);
  if (!ctx) throw new Error("useUserStore must be used inside UserStore");
  return ctx;
};
