"use server";

import { db } from "@/lib/prisma";
import { validateAdmin } from "../auth/get-admin.action";
import { ListUsersResponse } from "@/types";

type ListUserParams = {
  limit: number;
  page: number;
  onlyPublished: boolean;
  q?: string;
};

const listUsers = async ({
  limit,
  page,
  onlyPublished,
  q,
}: ListUserParams): Promise<ListUsersResponse> => {
  await validateAdmin();

  const skip = limit * (page - 1);

  const whereClause: any = {
    ...(q && { name: { contains: q, mode: "insensitive" } }),
  };

  const [users, total] = await Promise.all([
    db.user.findMany({
      where: whereClause,
      take: limit,
      skip,
      select: {
        id: true,
        avatar: true,
        name: true,
        email: true,
        publicId: true,
        referralCode: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    db.user.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return {
    users,
    page,
    limit,
    total,
    totalPages,
    prev,
    next,
    message: "Users fetched successfully",
  };
};

export { listUsers };
