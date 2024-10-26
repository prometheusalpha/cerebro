import React, { useState } from "react";
import { Send } from "lucide-react";

interface CommandInputProps {
  onSubmit: (command: string) => void;
}

export default function CommandInput({ onSubmit }: CommandInputProps) {
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onSubmit(command);
      setCommand("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="bg-transparent w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:outline-none"
          placeholder="Type a command (e.g., 'add note: Meeting notes')"
        />
      </div>
      <button
        type="submit"
        className="p-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
