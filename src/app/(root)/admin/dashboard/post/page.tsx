import React from "react";
import Search from "@/components/common/search";
import CreatePostDialog from "@/components/post/create";
import Grid from "@/components/post/grid";
import Published from "@/components/post/published";
export default function page() {
  return (
    <>
      <h2 className="text-2xl font-semibold">Post</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search></Search>
          <Published></Published>
        </div>

        <CreatePostDialog></CreatePostDialog>
      </div>
      <Grid></Grid>
    </>
  );
}
