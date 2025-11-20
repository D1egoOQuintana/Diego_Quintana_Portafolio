import { ReactNode } from "react";
import { SidebarProfile } from "./SidebarProfile";
import { TerminalRoot } from "../terminal/TerminalRoot";

export const ShellFrame = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden transition-colors duration-300">
      <div className="w-full md:w-1/4 lg:w-1/5 hidden md:block h-screen sticky top-0 border-r border-border z-50">
        <SidebarProfile />
      </div>
      
      <main className="flex-1 p-4 md:p-8 flex flex-col h-screen relative animate-in-fade z-0">
        {/* The Terminal is the main interactive layer */}
        <div className="flex-1 relative z-10 overflow-hidden">
            <TerminalRoot />
        </div>

        {/* 
           The 'children' (Next.js pages) are rendered but visually hidden 
           or placed behind to ensure SEO content is present in the DOM.
           In a real TUI, we might want to hide them completely visually 
           but keep them for screen readers/bots.
        */}
        <div className="sr-only">
            {children}
        </div>
      </main>
    </div>
  );
};
