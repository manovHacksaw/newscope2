"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from "@/components/ui/button"

const MenuBar = ({ editor }: { editor: any }) => {
    
  if (!editor) {
    return null
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <Button
         onClick={(e) => { handleButtonClick(e); editor.chain().focus().toggleBold().run(); }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        variant="outline"
        size="sm"
      >
        Bold
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        variant="outline"
        size="sm"
      >
        Italic
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        variant="outline"
        size="sm"
      >
        Strike
      </Button>
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        variant="outline"
        size="sm"
      >
        Paragraph
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        variant="outline"
        size="sm"
      >
        H2
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        variant="outline"
        size="sm"
      >
        H3
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        variant="outline"
        size="sm"
      >
        Bullet List
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        variant="outline"
        size="sm"
      >
        Ordered List
      </Button>
    </div>
  )
}

const RichTextEditor = ({ content, onChange }: { content: string, onChange: (content: string) => void }) => {
 
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent form submission
      };
    const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="border border-gray-300 rounded-md p-2 min-h-[300px]">
      <MenuBar editor={editor} />
    <EditorContent editor={editor} className="prose max-w-none p-2" />
    </div>
  )
}

export default RichTextEditor
