"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTerminalStore } from "@/lib/store/useTerminalStore";
import { TerminalLine } from "./TerminalLine";
import { TerminalInput } from "./TerminalInput";

export const TerminalRoot = () => {
  const { history } = useTerminalStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll to bottom whenever history changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [history]);

  return (
    <div 
      ref={containerRef}
      className="h-full max-h-full overflow-y-scroll p-4 font-mono bg-muted/30 text-foreground rounded-lg border border-border shadow-2xl backdrop-blur-sm"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(101, 163, 13, 0.2) transparent' }}
    >
      <div className="mb-4 text-muted-foreground text-xs flex justify-between">
        <span>Last login: {mounted ? new Date().toLocaleString() : "Loading..."} on ttys001</span>
        <span>v1.0.0-release</span>
      </div>
      <div className="mb-8 text-accent whitespace-pre font-bold select-none leading-none">
{`
  _     ____   ___  
 | |   |  _ \\ / _ \\ 
 | |   | | | | | | |
 | |___| |_| | |_| |
 |_____|____/ \\__\_\\
`}
        <div className="text-muted-foreground font-normal mt-6 text-sm md:text-base space-y-2">
          <p className="text-success font-semibold">System initialized</p>
          <p>Welcome, <span className="text-foreground font-bold">Luis Diego Quintana</span> | Access: <span className="text-success">ADMIN</span></p>
          
          <div className="mt-4 sm:mt-6 p-2.5 sm:p-3 md:p-4 border border-accent/30 rounded-md bg-accent/5">
            <p className="text-accent font-bold mb-2 sm:mb-3 text-[10px] sm:text-xs md:text-sm">GUÍA DE USO</p>
            <div className="space-y-1.5 sm:space-y-2 text-[9px] sm:text-[10px] md:text-xs overflow-x-auto">
              <p className="flex items-start gap-1.5 sm:gap-2 min-w-0">
                <span className="text-accent font-bold shrink-0">•</span>
                <span className="min-w-0"><span className="text-foreground font-semibold">Comandos Básicos:</span> Escribe <span className="text-accent font-mono">'help'</span> para ver todos los comandos</span>
              </p>
              <p className="flex items-start gap-1.5 sm:gap-2 min-w-0">
                <span className="text-accent font-bold shrink-0">•</span>
                <span className="min-w-0"><span className="text-foreground font-semibold">Navegación:</span> Usa <span className="text-accent font-mono">↑ ↓</span> para navegar por el historial</span>
              </p>
              <p className="flex items-start gap-1.5 sm:gap-2 min-w-0">
                <span className="text-accent font-bold shrink-0">•</span>
                <span className="min-w-0"><span className="text-foreground font-semibold">Autocompletado:</span> Presiona <span className="text-accent font-mono">Tab</span> para autocompletar</span>
              </p>
              <p className="flex items-start gap-1.5 sm:gap-2 min-w-0">
                <span className="text-accent font-bold shrink-0">•</span>
                <span className="min-w-0"><span className="text-foreground font-semibold">Proyectos:</span> Escribe <span className="text-accent font-mono">'projects'</span> para ver portafolio</span>
              </p>
              <p className="flex items-start gap-1.5 sm:gap-2 min-w-0">
                <span className="text-accent font-bold shrink-0">•</span>
                <span className="min-w-0"><span className="text-foreground font-semibold">Tema:</span> Cambia modo claro/oscuro en el sidebar</span>
              </p>
              <p className="flex items-start gap-1.5 sm:gap-2 min-w-0">
                <span className="text-accent font-bold shrink-0">•</span>
                <span className="min-w-0"><span className="text-foreground font-semibold">Perfil:</span> Haz clic en mi foto para ampliarla</span>
              </p>
            </div>
          </div>

          <p className="mt-3 sm:mt-4 border-l-2 border-accent pl-3 sm:pl-4 italic opacity-80 text-[10px] sm:text-xs md:text-sm">
            "Building digital experiences with code and creativity."
          </p>
          <p className="mt-4 text-center">
            Escribe <span className="text-accent font-bold">'help'</span> para comenzar →
          </p>
        </div>
      </div>

      {history.map((entry) => (
        <TerminalLine key={entry.id} entry={entry} />
      ))}
      
      <TerminalInput />
      <div ref={bottomRef} className="pb-4" />
    </div>
  );
};
