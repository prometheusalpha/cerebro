import { create } from "zustand";
import { Note, ParaItem } from "../types";
import { supabase } from "../lib/supabase";

interface Store {
  notes: Note[];
  paraItems: ParaItem[];
  fetchNotes: () => void;
  fetchParaItems: () => void;
  addNote: (note: Omit<Note, "id">) => void;
  updateNote: (note: Note) => void;
  addParaItem: (item: Omit<ParaItem, "id">) => void;
  updateParaItem: (item: ParaItem) => void;
  searchNotes: (query: string) => Note[];
}

// export const useStore = create<Store>((set, get) => ({
//   notes: [],
//   paraItems: [],
//   addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
//   updateNote: (note) => set((state) => ({
//     notes: state.notes.map((n) => (n.id === note.id ? note : n))
//   })),
//   addParaItem: (item) => set((state) => ({ paraItems: [...state.paraItems, item] })),
//   updateParaItem: (item) => set((state) => ({
//     paraItems: state.paraItems.map((i) => (i.id === item.id ? item : i))
//   })),
//   searchNotes: (query) => {
//     const { notes } = get();
//     const lowercaseQuery = query.toLowerCase();
//     return notes.filter((note) =>
//       note.title.toLowerCase().includes(lowercaseQuery) ||
//       note.content.toLowerCase().includes(lowercaseQuery) ||
//       note.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
//     );
//   }
// }));

// useStore with update to Supabase and fetch from Supabase
export const useStore = create<Store>((set, get) => ({
  tasks: [],
  notes: [],
  paraItems: [],
  fetchNotes: () => {
    supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => set({ notes: data || [] }));
  },
  fetchParaItems: () => {
    supabase
      .from("para_items")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => set({ paraItems: data || [] }));
  },
  searchNoteByParaId: (paraId: number) => {
    const { notes } = get();
    return notes.filter((note) => note.para_id === paraId);
  },
  addNote: (note) => {
    supabase
      .from("notes")
      .insert(note)
      .select()
      .then((data) =>
        set((state) => ({
          notes: [...state.notes, data.data?.[0]],
        }))
      );
  },
  updateNote: (note) => {
    const { id, ...rest } = note;
    supabase
      .from("notes")
      .update(rest)
      .eq("id", note.id)
      .then(() =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === note.id ? note : n)),
        }))
      );
  },
  addParaItem: (item) => {
    supabase
      .from("para_items")
      .insert(item)
      .select()
      .then((data) =>
        set((state) => ({ paraItems: [...state.paraItems, data.data?.[0]] }))
      );
  },
  updateParaItem: (item) => {
    const { id, ...rest } = item;
    supabase
      .from("para_items")
      .update(rest)
      .eq("id", item.id)
      .then(() =>
        set((state) => ({
          paraItems: state.paraItems.map((i) => (i.id === item.id ? item : i)),
        }))
      );
  },
  searchNotes: (query) => {
    const { notes } = get();
    const lowercaseQuery = query.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowercaseQuery) ||
        note.content.toLowerCase().includes(lowercaseQuery) ||
        note.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  },
}));
