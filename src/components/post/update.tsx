"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { updatePost } from "@/actions/post/update.action";
import { upload as uploadImage } from "@/actions/image/upload.action";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

import { toast } from "sonner";
import { X } from "lucide-react";

import { AssetType, Post } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

type AssetPreview = {
  id?: string; // exists only for already-saved assets
  file?: File; // exists only for new uploads
  url: string;
  thumbnail: string | null;
  type: AssetType;
  isNew: boolean;
};

/* ---------------------------------- */
/* Constants */
/* ---------------------------------- */

const MAX_VIDEO_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

/* ---------------------------------- */
/* Validation */
/* ---------------------------------- */

const postSchema = z.object({
  title: z.string().min(5).max(120),
  summary: z.string().min(10).max(300),
  contentHTML: z.string().optional(),
  sharableLink: z.string().url(),
});

type FormValues = z.infer<typeof postSchema>;

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

export default function UpdatePostDialog({ post }: { post: Post }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [assets, setAssets] = React.useState<AssetPreview[]>(
    post.assets.map((a) => ({
      id: a.id,
      url: a.url,
      thumbnail: a.thumbnail,
      type: a.type,
      isNew: false,
    })),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      summary: post.summary,
      contentHTML: post.contentHTML ?? "",
      sharableLink: post.sharableLink ?? "",
    },
  });

  /* ---------------------------------- */
  /* File Handling */
  /* ---------------------------------- */

  const queryClient = useQueryClient();
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);

    const nextAssets: AssetPreview[] = [];

    for (const file of selected) {
      const isVideo = file.type.startsWith("video");
      const limit = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

      if (file.size > limit) {
        toast.warning(`${isVideo ? "Video" : "Image"} size limit exceeded`);
        continue;
      }

      nextAssets.push({
        file,
        url: URL.createObjectURL(file),
        thumbnail: null,
        type: isVideo ? AssetType.VIDEO : AssetType.IMAGE,
        isNew: true,
      });
    }

    setAssets((prev) => [...prev, ...nextAssets]);
    e.target.value = "";
  };

  const removeAsset = (index: number) => {
    setAssets((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------------------------- */
  /* Submit */
  /* ---------------------------------- */

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      const finalAssets: {
        url: string;
        thumbnail: string | null;
        type: AssetType;
      }[] = [];

      // 1️⃣ Upload only new assets
      for (const asset of assets) {
        if (asset.isNew && asset.file) {
          const res = await uploadImage(asset.file);

          if (!res.success || !res.url) {
            throw new Error("Upload failed");
          }

          finalAssets.push({
            url: res.url,
            thumbnail: res.thumbnail ?? null,
            type: asset.type,
          });
        }
      }

      // 2️⃣ Keep existing assets
      for (const asset of assets) {
        if (!asset.isNew) {
          finalAssets.push({
            url: asset.url,
            thumbnail: asset.thumbnail,
            type: asset.type,
          });
        }
      }

      // 3️⃣ Update post (assets included)
      const res = await updatePost({
        postId: post.id,
        ...values,
        assets: finalAssets,
      });

      if (res.success) {
        toast.success("Post updated successfully");
        queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey[0] === "posts";
          },
        });
        setOpen(false);
      } else {
        toast.error(res.message || "Failed to update post");
      }
    } catch (err) {
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* UI */
  /* ---------------------------------- */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil size={15}></Pencil>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:min-w-175">
        <DialogHeader>
          <DialogTitle>Update Post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sharable Link */}
            <FormField
              control={form.control}
              name="sharableLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sharable Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload */}
            <FormItem>
              <FormLabel>Assets</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFiles}
                />
              </FormControl>
            </FormItem>

            {/* Preview */}
            {assets.length > 0 && (
              <div className="flex gap-2 overflow-x-auto border rounded-md p-2">
                {assets.map((asset, index) => (
                  <div
                    key={index}
                    className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden border"
                  >
                    {asset.type === AssetType.IMAGE ? (
                      <img
                        src={asset.thumbnail || asset.url}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <video
                        src={asset.url}
                        className="h-full w-full object-cover"
                        muted
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => removeAsset(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update Post"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
