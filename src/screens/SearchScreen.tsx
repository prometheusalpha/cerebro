import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useStore } from "../store/useStore";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const searchNotes = useStore((state) => state.searchNotes);
  const results = query ? searchNotes(query) : [];

  return (
    <div>
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, tags, or content..."
            className="w-full pl-12 pr-4 py-3 bg-transparent rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:outline-none"
          />
        </div>
      </div>

      {query && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-medium mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </h2>
          <div className="space-y-4">
            {results.map((note) => (
              <div
                key={note.id}
                className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700"
              >
                <h3 className="text-lg font-medium mb-2">{note.title}</h3>
                <p className="text-gray-600 mb-3">{note.content}</p>
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
