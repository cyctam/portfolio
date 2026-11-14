import { AnimatedIntro } from "./AnimatedIntro";
import type { CSSProperties } from "react";
import type { LevelView, SocialLink } from "../types";
import { ExternalLink } from "./ExternalLink";
import { ArrowDown, ArrowUpRight } from "./Icons";
import { SocialIconList } from "./SocialLinks";

interface HeroProps {
  heroLabel: string;
  intro: string;
  status: string;
  github: string;
  focus: string[];
  levels: LevelView[];
  social: SocialLink[];
}

export function Hero({
  heroLabel,
  status,
  github,
  levels,
  social,
}: HeroProps) {
  return (
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
    >
      <div
        className={
          levels.length
            ? "wrap hero-inner has-stack"
            : "wrap hero-inner"
        }
      >
        <div className="hero-copy">
          {heroLabel && (
            <p className="chip">
              <span className="chip-dot" aria-hidden="true" />
              <span id="hero-name">{heroLabel}</span>
            </p>
          )}

          <h1 className="hero-person-name">
            Hi, I'm Tama
          </h1>

<h2 id="hero-title" className="hero-headline">
  <span id="hero-intro">
    <AnimatedIntro />
  </span>
</h2>

          <div className="cta" id="hero-cta">
            {github ? (
              <ExternalLink
                href={github}
                className="btn btn-primary"
              >
                GitHub Profile
                <ArrowUpRight />
              </ExternalLink>
            ) : null}

            <a
              className={github ? "btn btn-ghost" : "btn btn-primary"}
              href="#projects"
            >
              View Projects
              <ArrowDown />
            </a>
          </div>

          <div className="hero-meta">
            <SocialIconList
              id="hero-social"
              className="hero-social"
              links={social}
            />

            {status && (
              <p className="hero-status" id="hero-status">
                {status}
              </p>
            )}
          </div>
        </div>

        {levels.length > 0 && <HeroStack levels={levels} />}
      </div>
    </section>
  );
}

function HeroStack({ levels }: { levels: LevelView[] }) {
  return (
    <div className="stack-wrap" aria-hidden="true">
      <div
        className="stack"
        style={{ "--n": levels.length } as CSSProperties}
      >
        {levels.map((level, index) => (
          <div
            className="layer"
            key={level.label}
            style={
              {
                "--i": index,
                "--value": level.value,
              } as CSSProperties
            }
          >
            <span className="plate" />

            <span className="layer-label">
              <span className="layer-name">{level.label}</span>
              <span className="layer-word">{level.word}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

