import { useEffect, useState } from "react";
import { Plus, Folder, LayoutGrid, Book, Archive, Edit2 } from "lucide-react";
import { useStore } from "../store/useStore";
import type { ParaType, ParaItem } from "../types";
import ParaItemDetailModal from "../components/ParaItemDetailModal";

const paraTypes: { type: ParaType; icon: typeof Folder; label: string }[] = [
  { type: "project", icon: LayoutGrid, label: "Projects" },
  { type: "area", icon: Folder, label: "Areas" },
  { type: "resource", icon: Book, label: "Resources" },
  { type: "archive", icon: Archive, label: "Archive" },
];

export default function ParaScreen() {
  const [selectedType, setSelectedType] = useState<ParaType>("project");
  const [selectedItem, setSelectedItem] = useState<ParaItem | null>(null);
  const { paraItems, addParaItem, updateParaItem, fetchParaItems } = useStore();
  useEffect(() => {
    fetchParaItems();
  }, [fetchParaItems]);

  const handleAddItem = () => {
    const newItem = {
      type: selectedType,
      title: "New Item",
      description: "",
      status: "active" as ParaItem["status"],
    };
    addParaItem(newItem);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">PARA Management</h1>
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {paraTypes.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`flex items-center gap-3 p-4 rounded-lg border ${
              selectedType === type
                ? "border-sky-500 bg-sky-50 text-sky-700"
                : "border-gray-200 hover:border-sky-500 hover:dark:bg-sky-900 hover:bg-sky-50"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {paraItems
          .filter((item) => item.type === selectedType)
          .map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {item.description}
              </p>
              {item.status && (
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === "active"
                      ? "bg-green-100 text-green-700"
                      : item.status === "completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.status}
                </span>
              )}
            </div>
          ))}
      </div>

      {selectedItem && (
        <ParaItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={(updatedItem) => {
            updateParaItem(updatedItem);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}
