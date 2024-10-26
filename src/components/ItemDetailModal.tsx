import React, { useState } from "react";
import { X } from "lucide-react";
import { Note, ParaItem } from "../types";
import TagInput from "./TagInput";
import { useStore } from "../store/useStore";

interface ItemDetailModalProps {
  item: Note | ParaItem;
  onClose: () => void;
  onSave: (item: Note | ParaItem) => void;
}

export default function ItemDetailModal({
  item,
  onClose,
  onSave,
}: ItemDetailModalProps) {
  const [editedItem, setEditedItem] = useState(item);
  const { paraItems } = useStore();
  const isNote = "content" in item;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {isNote ? "Edit Note" : "Edit Item"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={editedItem.title}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            </div>

            {isNote && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <textarea
                    value={(editedItem as Note).content}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem,
                        content: e.target.value,
                      } as Note)
                    }
                    rows={6}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    PARA Item
                  </label>
                  <select
                    value={(editedItem as Note).para_id || 0}
                    onChange={(e) =>
                      setEditedItem({
                        ...(editedItem as Note),
                        para_id: e.target.value,
                      } as Note)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  >
                    <option value="">None</option>
                    {paraItems.map((paraItem) => (
                      <option key={paraItem.id} value={paraItem.id}>
                        {paraItem.type}: {paraItem.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tags</label>
                  <TagInput
                    tags={(editedItem as Note).tags}
                    onChange={(newTags) =>
                      setEditedItem({
                        ...editedItem,
                        tags: newTags,
                      } as Note)
                    }
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
