import { Hash } from "lucide-react";
import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { redirect } from "react-router-dom";

export default function InputScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const addNote = useStore((state) => state.addNote);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      addNote({
        title,
        content,
        // join tags array with commas
        para_id: null,
        tags: tags,
        stage: "capture",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      setTitle("");
      setContent("");
      setTags([]);
    }
    // clear tag input
    setTagInput("");
    // navigate to kanban
    redirect("/kanban");
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput) {
      e.preventDefault();
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-sky-950/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-semibold mb-6">Capture Information</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-4 py-2 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:outline-none"
            />
          </div>

          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={6}
              className="w-full px-4 py-2 rounded-lg border bg-transparent border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags (press Enter)"
                className="flex-1 px-4 py-2 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:outline-none"
              />
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full bg-sky-100 text-sky-700 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!title && !content}
          >
            Capture
          </button>
        </form>
      </div>
    </div>
  );
}
