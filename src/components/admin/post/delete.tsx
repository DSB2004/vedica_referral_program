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
import { Trash2 } from "lucide-react";
import { Post } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/actions/post/delete.action";

type Props = {
  postId: string;
};

export function PostDeleteDialog({ id }: Post) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const handleAction = async () => {
    setLoading(true);
    try {
      await deletePost({ postId: id });

      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "posts";
        },
      });
      setOpen(false);
    } catch (err) {
      toast.error("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2 size={15} className="stroke-red-500"></Trash2>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            This will permanently remove the post from your app. These actions
            are irreversible. Please choose carefully.
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="destructive"
          className="w-full"
          disabled={loading}
          onClick={() => handleAction()}
        >
          {loading ? "Deleting..." : "Delete Post"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
