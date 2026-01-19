import React from "react";
import Search from "@/components/common/search";
import { Table } from "@/components/admin/user/table";
import Grid from "@/components/admin/post/grid";
export default function page() {
  return (
    <>
      <h2 className="text-2xl font-semibold">Users</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search></Search>
        </div>
      </div>
      <Table />
    </>
  );
}
