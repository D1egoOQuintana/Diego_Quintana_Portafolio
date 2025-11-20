"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HistoryEntry, Project } from "@/types";

export const TerminalLine = ({ entry }: { entry: HistoryEntry }) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const contentRef = useRef(entry.output);
  const [isTyping, setIsTyping] = useState(true);
  const isComponent = entry.type === 'component';
  const shouldReduceMotion = useReducedMotion();
  const lineRef = useRef<HTMLDivElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const content = contentRef.current;

    if (typeof content !== 'string') {
        setIsTyping(false);
        return;
    }

    if (isComponent || shouldReduceMotion) {
        setDisplayedContent(content);
        setIsTyping(false);
        return;
    }

    let currentIndex = 0;
    const batchSize = 4; // Batch size for typing
    
    const typeChar = () => {
      if (currentIndex >= content.length) {
        setIsTyping(false);
        return;
      }

      // Calculate next batch
      const nextIndex = Math.min(currentIndex + batchSize, content.length);
      const batch = content.slice(currentIndex, nextIndex);
      
      setDisplayedContent(prev => prev + batch);
      currentIndex = nextIndex;

      // Auto-scroll while typing
      if (lineRef.current) {
        lineRef.current.scrollIntoView({ behavior: "auto", block: "nearest" });
      }

      // Determine delay
      let delay = 30; // Base speed
      const lastChar = batch[batch.length - 1];
      if (['.', '!', '?'].includes(lastChar)) {
        delay += 300; // Punctuation pause
      }

      timeoutIdRef.current = setTimeout(typeChar, delay);
    };

    // Start typing
    timeoutIdRef.current = setTimeout(typeChar, 50);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [isComponent, shouldReduceMotion]);

  // Skip typing on click
  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTyping && !isComponent && typeof contentRef.current === 'string') {
      // Clear any pending timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      setDisplayedContent(contentRef.current);
      setIsTyping(false);
    }
  };

  let contentNode;
  if (isComponent) {
      try {
          const data = JSON.parse(entry.output as string);
          
          // Handle contact component
          if (data.type === 'contact') {
              const icons: Record<string, string> = {
                  github: '',
                  linkedin: '',
                  email: '',
                  cv: ''
              };
              contentNode = (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="border border-border p-4 my-2 rounded-md bg-muted/10 shadow-sm max-w-3xl"
                  >
                      <div className="text-xl font-bold font-sans text-foreground mb-4">
                          CONTACTO
                      </div>
                      <div className="space-y-3 font-sans">
                          {Object.entries(data.socials).map(([key, val]) => {
                              const label = key.charAt(0).toUpperCase() + key.slice(1);
                              const isCv = key === 'cv';
                              let href = val as string;
                              
                              if (key === 'email') {
                                  href = `https://mail.google.com/mail/?view=cm&fs=1&to=${val}`;
                              }
                              
                              return (
                                  <div key={key} className="flex items-center gap-3">
                                      <span className="text-2xl">{icons[key] || ''}</span>
                                      <div className="flex-1">
                                          <div className="text-sm text-muted-foreground">{label}</div>
                                          <a 
                                              href={href}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              download={isCv ? "CV_Luis_Quintana.pdf" : undefined}
                                              className="text-accent hover:text-accent/80 hover:underline decoration-accent font-medium transition-colors"
                                              onClick={(e) => e.stopPropagation()}
                                          >
                                              {isCv ? "Descargar CV" : val as string}
                                          </a>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground font-sans">
                          ¡No dudes en contactarme! Siempre abierto a nuevas oportunidades
                      </div>
                  </motion.div>
              );
          } else if (data.type === 'projects') {
              // Handle projects list component
              contentNode = (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="my-2 max-w-4xl"
                  >
                      <div className="text-xl font-bold font-sans text-foreground mb-4">
                          MIS PROYECTOS
                      </div>
                      <div className="grid gap-3">
                          {data.projects.map((project: Project) => (
                              <motion.div 
                                key={project.slug}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border border-border p-4 rounded-md bg-muted/10 shadow-sm hover:shadow-md transition-shadow"
                              >
                                  <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                          <h3 className="text-lg font-bold font-sans text-foreground">{project.title}</h3>
                                          <p className="text-sm text-muted-foreground font-mono mt-1">Slug: {project.slug}</p>
                                          <p className="text-muted-foreground my-2 font-sans text-sm">{project.description}</p>
                                          <div className="flex gap-2 flex-wrap">
                                              {project.techStack.slice(0, 4).map(t => (
                                                  <span key={t} className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-md font-sans border border-accent/20">{t}</span>
                                              ))}
                                              {project.techStack.length > 4 && (
                                                  <span className="px-2 py-0.5 text-muted-foreground text-xs">+{project.techStack.length - 4} más</span>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                                  <div className="mt-3 flex gap-4 font-sans text-sm">
                                      {project.links.demo && (
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 hover:underline decoration-accent font-medium transition-colors">
                                          [ Demo ]
                                        </a>
                                      )}
                                      {project.links.repo && (
                                        <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 hover:underline decoration-accent font-medium transition-colors">
                                          [ Code ]
                                        </a>
                                      )}
                                  </div>
                              </motion.div>
                          ))}
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground font-mono">
                          Usa 'open &lt;slug&gt;' para ver detalles completos de un proyecto
                      </div>
                  </motion.div>
              );
          } else if (data.type === 'about') {
              // Handle about component
              contentNode = (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="border border-border p-4 my-2 rounded-md bg-muted/10 shadow-sm max-w-3xl"
                  >
                      <div className="text-xl font-bold font-sans text-foreground mb-4">
                          SOBRE MÍ
                      </div>
                      <div className="space-y-4 font-sans">
                          <div>
                              <div className="text-2xl font-bold text-accent mb-1">{data.profile.name}</div>
                              <div className="text-lg text-muted-foreground">{data.profile.role}</div>
                          </div>
                          <div>
                              <div className="text-sm font-semibold text-foreground mb-2">Bio</div>
                              <p className="text-muted-foreground leading-relaxed">{data.profile.bio}</p>
                          </div>
                          <div className="text-sm text-accent italic">
                              Siempre buscando nuevos desafíos y oportunidades de aprendizaje
                          </div>
                      </div>
                  </motion.div>
              );
          } else if (data.type === 'skills') {
              // Handle skills component
              contentNode = (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="border border-border p-4 my-2 rounded-md bg-muted/10 shadow-sm max-w-3xl"
                  >
                      <div className="text-xl font-bold font-sans text-foreground mb-4">
                          HABILIDADES
                      </div>
                      <div className="space-y-4 font-sans">
                          <div>
                              <div className="text-sm font-semibold text-foreground mb-2">Lenguajes</div>
                              <div className="flex flex-wrap gap-2">
                                  {data.skills.languages.map((lang: string) => (
                                      <span key={lang} className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm border border-accent/20">
                                          {lang}
                                      </span>
                                  ))}
                              </div>
                          </div>
                          <div>
                              <div className="text-sm font-semibold text-foreground mb-2">Frontend</div>
                              <div className="flex flex-wrap gap-2">
                                  {data.skills.frontend.map((tech: string) => (
                                      <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm border border-accent/20">
                                          {tech}
                                      </span>
                                  ))}
                              </div>
                          </div>
                          <div>
                              <div className="text-sm font-semibold text-foreground mb-2">Backend</div>
                              <div className="flex flex-wrap gap-2">
                                  {data.skills.backend.map((tech: string) => (
                                      <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm border border-accent/20">
                                          {tech}
                                      </span>
                                  ))}
                              </div>
                          </div>
                          <div>
                              <div className="text-sm font-semibold text-foreground mb-2">Herramientas</div>
                              <div className="flex flex-wrap gap-2">
                                  {data.skills.tools.map((tool: string) => (
                                      <span key={tool} className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm border border-accent/20">
                                          {tool}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </motion.div>
              );
          } else {
              // Handle single project component
              const project = data as Project;
              contentNode = (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="border border-border p-3 sm:p-4 md:p-6 my-2 rounded-md bg-muted/10 shadow-sm max-w-4xl"
                  >
                      <div className="space-y-3 sm:space-y-4 md:space-y-6">
                          {/* Header */}
                          <div>
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-sans text-foreground mb-1 sm:mb-2">{project.title}</h3>
                              <p className="text-muted-foreground font-sans text-xs sm:text-sm md:text-base">{project.description}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-3 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                                  {project.details?.role && <span className="flex items-center gap-1">Role: {project.details.role}</span>}
                                  {project.details?.duration && <span className="flex items-center gap-1">Duración: {project.details.duration}</span>}
                                  {project.details?.teamSize && <span className="flex items-center gap-1">Equipo: {project.details.teamSize}</span>}
                              </div>
                          </div>

                          {/* Tech Stack */}
                          <div>
                              <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 font-sans">Tecnologías</h4>
                              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                                  {project.techStack.map(t => (
                                      <span key={t} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-accent/10 text-accent text-[10px] sm:text-xs md:text-sm rounded-md font-sans border border-accent/20">{t}</span>
                                  ))}
                              </div>
                          </div>

                          {/* Overview */}
                          {project.details?.overview && (
                              <div>
                                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 font-sans">Descripción General</h4>
                                  <p className="text-muted-foreground font-sans text-[10px] sm:text-xs md:text-sm leading-relaxed">{project.details.overview}</p>
                              </div>
                          )}

                          {/* Contributions */}
                              {project.details?.contributions && project.details.contributions.length > 0 && (
                                  <div>
                                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 font-sans">Contribuciones Clave</h4>
                                  <ul className="space-y-1.5 sm:space-y-2">
                                      {project.details.contributions.map((contrib, i) => (
                                          <li key={i} className="text-muted-foreground font-sans text-[10px] sm:text-xs md:text-sm leading-relaxed flex gap-1.5 sm:gap-2">
                                              <span className="text-accent mt-0.5 sm:mt-1 shrink-0">▸</span>
                                              <span>{contrib}</span>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          )}

                          {/* Features */}
                              {project.details?.features && project.details.features.length > 0 && (
                                  <div>
                                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 font-sans">Características Principales</h4>
                                  <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                                      {project.details.features.map((feat, i) => (
                                          <div key={i} className="text-muted-foreground font-sans text-[10px] sm:text-xs md:text-sm flex gap-1.5 sm:gap-2">
                                              <span className="text-accent">•</span>
                                              <span>{feat}</span>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}

                          {/* Challenges */}
                              {project.details?.challenges && project.details.challenges.length > 0 && (
                                  <div>
                                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 font-sans">Desafíos Superados</h4>
                                  <ul className="space-y-1.5 sm:space-y-2">
                                      {project.details.challenges.map((challenge, i) => (
                                          <li key={i} className="text-muted-foreground font-sans text-[10px] sm:text-xs md:text-sm leading-relaxed flex gap-1.5 sm:gap-2">
                                              <span className="text-yellow-500 mt-0.5 sm:mt-1 shrink-0">▸</span>
                                              <span>{challenge}</span>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          )}

                          {/* Achievements */}
                              {project.details?.achievements && project.details.achievements.length > 0 && (
                                  <div>
                                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 font-sans">Logros</h4>
                                  <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                                      {project.details.achievements.map((achievement, i) => (
                                          <div key={i} className="text-muted-foreground font-sans text-[10px] sm:text-xs md:text-sm flex gap-1.5 sm:gap-2 bg-accent/5 p-1.5 sm:p-2 rounded border border-accent/10">
                                              <span className="text-accent">-</span>
                                              <span>{achievement}</span>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}

                          {/* Links */}
                          <div className="flex flex-wrap gap-3 sm:gap-4 font-sans text-xs sm:text-sm pt-2 border-t border-border">
                              {project.links.demo && (
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 hover:underline decoration-accent font-medium transition-colors">
                                  [ Demo en Vivo ]
                                </a>
                              )}
                              {project.links.repo && (
                                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 hover:underline decoration-accent font-medium transition-colors">
                                  [ Ver Código ]
                                </a>
                              )}
                          </div>
                      </div>
                  </motion.div>
              );
          }
      } catch (e) {
          contentNode = <span className="text-danger">Error rendering component</span>;
      }
  } else {
      contentNode = (
        <div className="command-response">
            <span className={isTyping ? "text-glow" : ""}>{displayedContent}</span>
            {isTyping && <span className="animate-pulse text-accent ml-1">▍</span>}
        </div>
      );
  }

  return (
    <motion.div
      ref={lineRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-2 font-mono text-xs sm:text-sm md:text-base"
    >
      <div className="flex gap-1 sm:gap-2 text-muted-foreground select-none text-xs sm:text-sm md:text-base">
        <span className="text-accent">$</span>
        <span className="text-blue-400">~</span>
        <span className="text-foreground">{entry.command}</span>
      </div>
      <div 
        className={`whitespace-pre-wrap mt-1 ${entry.type === 'error' ? 'text-danger' : 'text-muted-foreground'} ${isTyping && !isComponent ? 'cursor-pointer' : ''}`}
        onClick={handleSkip}
      >
        {contentNode}
      </div>
    </motion.div>
  );
};
