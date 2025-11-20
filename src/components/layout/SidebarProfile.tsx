"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { Github, Linkedin, Mail, FileText, X, HelpCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const SidebarProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const profileImage = "/perfil/Imagen%20de%20WhatsApp%202025-11-20%20a%20las%2015.58.39_df2a5b63.jpg";

  return (
    <>
      <aside className="p-6 flex flex-col gap-6 border-r border-border bg-background text-foreground h-full transition-colors duration-300">
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-20 h-20 rounded-full mb-2 overflow-hidden border-2 border-accent flex items-center justify-center hover:scale-105 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="View profile picture"
          >
              <Image 
                src={profileImage} 
                alt={profile.name} 
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority
              />
          </button>
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <p className="text-sm text-muted-foreground">{profile.role}</p>
        </div>

        <nav className="flex flex-col gap-2 mt-auto">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
            <Github size={18} /> GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-blue-400 transition-colors">
            <Linkedin size={18} /> LinkedIn
          </a>
          <a href="mailto:diego.qgg@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-yellow-400 transition-colors">
            <Mail size={18} /> Email
          </a>
          <a href={profile.socials.cv} download="CV_Luis_Quintana.pdf" className="flex items-center gap-2 text-muted-foreground hover:text-purple-400 transition-colors">
            <FileText size={18} /> CV
          </a>
        </nav>

        <div className="mt-4 pt-4 border-t border-border space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          
          <button
            onClick={() => setIsHelpOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-accent/10 hover:bg-accent/20 text-accent transition-colors text-sm font-medium"
          >
            <HelpCircle size={16} />
            Guía de Uso
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {isHelpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={() => setIsHelpOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-background rounded-lg border-2 border-accent shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-background border-b border-border p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-accent flex items-center gap-2">
                  <HelpCircle size={28} />
                  Guía de Uso del Portfolio
                </h2>
                <button 
                  onClick={() => setIsHelpOpen(false)}
                  className="p-2 bg-muted hover:bg-accent/20 text-foreground rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-6 text-sm">
                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3">Interfaz Terminal</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2"><span className="text-accent">•</span> Esta es una terminal interactiva estilo TUI (Text User Interface)</li>
                    <li className="flex gap-2"><span className="text-accent">•</span> Escribe comandos en la línea de entrada al final</li>
                    <li className="flex gap-2"><span className="text-accent">•</span> Presiona <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> para ejecutar</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3">Comandos Disponibles</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded">
                      <code className="text-accent font-bold">help</code>
                      <p className="text-muted-foreground mt-1">Muestra todos los comandos disponibles</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <code className="text-accent font-bold">about</code>
                      <p className="text-muted-foreground mt-1">Información sobre mí</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <code className="text-accent font-bold">projects</code>
                      <p className="text-muted-foreground mt-1">Lista mis proyectos principales</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <code className="text-accent font-bold">skills</code>
                      <p className="text-muted-foreground mt-1">Mis habilidades técnicas</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <code className="text-accent font-bold">contact</code>
                      <p className="text-muted-foreground mt-1">Información de contacto</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <code className="text-accent font-bold">clear</code>
                      <p className="text-muted-foreground mt-1">Limpia la pantalla de la terminal</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3">Atajos de Teclado</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">↑ / ↓</kbd>
                      <span>Navegar historial de comandos</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Tab</kbd>
                      <span>Autocompletar comandos y argumentos</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Click</kbd>
                      <span>Saltar animación de texto (durante escritura)</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3">Personalización</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2"><span className="text-accent">•</span> Usa el botón de tema en el sidebar para cambiar entre claro/oscuro</li>
                    <li className="flex gap-2"><span className="text-accent">•</span> Haz clic en mi foto de perfil para verla ampliada</li>
                    <li className="flex gap-2"><span className="text-accent">•</span> El scroll es automático, pero puedes desplazarte manualmente</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-foreground mb-3">Tips</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2"><span className="text-accent">•</span> Prueba escribir comandos parciales y presionar Tab</li>
                    <li className="flex gap-2"><span className="text-accent">•</span> Usa las flechas para repetir comandos anteriores</li>
                    <li className="flex gap-2"><span className="text-accent">•</span> Los enlaces en los proyectos son clickeables</li>
                  </ul>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-muted rounded-full border-4 border-accent shadow-2xl w-64 h-64 md:w-96 md:h-96 flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
               <Image 
                src={profileImage} 
                alt={profile.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 256px, 384px"
                priority
              />
               
               <button 
                 onClick={() => setIsModalOpen(false)}
                 className="absolute top-6 right-6 p-2 bg-black/20 text-foreground rounded-full hover:bg-black/40 transition-colors z-10"
               >
                 <X size={24} />
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
