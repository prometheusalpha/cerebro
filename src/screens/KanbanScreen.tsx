import React from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Edit2 } from "lucide-react";
import { useStore } from "../store/useStore";
import ItemDetailModal from "../components/ItemDetailModal";
import { Note } from "../types";

const stages = ["capture", "organize", "distill", "express"] as const;

function DraggableNote({ note, onEdit }: { note: Note; onEdit: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${note.id}--${note.stage}`,
    });

  // Apply dragging styles
  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="draggable-item bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{note.title}</h3>
        <button
          onClick={onEdit}
          className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
        {note.content}
      </p>
      {/* tags */}
      <div className="flex gap-2">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-lg bg-sky-100 dark:bg-sky-800 text-sky-600 dark:text-sky-400 text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function DroppableColumn({
  stage,
  children,
}: {
  stage: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({
    id: stage,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
    >
      <h2 className="text-lg font-medium capitalize mb-4">{stage}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default function KanbanScreen() {
  const { notes, fetchNotes, updateNote, fetchParaItems } = useStore();

  React.useEffect(() => {
    fetchNotes();
    fetchParaItems();
  }, [fetchNotes, fetchParaItems]);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const noteId = active.id.toString().split("--")[0];
      const newStage = over.id;

      const note = notes.find((n) => n.id === parseInt(noteId));
      if (note) {
        updateNote({
          ...note,
          stage: newStage as Note["stage"], // Update the note's stage based on the droppable area
          updated_at: new Date().toISOString(),
        });
      }
    }
  };

  return (
    <div className="h-full">
      <h1 className="text-2xl font-semibold mb-6">CODE Workflow</h1>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4 h-[calc(100vh-12rem)]">
          {stages.map((stage) => (
            <DroppableColumn key={stage} stage={stage}>
              {notes
                .filter((note) => note.stage === stage)
                .map((note) => (
                  <DraggableNote
                    key={note.id}
                    note={note}
                    onEdit={() => setSelectedNote(note)}
                  />
                ))}
            </DroppableColumn>
          ))}
        </div>
      </DndContext>

      {selectedNote && (
        <ItemDetailModal
          item={selectedNote}
          onClose={() => setSelectedNote(null)}
          onSave={(updatedNote) => {
            updateNote(updatedNote as Note);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
}
