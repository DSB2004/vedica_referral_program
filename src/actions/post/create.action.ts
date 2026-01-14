"use server";

import { db } from "@/lib/prisma";
import { generateSlug } from "@/util/slug.util";
import { validateAdmin } from "../auth/get-admin.action";
type CreatePostInput = {
  title: string;
  summary: string;
  contentHTML?: string;
  sharableLink: string;
  assets?: { url: string; thumbnail: string }[];
  isPublished?: boolean;
};

export const createPost = async ({
  title,
  summary,
  contentHTML,
  sharableLink,
  assets = [],
  isPublished = false,
}: CreatePostInput) => {
  try {
    const { id, email } = await validateAdmin();
    const slug = generateSlug(title);

    const check = await db.post.findUnique({
      where: {
        sharableLink,
      },
    });
    if (check) return { success: false, message: "Post with same url exist" };
    const post = await db.post.create({
      data: {
        lastUpdatedById: id,
        title,
        summary,
        contentHTML: contentHTML || "",
        slug,
        isPublished,
        sharableLink,
        assets: {
          create: assets,
        },
      },
      include: {
        assets: true,
      },
    });
    return { success: true, message: "Post created successfully" };
  } catch (err) {
    return { success: false, message: "Failed to create a new post" };
  }
};
