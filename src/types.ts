export interface Project {
  name: string;
  /** Short label above the thumbnail, for example "Cloud & DevOps". */
  category?: string;
  /** What the project is, what it does and the problem it solves. */
  description?: string;
  /**
   * Screenshot of the project: a file in public/projects/ written as
   * "projects/file.png", or a full https URL. 16:9 works best.
   */
  thumbnail?: string;
  /** Technologies actually used in the project. */
  technologies?: string[];
  /** GitHub repository URL. The button is hidden when this is empty. */
  repositoryUrl?: string;
  /** Deployed site, for example https://project-name.vercel.app. The button is hidden when empty. */
  liveDemoUrl?: string;
  /** Optional extra line under the description. */
  note?: string;
}

/** Category name mapped to the skill labels shown under it. */
export type SkillGroups = Record<string, string[]>;

/** Descriptive scale, lowest to highest. Words on purpose: no invented percentages. */
export type SkillLevel = "learning" | "beginner" | "familiar" | "comfortable" | "proficient";

export interface Proficiency {
  label: string;
  level: SkillLevel;
}

export interface Content {
  name: string;
  displayName: string;
  heroLabel: string;
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  location: string;
  learning: string;
  intro: string;
  /** Short topics shown in the hero and the About panel. */
  focus: string[];
  about: string[];
  projects: Project[];
  skills: SkillGroups;
  proficiency: Proficiency[];
}

export type IconName = "github" | "linkedin" | "instagram" | "mail";

export interface SocialLink {
  icon: IconName;
  label: string;
  href: string;
  external: boolean;
  /** Short readable form of the destination, for example github.com/name. */
  handle: string;
}

export interface NavItem {
  id: string;
  label: string;
  /** Set on the sections that only exist when they have content. */
  optional: boolean;
}

export interface ProjectView {
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  note: string;
  repositoryUrl: string;
  liveDemoUrl: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface LevelView {
  label: string;
  /** The level as a word, shown next to the bar. */
  word: string;
  /** Fill, from 0 to 1. */
  value: number;
  /** Filled segments out of LEVEL_STEPS. */
  steps: number;
}

export interface Fact {
  label: string;
  value: string;
}

/** Everything the components need, with empty fields already resolved. */
export interface Site {
  name: string;
  logoName: string;
  heroLabel: string;
  documentTitle: string;
  intro: string;
  status: string;
  github: string;
  focus: string[];
  facts: Fact[];
  about: string[];
  projects: ProjectView[];
  skills: SkillGroup[];
  levels: LevelView[];
  social: SocialLink[];
  nav: NavItem[];
}
