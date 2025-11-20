import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HistoryEntry } from '@/types';

interface TerminalState {
  history: HistoryEntry[];
  commandHistory: string[];
  historyIndex: number;
  isProcessing: boolean;
  inputValue: string;
  addEntry: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  addToCommandHistory: (cmd: string) => void;
  setHistoryIndex: (index: number) => void;
  clearHistory: () => void;
  setInputValue: (val: string) => void;
  setIsProcessing: (val: boolean) => void;
}

export const useTerminalStore = create<TerminalState>()(
  persist(
    (set) => ({
      history: [],
      commandHistory: [],
      historyIndex: -1,
      isProcessing: false,
      inputValue: '',
      addEntry: (entry) => set((state) => ({
        history: [
          ...state.history,
          {
            ...entry,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          },
        ],
      })),
      addToCommandHistory: (cmd) => set((state) => {
        // Avoid duplicates at the top
        const newHistory = [cmd, ...state.commandHistory.filter(c => c !== cmd)].slice(0, 50);
        return { commandHistory: newHistory, historyIndex: -1 };
      }),
      setHistoryIndex: (index) => set({ historyIndex: index }),
      clearHistory: () => set({ history: [] }), // Only clears display history
      setInputValue: (val) => set({ inputValue: val }),
      setIsProcessing: (val) => set({ isProcessing: val }),
    }),
    {
      name: 'terminal-storage',
      partialState: (state) => ({
        history: state.history,
        commandHistory: state.commandHistory,
      }),
    }
  )
);
