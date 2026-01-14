"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import type { Level } from "@tiptap/extension-heading";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

const HEADING_LEVELS: Level[] = [1, 2, 3];

export function TiptapEditor({ defaultValue, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: HEADING_LEVELS },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: defaultValue ?? "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] rounded-md border px-3 py-2 text-sm focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 border rounded-md p-1 bg-muted">
        {/* Paragraph */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </Button>

        {/* Headings */}
        {HEADING_LEVELS.map((level) => (
          <Button
            type="button"
            key={level}
            size="sm"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
          >
            H{level}
          </Button>
        ))}

        {/* Formatting */}
        <Button
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </Button>

        {/* Lists */}
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </Button>

        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
