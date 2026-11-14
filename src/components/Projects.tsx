import type { ProjectView } from "../types";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight } from "./Icons";
import { ProjectCard } from "./ProjectCard";
import { SectionHead } from "./SectionHead";

interface ProjectsProps {
  projects: ProjectView[];
  github: string;
}

export function Projects({ projects, github }: ProjectsProps) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="wrap projects-grid">
        <SectionHead id="projects-title" meta="02 / work" title="Projects" />

        {projects.length > 0 ? (
          <ul
            className={`work-list work-count-${Math.min(projects.length, 3)}`}
            id="project-list"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </ul>
        ) : (
          <div className="empty" id="projects-empty">
            <div className="panel-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <span className="panel-file">~/projects</span>
            </div>
            <div className="empty-body">
              <p className="empty-term" aria-hidden="true">
                <span>$ ls projects/</span>
                <span>total 0</span>
              </p>
              <div className="empty-text">
                <h3>No projects listed yet</h3>
                <p>
                  There is nothing to show in this section for now.
                  {github ? " My GitHub profile is the best place to look in the meantime." : ""}
                </p>
                {github && (
                  <ExternalLink href={github} className="btn btn-ghost">
                    Open GitHub
                    <ArrowUpRight />
                  </ExternalLink>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
