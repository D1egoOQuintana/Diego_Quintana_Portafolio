import { Command } from "@/types";
import * as processors from "./processors";

export const commands: Record<string, Command> = {
  help: {
    keyword: "help",
    description: "Muestra comandos y ejemplos cortos.",
    action: () => processors.helpCommand()
  },
  projects: {
    keyword: "projects",
    description: "Muestra proyectos disponibles.",
    action: () => processors.projectsCommand()
  },
  open: {
    keyword: "open",
    description: "Abre ficha de proyecto.",
    usage: "open <slug>",
    action: (args) => processors.openCommand(args)
  },
  about: {
    keyword: "about",
    description: "Sobre mí.",
    action: () => processors.aboutCommand()
  },
  contact: {
    keyword: "contact",
    description: "Formas de contacto.",
    action: () => processors.contactCommand()
  },
  theme: {
    keyword: "theme",
    description: "Cambia tema.",
    usage: "theme <dark|light|system>",
    action: (args) => processors.themeCommand(args)
  },
  clear: {
    keyword: "clear",
    description: "Limpia la pantalla.",
    action: () => ({ type: 'success', output: 'Pantalla limpia. Historial intacto (↑ para ver).' })
  }
};
