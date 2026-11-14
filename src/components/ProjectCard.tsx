import { useState } from "react";
import type { ProjectView } from "../types";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight, Icon } from "./Icons";

const VISIBLE_TECH = 6;

function initials(name: string): string {
  const words = name.match(/[\p{L}\p{N}]+/gu) ?? [];
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function Thumbnail({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        className="work-image"
        src={src}
        alt={`Preview of ${name}`}
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="work-placeholder" aria-hidden="true">
      <span>{initials(name)}</span>
    </div>
  );
}

function TechList({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const hidden = items.length - VISIBLE_TECH;
  const shown = open || hidden <= 0 ? items : items.slice(0, VISIBLE_TECH);

  return (
    <ul className="tags work-tags" aria-label="Technologies">
      {shown.map((item) => (
        <li key={item}>{item}</li>
      ))}
      {hidden > 0 && (
        <li>
          <button
            type="button"
            className="tags-more"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Show less" : `+${hidden} more`}
          </button>
        </li>
      )}
    </ul>
  );
}

export function ProjectCard({ project }: { project: ProjectView }) {
  const { name, category, description, thumbnail, technologies, note, repositoryUrl, liveDemoUrl } =
    project;

  return (
    <li className="work">
      <div className="work-media">
        {category && <p className="work-category">{category}</p>}
        <Thumbnail name={name} src={thumbnail} />
      </div>

      <div className="work-body">
        <h3>{name}</h3>
        {description && <p className="work-desc">{description}</p>}
        {note && <p className="work-note">{note}</p>}
        {technologies.length > 0 && <TechList items={technologies} />}

        {(repositoryUrl || liveDemoUrl) && (
          <div className="work-actions">
            {repositoryUrl && (
              <ExternalLink href={repositoryUrl} className="btn btn-sm btn-ghost">
                <Icon name="github" />
                GitHub Repository
              </ExternalLink>
            )}
            {liveDemoUrl && (
              <ExternalLink href={liveDemoUrl} className="btn btn-sm btn-primary">
                Live Demo
                <ArrowUpRight />
              </ExternalLink>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
