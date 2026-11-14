
import { useState } from "react";
import { displayColor, iconFor } from "../lib/skillIcons";
import type { SkillGroup } from "../types";
import { SectionHead } from "./SectionHead";

interface SkillsProps {
  groups: SkillGroup[];
}

interface SkillLabelProps {
  label: string;
  selected: boolean;
  onSelect: (label: string) => void;
}

function SkillLogo({ label }: { label: string }) {
  const icon = iconFor(label);

  return (
    <svg className="skill-logo" viewBox={icon.viewBox} aria-hidden="true" focusable="false">
      <path fill={displayColor(icon)} d={icon.path} />
    </svg>
  );
}

function SkillLabel({ label, selected, onSelect }: SkillLabelProps) {
  const match = /^(.*?)\s*(\(learning\))$/i.exec(label);
  const brand = displayColor(iconFor(label));

  return (
    <li className={match ? "is-learning" : undefined}>
      <button
        type="button"
        className={`skill-chip${selected ? " is-selected" : ""}`}
        style={{ "--brand": brand } as React.CSSProperties}
        aria-pressed={selected}
        onClick={() => onSelect(label)}
      >
        <SkillLogo label={label} />
        <span className="skill-name">{match ? match[1] : label}</span>
        {match && <span className="skill-note">{match[2]}</span>}
      </button>
    </li>
  );
}

export function Skills({ groups }: SkillsProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  if (!groups.length) return null;

  function handleSelect(label: string) {
    setSelectedSkill((current) => (current === label ? null : label));
  }

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="wrap skills-grid">
        <SectionHead
          id="skills-title"
          meta="03 / stack"
          title="Skills"
        />

        <dl className="stack-list" id="skills-list">
          {groups.map((group, groupIndex) => (
            <div
              className="card skill-group"
              key={group.category}
              style={{ "--skill-group-index": groupIndex } as React.CSSProperties}
            >
              <dt>{group.category}</dt>
              <dd>
                <ul className="skill-items">
                  {group.items.map((item) => (
                    <SkillLabel
                      key={item}
                      label={item}
                      selected={selectedSkill === item}
                      onSelect={handleSelect}
                    />
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
