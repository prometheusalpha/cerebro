import { useEffect, useState } from "react";
import CommandInput from "../components/CommandInput";
import { useStore } from "../store/useStore";
import { Note } from "../types";

interface CommandLog {
  id: string;
  command: string;
  response: string;
  timestamp: string;
}

export default function CommandScreen() {
  const [logs, setLogs] = useState<CommandLog[]>([]);

  const handleCommand = (command: string) => {
    const response = processCommand(command);
    setLogs([
      {
        id: crypto.randomUUID(),
        command,
        response,
        timestamp: new Date().toISOString(),
      },
      ...logs,
    ]);
  };

  const { notes, addNote, updateNote, fetchNotes } = useStore((state) => state);
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const processCommand = (command: string): string => {
    const lowercaseCommand = command.toLowerCase();

    if (lowercaseCommand.startsWith("add note:")) {
      // Process the "add note" command
      addNote({
        title: lowercaseCommand.split(":")[1],
        content: "",
        tags: [],
        para_id: null,
        stage: "capture" as Note["stage"],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return "Note added successfully to Capture stage.";
    }

    if (lowercaseCommand.startsWith("tag:")) {
      // Process the "tag" command
      const [_, noteId, tags] = lowercaseCommand.split(" ");
      const note = notes.find((n) => n.id === parseInt(noteId));
      if (note) {
        updateNote({
          ...note,
          tags: [...note.tags, tags],
          updated_at: new Date().toISOString(),
        });
        return "Tags added successfully.";
      }
      return "Note not found.";
    }

    if (lowercaseCommand === "help") {
      return `Available commands:
- add note: <title> - Creates a new note
- help - Shows this help message`;
    }

    return 'Command not recognized. Type "help" for available commands.';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h1 className="text-2xl font-semibold mb-6">Command Interface</h1>

        <div className="mb-6">
          <CommandInput onSubmit={handleCommand} />
        </div>

        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sky-600 font-mono">❯</span>
                <span className="font-mono">{log.command}</span>
                <span className="text-xs text-gray-400 ml-auto">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="pl-6 text-gray-600 font-mono text-sm whitespace-pre-wrap">
                {log.response}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
