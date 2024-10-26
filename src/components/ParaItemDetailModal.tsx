import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Note, ParaItem, ParaType } from "../types";
import { useStore } from "../store/useStore";

interface ParaItemDetailModalProps {
  item: ParaItem;
  onClose: () => void;
  onSave: (item: ParaItem) => void;
}

const paraTypeOptions: { value: ParaType; label: string }[] = [
  { value: "project", label: "Project" },
  { value: "area", label: "Area" },
  { value: "resource", label: "Resource" },
  { value: "archive", label: "Archive" },
];

export default function ParaItemDetailModal({
  item,
  onClose,
  onSave,
}: ParaItemDetailModalProps) {
  const [editedItem, setEditedItem] = useState(item);

  // fetch notes from supabase
  const { searchNotes } = useStore();
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    const notes = searchNotes("");
    setNotes(notes);
  }, [searchNotes]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl">
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Edit PARA Item</h2>
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

            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={editedItem.type}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    type: e.target.value as ParaType,
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                {paraTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={editedItem.description}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, description: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={editedItem.status}
                onChange={(e) =>
                  setEditedItem({
                    ...editedItem,
                    status: e.target.value as
                      | "active"
                      | "completed"
                      | "archived",
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            {/* Display notes */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Notes</h3>
              <div className="space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                  >
                    {/* title */}
                    <p className="text-lg font-semibold">{note.title}</p>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>

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
