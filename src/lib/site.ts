import { CONTENT } from "../data/content";
import type {
  Content,
  Fact,
  LevelView,
  NavItem,
  ProjectView,
  Site,
  SkillGroup,
  SocialLink,
} from "../types";
import { emailAddress, httpUrl, imageSrc, list, str, urlHandle } from "./format";
import { LEVEL_STEPS, SKILL_LEVELS } from "./levels";
import { contactEndpoint } from "./contact";

/** Social links that actually have a value, in display order. */
function buildSocial(content: Content): SocialLink[] {
  const links: SocialLink[] = [];
  const github = httpUrl(content.github);
  const linkedin = httpUrl(content.linkedin);
  const instagram = httpUrl(content.instagram);
  const email = emailAddress(content.email);
  if (github) links.push({ icon: "github", label: "GitHub", href: github, external: true, handle: urlHandle(github) });
  if (linkedin) links.push({ icon: "linkedin", label: "LinkedIn", href: linkedin, external: true, handle: urlHandle(linkedin) });
  if (instagram) links.push({ icon: "instagram", label: "Instagram", href: instagram, external: true, handle: urlHandle(instagram) });
  if (email) links.push({ icon: "mail", label: "Email", href: "mailto:" + email, external: false, handle: email });
  return links;
}

/** A project needs a name. Everything else is optional. */
function buildProjects(content: Content): ProjectView[] {
  const projects: unknown = content.projects;
  if (!Array.isArray(projects)) return [];

  const views: ProjectView[] = [];
  for (const project of projects) {
    const name = str(project?.name);
    if (!name) continue;
    views.push({
      name,
      category: str(project.category),
      description: str(project.description),
      thumbnail: imageSrc(project.thumbnail),
      technologies: list(project.technologies),
      note: str(project.note),
      repositoryUrl: httpUrl(project.repositoryUrl),
      liveDemoUrl: httpUrl(project.liveDemoUrl),
    });
  }
  return views;
}

function buildSkills(content: Content): SkillGroup[] {
  const skills: unknown = content.skills;
  if (!skills || typeof skills !== "object") return [];

  return Object.entries(skills as Record<string, unknown>)
    .map(([category, items]) => ({ category, items: list(items) }))
    .filter((group) => group.items.length > 0);
}

/** Entries with a missing label or an unknown level are skipped. */
function buildLevels(content: Content): LevelView[] {
  const entries: unknown = content.proficiency;
  if (!Array.isArray(entries)) return [];

  const views: LevelView[] = [];
  for (const entry of entries) {
    const label = str(entry?.label);
    const level = str(entry?.level);
    if (!label || !Object.hasOwn(SKILL_LEVELS, level)) continue;
    const info = SKILL_LEVELS[level as keyof typeof SKILL_LEVELS];
    views.push({ label, word: info.word, value: info.steps / LEVEL_STEPS, steps: info.steps });
  }
  return views;
}

export function buildSite(content: Content): Site {
  const name = str(content.name);
  const logoName = str(content.displayName) || name;
  const focus = list(content.focus);

  const status: string[] = [];
  if (str(content.location)) status.push("Based in " + str(content.location) + ".");
  if (str(content.learning)) status.push("Currently learning " + str(content.learning) + ".");

  const facts: Fact[] = [];
  if (name) facts.push({ label: "name", value: name });
  if (logoName && logoName !== name) facts.push({ label: "called", value: logoName });
  if (focus.length) facts.push({ label: "focus", value: focus.join(", ") });
  if (str(content.location)) facts.push({ label: "location", value: str(content.location) });
  if (str(content.learning)) facts.push({ label: "learning", value: str(content.learning) });

  const projects = buildProjects(content);
  const skills = buildSkills(content);
  const levels = buildLevels(content);
  const social = buildSocial(content);

  // Projects and Contact are always part of the page: Projects shows an empty
  // state until there is something real to list, and Contact holds the form.
  const nav: NavItem[] = [
    { id: "top", label: "Home", optional: false },
    { id: "about", label: "About", optional: false },
    { id: "projects", label: "Projects", optional: false },
  ];
  if (skills.length) nav.push({ id: "skills", label: "Skills", optional: true });
  nav.push({ id: "contact", label: "Contact", optional: false });

  return {
    name,
    logoName,
    heroLabel: str(content.heroLabel),
    documentTitle: name ? name + " | Portfolio" : "",
    intro: str(content.intro),
    status: status.join(" "),
    github: httpUrl(content.github),
    focus,
    facts,
    about: list(content.about),
    projects,
    skills,
    levels,
    social,
    nav,
  };
}

/** Tell the owner what is still empty. Visible in the browser console only. */
export function reportMissing(content: Content): void {
  const missing: string[] = [];
  if (!str(content.name)) missing.push("name");
  if (!httpUrl(content.github)) missing.push("github");
  if (!httpUrl(content.linkedin)) missing.push("linkedin");
  if (!emailAddress(content.email)) missing.push("email");
  if (!list(content.about).length) missing.push("about paragraphs");
  if (!Array.isArray(content.projects) || !content.projects.length) missing.push("projects");
  if (!contactEndpoint()) missing.push("contact form endpoint (VITE_CONTACT_ENDPOINT, see README)");
  const skills: Record<string, unknown> = content.skills || {};
  if (!Object.values(skills).some((items) => list(items).length)) missing.push("skills");
  if (missing.length) {
    console.info("[portfolio] Not set yet: " + missing.join(", "));
  }
}

export const site: Site = buildSite(CONTENT);
