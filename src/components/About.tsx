import type { Fact } from "../types";
import { SectionHead } from "./SectionHead";
import type { CSSProperties } from "react";

interface AboutProps {
  paragraphs: string[];
  facts: Fact[];
}

export function About({ paragraphs, facts }: AboutProps) {
  const [lead, ...rest] = paragraphs;

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <SectionHead id="about-title" meta="01 / profile" title="About" />

        <div className="prose" id="about-body">
          {lead ? (
            <>
              <p className="lead">{lead}</p>
              {rest.length > 0 && (
                <div className="prose-rest">
                  {rest.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="lead">
              My current focus is AWS, cloud infrastructure, DevOps and automation.
            </p>
          )}
        </div>

        {facts.length > 0 && (
          <div className="panel">
            <div className="panel-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <span className="panel-file">profile.txt</span>
            </div>
            <dl className="panel-body">

{facts.map((fact, index) => (
  <div
    className="profile-fact"
    key={fact.label}
    style={{ "--fact-index": index } as CSSProperties}
  >
    <dt>{fact.label}</dt>
    <dd>{fact.value}</dd>
  </div>
))}

            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
