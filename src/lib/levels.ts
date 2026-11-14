import type { SkillLevel } from "../types";

/** How many steps the scale has. A bar at "familiar" is 3 of 5, which leaves visible headroom. */
export const LEVEL_STEPS = 5;

export const SKILL_LEVELS: Record<SkillLevel, { word: string; steps: number }> = {
  learning: { word: "Learning", steps: 1 },
  beginner: { word: "Beginner", steps: 2 },
  familiar: { word: "Familiar", steps: 3 },
  comfortable: { word: "Comfortable", steps: 4 },
  proficient: { word: "Proficient", steps: 5 },
};
