"use client";
import { ReactNode, useState } from "react";
import { SidebarProfile } from "./SidebarProfile";
import { TerminalRoot } from "../terminal/TerminalRoot";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ShellFrame = ({ children }: { children: ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden transition-colors duration-300">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-background border-b border-border p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Luis Diego Quintana</h1>
        <button 
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 hover:bg-accent/10 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="w-full md:w-1/4 lg:w-1/5 hidden md:block h-screen sticky top-0 border-r border-border z-50 overflow-y-auto">
        <SidebarProfile />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-background border-r border-border z-50 md:hidden overflow-y-auto"
            >
              <SidebarProfile />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main className="flex-1 p-3 sm:p-4 md:p-8 flex flex-col h-screen relative animate-in-fade z-0">
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
