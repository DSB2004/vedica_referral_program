"use server";

import { db } from "@/lib/prisma";
import { validateAdmin } from "../auth/get-admin.action";
import { AssetType } from "@/types";

type AssetInput = {
  url: string;
  thumbnail: string | null;
  type: AssetType;
};

type UpdatePostInput = {
  postId: string;
  title?: string;
  summary?: string;
  sharableLink?: string;
  contentHTML?: string;
  isArchived?: boolean;
  isPublished?: boolean;
  isDeleted?: boolean;
  assets?: AssetInput[];
};

export const updatePost = async ({
  postId,
  title,
  summary,
  contentHTML,
  isArchived,
  sharableLink,
  isDeleted,
  isPublished,
  assets,
}: UpdatePostInput) => {
  try {
    const { id: adminId } = await validateAdmin();
    console.log({ adminId });
    if (sharableLink) {
      const check = await db.post.findUnique({
        where: {
          sharableLink,
        },
      });

      if (check && check.id !== postId)
        return {
          success: false,
          message: "Post with this shared link already exist",
        };
    }

    const post = await db.$transaction(async (tx) => {
      // 1️⃣ Update post content
      const post = await tx.post.update({
        where: { id: postId },
        data: {
          lastUpdatedById: adminId,
          ...(title !== undefined && { title }),
          ...(summary !== undefined && { summary }),
          ...(sharableLink !== undefined && { sharableLink }),
          ...(contentHTML !== undefined && { contentHTML }),
          ...(isPublished !== undefined && { isPublished }),
          ...(isArchived !== undefined && { isArchived }),
          ...(isDeleted !== undefined && { isDeleted }),
        },
      });
      console.log(post);
      if (assets) {
        await tx.postAsset.deleteMany({
          where: { postId },
        });

        if (assets.length > 0) {
          await tx.postAsset.createMany({
            data: assets.map((asset) => ({
              postId,
              url: asset.url,
              thumbnail: asset.thumbnail || "",
              type: asset.type,
            })),
          });
        }
      }
      return post;
    });
    return { success: true, message: "Post updated successfully", post };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to update post" };
  }
};
