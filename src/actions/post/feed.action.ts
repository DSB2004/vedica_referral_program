"use server";

import { db } from "@/lib/prisma";
import { Post } from "@/types";

export const fetchFeed = async ({
  limit,
  pageCursor = 1,
}: {
  limit: number;
  pageCursor?: number;
}): Promise<{ posts: Post[]; hasNext: boolean }> => {
  const skip = limit * (pageCursor - 1);

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where: {
        isPublished: true,
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        assets: true,
      },
    }),
    db.post.count({
      where: {
        isPublished: true,
      },
    }),
  ]);

  const hasNext = skip + posts.length < total;

  return {
    // @ts-ignore
    posts,
    hasNext,
  };
};
