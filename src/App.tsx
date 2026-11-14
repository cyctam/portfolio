
import { useEffect } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Reveal } from "./components/Reveal";
import { Skills } from "./components/Skills";
import { site } from "./lib/site";

export default function App() {
  useEffect(() => {
    if (site.documentTitle) {
      document.title = site.documentTitle;
    }
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header
        logoName={site.logoName}
        nav={site.nav}
        social={site.social}
      />

      <main id="main" tabIndex={-1}>
        <Hero
          heroLabel={site.heroLabel}
          intro={site.intro}
          status={site.status}
          github={site.github}
          focus={site.focus}
          levels={site.levels}
          social={site.social}
        />

        <Reveal>
          <About paragraphs={site.about} facts={site.facts} />
        </Reveal>

        <Reveal>
          <Projects projects={site.projects} github={site.github} />
        </Reveal>

        <Reveal>
          <Skills groups={site.skills} />
        </Reveal>

        <Reveal>
          <Contact />
        </Reveal>
      </main>

      <Footer name={site.name} links={site.social} />
    </>
  );
}
