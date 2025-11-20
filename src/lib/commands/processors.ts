import { CommandResult, OutputType } from "@/types";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const helpCommand = (): CommandResult => {
  const banner = `
╔═══════════════════════════════════════════════════════════════╗
║                     COMANDOS DISPONIBLES                    ║
╚═══════════════════════════════════════════════════════════════╝
`;
  const commands = [
    "  ✨ help      → Muestra esta lista de comandos y ejemplos",
    "  📁 projects  → Lista todos los proyectos disponibles",
    "  🔍 open      → Abre detalles de un proyecto (Ej: open cubicutec)",
    "  👤 about     → Información sobre mí y mi experiencia",
    "  📧 contact   → Mis datos de contacto y redes sociales",
    "  🎨 theme     → Cambia el tema (dark, light, system)",
    "  🧹 clear     → Limpia la pantalla (mantiene historial)",
    "",
    "  💡 Tip: Usa TAB para autocompletar y ↑/↓ para historial"
  ];
  return {
    type: 'text',
    output: banner + commands.join('\n')
  };
};

export const projectsCommand = (): CommandResult => {
  if (projects.length === 0) {
    return { type: 'text', output: "No hay proyectos listados." };
  }
  return {
    type: 'component',
    output: JSON.stringify({
      type: 'projects',
      projects: projects
    })
  };
};

export const openCommand = (args: string[]): CommandResult => {
  if (!args[0]) return { type: 'error', output: "Uso: open <slug>. Ej: open portfolio" };
  
  const project = projects.find(p => p.slug === args[0]);
  if (!project) return { type: 'error', output: `Error: "${args[0]}" no encontrado. Usa 'projects' para ver slugs.` };

  return {
    type: 'component',
    output: JSON.stringify(project)
  };
};

export const aboutCommand = (): CommandResult => {
  return {
    type: 'component',
    output: JSON.stringify({
      type: 'about',
      profile: profile
    })
  };
};

export const contactCommand = (): CommandResult => {
  return {
    type: 'component',
    output: JSON.stringify({
      type: 'contact',
      socials: profile.socials
    })
  };
};

export const themeCommand = (args: string[]): CommandResult => {
  const validThemes = ['dark', 'light', 'system'];
  const theme = args[0];
  
  if (!theme || !validThemes.includes(theme)) {
    return { type: 'error', output: "❌ Argumento inválido.\n\n💡 Uso: theme <modo>\nOpciones: dark, light, system" };
  }
  
  const themeIcons: Record<string, string> = {
    dark: '🌙',
    light: '☀️',
    system: '🖥️'
  };
  
  return {
    type: 'success',
    output: `✨ Tema cambiado exitosamente\n\n${themeIcons[theme]} Modo: ${theme}\n\n🎨 La interfaz se actualizará automáticamente`
  };
};
