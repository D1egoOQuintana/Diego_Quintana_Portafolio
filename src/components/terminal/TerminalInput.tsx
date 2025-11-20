"use client";
import { useState, FormEvent, useEffect, useRef, KeyboardEvent } from "react";
import { useTerminalStore } from "@/lib/store/useTerminalStore";
import { commands } from "@/lib/commands/commandRegistry";
import { projects } from "@/data/projects";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export const TerminalInput = () => {
  const [val, setVal] = useState("");
  const { addEntry, clearHistory, addToCommandHistory, commandHistory, historyIndex, setHistoryIndex } = useTerminalStore();
  const router = useRouter();
  const { setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-focus
  useEffect(() => {
      const handleClick = () => inputRef.current?.focus();
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
  }, []);

  // Sync local state with store history navigation
  useEffect(() => {
    if (historyIndex >= 0 && historyIndex < commandHistory.length) {
      setVal(commandHistory[historyIndex]);
    } else if (historyIndex === -1) {
      setVal("");
    }
  }, [historyIndex, commandHistory]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex(historyIndex + 1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        setHistoryIndex(historyIndex - 1);
      }
    }
  };

  const handleAutocomplete = () => {
    const input = val.trim();
    if (!input) return;

    const parts = input.split(' ');
    const cmd = parts[0];
    
    // Command completion
    if (parts.length === 1) {
      const matches = Object.keys(commands).filter(c => c.startsWith(cmd));
      if (matches.length === 1) {
        setVal(matches[0] + ' ');
      }
      // TODO: Handle multiple matches (cycle or list)
    } 
    // Argument completion (specifically for 'open')
    else if (cmd === 'open' && parts.length === 2) {
      const slugPart = parts[1];
      const matches = projects.filter(p => p.slug.startsWith(slugPart)).map(p => p.slug);
      if (matches.length === 1) {
        setVal(`open ${matches[0]}`);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!val.trim()) return;

    const trimmedVal = val.trim();
    addToCommandHistory(trimmedVal);
    
    const [cmd, ...args] = trimmedVal.split(" ");
    
    if (cmd === "clear") {
        clearHistory();
        addEntry({ command: trimmedVal, output: "Pantalla limpia. Historial intacto (↑ para ver).", type: 'success' });
        setVal("");
        return;
    }

    const commandObj = commands[cmd];
    if (commandObj) {
        const result = commandObj.action(args);
        
        // Handle Theme Switching Side Effect
        if (cmd === 'theme' && result.type !== 'error') {
            const themeArg = args[0];
            if (themeArg && ['dark', 'light', 'system'].includes(themeArg)) {
                setTheme(themeArg);
            }
        }

        addEntry({ command: trimmedVal, output: result.output, type: result.type });
        
        // Navigation side-effects (optional, keeping for now if needed)
        // if (cmd === 'projects') router.push('/projects');
        // if (cmd === 'about') router.push('/about');
        // if (cmd === 'contact') router.push('/contact');
        // if (cmd === 'open' && args[0]) router.push(`/projects/${args[0]}`);

    } else {
        addEntry({ command: trimmedVal, output: `Error: comando inválido. Escribe 'help'.`, type: 'error' });
    }
    
    setVal("");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2 items-center mt-2">
      <span className="text-accent">➜</span>
      <span className="text-blue-400">~</span>
      <input
        ref={inputRef}
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-none outline-none text-foreground flex-1 font-mono"
        autoFocus
        placeholder="Type a command..."
      />
    </form>
  );
};
