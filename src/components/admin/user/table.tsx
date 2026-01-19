"use client";

import React from "react";
import { useUsersStore } from "@/store/users.store";

import { Pagination } from "../../common/pagination";
import { UserDeleteDialog } from "./delete";
import {
  Table as TableWrapper,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserStore } from "@/store/user.store";
import TableSkeleton from "./skeleton.";
export function Table() {
  const { isLoading, isFetching, data } = useUsersStore();
  return (
    <>
      <TableWrapper>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Referral Code</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading || isFetching || !data ? (
            <>
              <TableSkeleton></TableSkeleton>
              <TableSkeleton></TableSkeleton>
              <TableSkeleton></TableSkeleton>
            </>
          ) : (
            <>
              {data?.users.map((user) => (
                <TableRow key={user.publicId}>
                  <TableCell className="font-medium max-w-40 truncate whitespace-nowrap">
                    {user.publicId}
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.referralCode}</TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <UserDeleteDialog {...user}></UserDeleteDialog>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </TableWrapper>
      <div className="col-span-full mt-4">
        {data && <Pagination {...data} />}
      </div>
    </>
  );
}
