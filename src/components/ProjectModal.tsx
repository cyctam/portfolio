import { useEffect, useRef, useState } from "react";
import type { ProjectView } from "../types";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight, Icon } from "./Icons";
import { Thumbnail } from "./ProjectCard";

const VISIBLE_TECH = 6;

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

interface ProjectModalProps {
  project: ProjectView;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { name, category, description, thumbnail, technologies, note, repositoryUrl, liveDemoUrl } =
    project;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="work-dialog"
      aria-labelledby="work-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <div className="work-dialog-inner">
        <button
          type="button"
          className="work-dialog-close"
          aria-label="Close details"
          onClick={() => dialogRef.current?.close()}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="work-dialog-media">
          <Thumbnail name={name} src={thumbnail} />
        </div>

        <div className="work-dialog-body">
          {category && <p className="work-category">{category}</p>}
          <h3 id="work-dialog-title">{name}</h3>
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
      </div>
    </dialog>
  );
}
