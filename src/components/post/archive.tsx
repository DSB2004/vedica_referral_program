"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updatePost } from "@/actions/post/update.action";
import { Archive, Trash2, View } from "lucide-react";
import { Post } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  postId: string;
};

export function PostPublishedDialog({ id, isPublished }: Post) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const handleAction = async () => {
    setLoading(true);
    try {
      const res = await updatePost({
        postId: id,
        ...{ isPublished: !isPublished },
      });

      if (res.success) {
        if (isPublished) {
          toast.success("Post archived successfully");
        } else {
          toast.success("Post published successfully");
        }
        queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey[0] === "posts";
          },
        });
        setOpen(false);
      } else {
        if (isPublished) {
          toast.error(res.message || "Failed to archive post");
        } else {
          toast.error(res.message || "Failed to publish post");
        }
      }
    } catch (err) {
      if (isPublished) {
        toast.error("Failed to archive post");
      } else {
        toast.error("Failed to publish post");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          {isPublished ? (
            <>
              <Archive size={15} className="stroke-red-500" />
            </>
          ) : (
            <>
              <View size={15} className=""></View>
            </>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isPublished ? "Archive Post" : "Publish Post"}
          </DialogTitle>
          <DialogDescription>
            {isPublished ? (
              <>
                This will archive the post from your feed. This action can have
                direct effect on your feed. Please choose carefully.
              </>
            ) : (
              <>
                This will publish the post to your feed. This action can have
                direct effect on your feed. Please choose carefully.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="default"
          className="w-full"
          disabled={loading}
          onClick={() => handleAction()}
        >
          {loading ? (
            "Processing..."
          ) : (
            <>{isPublished ? "Archive Post" : "Publish Post"}</>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
