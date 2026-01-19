"use client";

import * as React from "react";
import { useForm } from "react-hook-form";

import { createPost } from "@/actions/post/create.action";
import { upload as uploadImage } from "@/actions/image/upload.action";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { TiptapEditor } from "../../common/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X } from "lucide-react";
import { AssetType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

type PreviewFile = {
  file: File;
  url: string;
  type: AssetType;
};

const MAX_VIDEO_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

const postSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title must be under 120 characters"),

  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(300, "Summary must be under 300 characters"),

  contentHTML: z.string().optional(),
  sharableLink: z.string().url("Please enter a valid URL"),
});

type FormValues = z.infer<typeof postSchema>;

export default function CreatePostDialog() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [files, setFiles] = React.useState<PreviewFile[]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      summary: "",
      contentHTML: "",
      sharableLink: "",
    },
  });
  const queryClient = useQueryClient();

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);

    const validFiles: PreviewFile[] = [];

    for (const file of selected) {
      const isVideo = file.type.startsWith("video");
      const sizeLimit = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

      if (isVideo && file.size > sizeLimit) {
        toast.warning("Videos must be under 5MB");
        continue;
      }

      validFiles.push({
        file,
        url: URL.createObjectURL(file),
        type: isVideo ? AssetType.VIDEO : AssetType.IMAGE,
      });
    }

    setFiles((prev) => [...prev, ...validFiles]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      const assets: { url: string; thumbnail: string; type: AssetType }[] = [];
      for (const item of files) {
        const res = await uploadImage(item.file);
        if (res.success && res.url && res.thumbnail) {
          assets.push({
            url: res.url,
            thumbnail: res.thumbnail,
            type: item.type,
          });
        }
      }
      console.log({
        ...values,
        assets,
      });
      const res = await createPost({
        ...values,
        assets,
      });

      if (res.success) {
        toast.success("Your post has been saved successfully");
        queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey[0] === "posts";
          },
        });
        setOpen(false);
        form.reset();
        setFiles([]);
      } else {
        toast.error(res.message || "Failed to create post");
      }
    } catch (err) {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Post</Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:min-w-150">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 overflow-hidden"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title" {...field} />
                  </FormControl>{" "}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>{" "}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="contentHTML"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      // value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="sharableLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sharable Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>{" "}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload */}
            <FormItem>
              <FormLabel>Assets (Images / Videos)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFiles}
                />
              </FormControl>{" "}
              <FormMessage />
            </FormItem>

            {/* Preview Bar */}
            {files.length > 0 && (
              <div className="flex gap-2 overflow-x-auto border w-full rounded-md p-2">
                {files.map((item, index) => (
                  <div
                    key={index}
                    className="relative h-20 w-20 shrink-0 rounded-md overflow-hidden border"
                  >
                    {item.type === AssetType.IMAGE ? (
                      <img
                        src={item.url}
                        alt="preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="h-full w-full object-cover"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Saving..." : "Create Post"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
