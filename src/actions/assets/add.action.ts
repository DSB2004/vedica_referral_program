"use server";

import { db } from "@/lib/prisma";
import { AssetType } from "@/lib/prisma";

export const addAsset = async ({
  postId,
  thumbnail,
  url,
  type = AssetType.IMAGE,
}: {
  postId: string;
  thumbnail: string;
  url: string;
  type?: AssetType;
}) => {
  const asset = await db.postAsset.create({
    data: {
      postId,
      url: url,
      thumbnail: thumbnail,
      type,
    },
  });

  return asset;
};
