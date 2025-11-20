import React from 'react';

export type OutputType = 'text' | 'error' | 'success' | 'component';

export interface HistoryEntry {
  id: string;
  command: string;
  output: React.ReactNode | string;
  type: OutputType;
  timestamp: number;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  metrics?: string[];
  links: {
    demo?: string;
    repo?: string;
  };
  year: string;
  details?: {
    overview?: string;
    role?: string;
    contributions?: string[];
    challenges?: string[];
    achievements?: string[];
    features?: string[];
    teamSize?: string;
    duration?: string;
  };
}

export interface CommandResult {
    output: React.ReactNode | string;
    type: OutputType;
}

export interface Command {
  keyword: string;
  description: string;
  usage?: string;
  action: (args: string[]) => CommandResult;
}
