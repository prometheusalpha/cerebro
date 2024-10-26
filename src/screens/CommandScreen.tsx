import React, { useState } from "react";
import CommandInput from "../components/CommandInput";

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

  const processCommand = (command: string): string => {
    const lowercaseCommand = command.toLowerCase();

    if (lowercaseCommand.startsWith("add note:")) {
      return "Note added successfully to Capture stage.";
    }

    if (lowercaseCommand.startsWith("move to:")) {
      return "Note moved to specified stage.";
    }

    if (lowercaseCommand === "help") {
      return `Available commands:
- add note: <title> - Creates a new note
- move to: <stage> <note-id> - Moves note to specified stage
- tag: <note-id> <tags> - Adds tags to a note
- help - Shows this help message`;
    }

    return 'Command not recognized. Type "help" for available commands.';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
