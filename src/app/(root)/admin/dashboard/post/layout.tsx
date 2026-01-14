import React, { ReactNode } from "react";
import { PostsStore } from "@/store/post.store";
export default function layout({ children }: { children: ReactNode }) {
  return <PostsStore>{children}</PostsStore>;
}
