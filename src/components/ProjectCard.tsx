import { useState } from "react";
import type { ProjectView } from "../types";
import { useInView } from "../hooks/useInView";

const CARD_TAGS = 2;
const COLUMNS = 3;

function initials(name: string): string {
  const words = name.match(/[\p{L}\p{N}]+/gu) ?? [];
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function Thumbnail({ name, src }: { name: string; src: string }) {
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

interface ProjectCardProps {
  project: ProjectView;
  index: number;
  onOpen: (project: ProjectView) => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const [ref, seen] = useInView<HTMLLIElement>();
  const { name, thumbnail, technologies } = project;
  const tags = technologies.slice(0, CARD_TAGS);

  return (
    <li
      ref={ref}
      className={`work ${seen ? "is-in" : ""}`.trim()}
      style={{ "--delay": `${(index % COLUMNS) * 110}ms` } as React.CSSProperties}
    >
      <button
        type="button"
        className="work-media"
        aria-haspopup="dialog"
        aria-label={`View details of ${name}`}
        onClick={() => onOpen(project)}
      >
        <Thumbnail name={name} src={thumbnail} />
        <span className="work-view" aria-hidden="true">
          View Details
        </span>
      </button>

      <div className="work-meta">
        <h3>{name}</h3>
        {tags.length > 0 && (
          <ul className="work-pills" aria-label="Main technologies">
            {tags.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
