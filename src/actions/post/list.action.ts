"use server";

import { db } from "@/lib/prisma";
import { validateAdmin } from "../auth/get-admin.action";
import { ListPostsResponse } from "@/types";

type ListPostParams = {
  limit: number;
  page: number;
  onlyPublished: boolean;
  q?: string;
};

const listPost = async ({
  limit,
  page,
  onlyPublished,
  q,
}: ListPostParams): Promise<ListPostsResponse> => {
  await validateAdmin();

  const skip = limit * (page - 1);

  const whereClause: any = {
    isDeleted: false,
    ...(onlyPublished && { isPublished: true }),
    ...(q && { title: { contains: q, mode: "insensitive" } }),
  };

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where: whereClause,
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
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return {
    // @ts-ignore
    posts,
    page,
    limit,
    total,
    totalPages,
    prev,
    next,
    message: "Posts fetched successfully",
  };
};

export { listPost };
