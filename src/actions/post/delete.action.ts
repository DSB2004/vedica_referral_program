"use server";

import { db } from "@/lib/prisma";
import { validateAdmin } from "../auth/get-admin.action";

type UpdatePostInput = {
  postId: string;
};

export const deletePost = async ({ postId }: UpdatePostInput) => {
  try {
    await validateAdmin();
    const post = await db.$transaction(async (tx) => {
      await tx.postAsset.deleteMany({
        where: { postId },
      });
      const post = await tx.post.delete({
        where: { id: postId },
      });

      return post;
    });
    return { success: true, message: "Post deleted successfully", post };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to delete post" };
  }
};
