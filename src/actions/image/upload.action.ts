"use server";

import { imagekit } from "@/lib/imagekit";
import { AssetType } from "@/types";

export const uploadImage = async (file: File) => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const isVideo = file.type.startsWith("video");

    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      useUniqueFileName: true,
    });

    const thumbnail = isVideo
      ? `${result.url}?tr=so-1,w-405,h-720,c-at_max`
      : result.thumbnailUrl;

    return {
      success: true,
      url: result.url,
      thumbnail,
      type: isVideo ? AssetType.VIDEO : AssetType.IMAGE,
    };
  } catch (error) {
    console.error("Upload failed:", error);
    return {
      success: false,
      url: null,
      thumbnail: null,
      type: null,
    };
  }
};
