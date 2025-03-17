'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Redo,
  Save,
  Undo,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface TiptapEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function TextEditor({
  initialContent = '',
  onSave,
  placeholder = 'Write something...',
  className,
}: TiptapEditorProps) {
  const [savedContent, setSavedContent] = useState<string>(initialContent);
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState<boolean>(false);

  // Set initial content
  useEffect(() => {
    if (initialContent) {
      setSavedContent(initialContent);
    }
  }, [initialContent]);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-primary underline underline-offset-2',
          },
        }),
        Placeholder.configure({
          placeholder,
          emptyEditorClass: 'is-editor-empty',
        }),
      ],
      content: savedContent,
      editorProps: {
        attributes: {
          class: cn(
            'prose prose-sm dark:prose-invert max-w-none focus:outline-none',
            'min-h-[150px] p-4 rounded-md border border-input bg-background',
          ),
        },
      },
    },
    [savedContent],
  );

  const handleSave = () => {
    if (!editor) return;
    const content = editor.getHTML();
    setSavedContent(content);
    if (onSave) {
      onSave(content);
    }
  };

  const setLink = () => {
    if (!editor) return;

    // If text is selected, set the link
    if (linkUrl && editor.isActive('link')) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
    } else if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }

    setIsLinkPopoverOpen(false);
    setLinkUrl('');
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="bg-background flex flex-wrap items-center gap-1 rounded-md border p-1">
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Toggle bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          aria-label="Toggle h1"
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Toggle h2"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Toggle
          size="sm"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label="Toggle bullet list"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('orderedList')}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label="Toggle ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive('link')}
              aria-label="Toggle link"
            >
              <LinkIcon className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setLink();
                  }
                }}
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLinkPopoverOpen(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={setLink}>
                  Save
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button size="sm" onClick={handleSave}>
            <Save className="mr-1 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-background flex overflow-hidden rounded-md border shadow-md"
        >
          <Toggle
            size="sm"
            pressed={editor.isActive('bold')}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            className="rounded-none"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('italic')}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            className="rounded-none"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Popover>
            <PopoverTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive('link')}
                className="rounded-none"
              >
                <LinkIcon className="h-4 w-4" />
              </Toggle>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3">
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Enter URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setLink();
                    }
                  }}
                />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLinkPopoverOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={setLink}>
                    Save
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </BubbleMenu>
      )}

      <EditorContent className="max-w-prose" editor={editor} />

      <style>
        {`
          .ProseMirror p.is-editor-empty:first-child::before {
            color: #9ca3af; /* text-muted-foreground equivalent */
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
          }
        `}
      </style>
    </div>
  );
}
