"use server";

import { db } from "@/lib/prisma";

export const removeAsset = async (assetId: string) => {
  await db.postAsset.delete({
    where: { id: assetId },
  });

  return { success: true };
};
