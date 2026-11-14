/* ==========================================================================
   Portfolio content
   --------------------------------------------------------------------------
   Everything on the page that is personal lives in CONTENT below.
   Leave a field empty and whatever depends on it stays hidden:
   no GitHub URL, no GitHub button or icon. No projects, no Projects
   section. Only add things that are true: nothing is invented for you.
   ========================================================================== */

/* CONTENT:START */
const CONTENT = {
  // Full name: shown in the hero, the footer and the page title.
  name: "Aditya Ilham Pratama",
  // Short name: shown in the nav. Falls back to the full name if empty.
  displayName: "Tama",

  // Links. Use full URLs. Each one is used exactly as written here.
  github: "https://github.com/cyctam",
  linkedin: "https://www.linkedin.com/in/aditya-ilham-pratama-053761336?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagram: "https://www.instagram.com/tamthawng/",
  email: "", // for example "you@example.com"

  // Optional hero details.
  location: "", // for example "Jakarta, Indonesia"
  learning: "", // finishes the sentence "Currently learning ..."

  // Replaces the default one-line intro under the headline.
  intro: "I'm Tama. I'm focused on AWS, DevOps, cloud infrastructure, automation and backend systems.",

  // About section, first person. One string per paragraph.
  // When set, these replace the default two sentences in index.html.
  about: [
    "I'm Aditya Ilham Pratama, and I go by Tama. I'm an aspiring cloud engineer focused on AWS, DevOps, cloud infrastructure, automation and backend systems.",
    "On AWS, I've studied or worked with services including EC2, S3, VPC, RDS, DynamoDB, CloudFormation, Lambda and CloudWatch. I'm still building depth with them.",
    "My project work includes an LLM-powered incident response project, cloud infrastructure automation, CI/CD pipelines and EarthClay App.",
  ],

  // Projects. Add one object per project; they appear in this order.
  // Only list real projects with real repository links.
  //
  // {
  //   name: "project-name",
  //   description: "One sentence on the problem it solves.",
  //   tech: ["Technology", "Technology"],
  //   repo: "https://github.com/your-username/project-name",
  //   demo: "",  // optional live demo URL
  //   note: "",  // optional: one interesting technical decision
  // },
  projects: [],

  // Skills, shown as plain labels with no ratings. Empty categories are not shown.
  // Add "(learning)" after anything you are still picking up, for example
  // "Kubernetes (learning)". Remove it once you are comfortable with it.
  skills: {
    "Cloud Platform": ["AWS", "EC2", "S3", "VPC", "RDS", "DynamoDB", "Lambda", "CloudFormation", "CloudWatch"],
    "DevOps & Infrastructure as Code": [
      "Docker",
      "Terraform",
      "Jenkins",
      "GitHub Actions",
      "CI/CD",
      "Git",
      "GitHub",
      "Linux",
      "Kubernetes (learning)",
    ],
    "Programming & Backend": ["Python", "JavaScript", "Node.js", "Bash"],
    Databases: ["MySQL", "PostgreSQL", "MongoDB", "Amazon RDS", "Amazon DynamoDB"],
    "Development Tools": ["Visual Studio Code", "Postman", "AWS CLI", "AWS Management Console", "npm", "pip"],
  },
};
/* CONTENT:END */

/* ==========================================================================
   Rendering. You should not need to edit anything below this line.
   ========================================================================== */
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);

  const str = (value) => (typeof value === "string" ? value.trim() : "");

  const list = (value) =>
    Array.isArray(value) ? value.map(str).filter(Boolean) : [];

  // Only allow http(s) URLs so a typo can never become a script link.
  // The URL is returned exactly as written, not rewritten by the browser.
  function httpUrl(value) {
    const raw = str(value);
    if (!raw) return "";
    try {
      const url = new URL(raw);
      return url.protocol === "https:" || url.protocol === "http:" ? raw : "";
    } catch (error) {
      return "";
    }
  }

  function emailAddress(value) {
    const raw = str(value);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : "";
  }

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) continue;
      if (key === "text") node.textContent = value;
      else node.setAttribute(key, value === true ? "" : value);
    }
    node.append(...children);
    return node;
  }

  /* Icons: inline SVG so there is nothing to download. */
  const ICONS = {
    github:
      '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin:
      '<svg class="icon icon-stroke" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    instagram:
      '<svg class="icon icon-stroke" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    mail:
      '<svg class="icon icon-stroke" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  };

  function icon(name) {
    const template = document.createElement("template");
    template.innerHTML = ICONS[name];
    return template.content.firstElementChild;
  }

  const NEW_TAB = " (opens in a new tab)";

  function externalLink(href, label, attrs = {}) {
    return el("a", { href, target: "_blank", rel: "noopener noreferrer", ...attrs }, [
      document.createTextNode(label),
      el("span", { class: "sr-only", text: NEW_TAB }),
    ]);
  }

  /* Social links that actually have a value. */
  function socialLinks() {
    const links = [];
    const github = httpUrl(CONTENT.github);
    const linkedin = httpUrl(CONTENT.linkedin);
    const instagram = httpUrl(CONTENT.instagram);
    const email = emailAddress(CONTENT.email);
    if (github) links.push({ icon: "github", label: "GitHub", href: github, external: true });
    if (linkedin) links.push({ icon: "linkedin", label: "LinkedIn", href: linkedin, external: true });
    if (instagram) links.push({ icon: "instagram", label: "Instagram", href: instagram, external: true });
    if (email) links.push({ icon: "mail", label: "Email", href: "mailto:" + email, text: email });
    return links;
  }

  function iconOnlyLink(link) {
    const attrs = { href: link.href, "aria-label": link.label + (link.external ? NEW_TAB : "") };
    if (link.external) {
      attrs.target = "_blank";
      attrs.rel = "noopener noreferrer";
    }
    return el("li", {}, [el("a", attrs, [icon(link.icon)])]);
  }

  function textLink(link) {
    const attrs = { href: link.href };
    const children = [icon(link.icon), el("span", { text: link.text || link.label })];
    if (link.external) {
      attrs.target = "_blank";
      attrs.rel = "noopener noreferrer";
      children.push(el("span", { class: "sr-only", text: NEW_TAB }));
    }
    return el("li", {}, [el("a", attrs, children)]);
  }

  function showSection(id) {
    const section = document.getElementById(id);
    const navItem = document.querySelector('[data-nav="' + id + '"]');
    if (section) section.hidden = false;
    if (navItem) navItem.hidden = false;
  }

  /* Sections */

  function renderIdentity() {
    const name = str(CONTENT.name);
    const displayName = str(CONTENT.displayName) || name;
    if (!displayName) return;

    if (name) document.title = name + " | Aspiring Cloud Engineer";

    const logo = $("#logo");
    logo.textContent = displayName;
    logo.hidden = false;

    const heroName = $("#hero-name");
    heroName.textContent = name || displayName;
    heroName.hidden = false;
  }

  function renderHero(hasProjects) {
    const intro = str(CONTENT.intro);
    if (intro) $("#hero-intro").textContent = intro;

    const status = [];
    if (str(CONTENT.location)) status.push("Based in " + str(CONTENT.location) + ".");
    if (str(CONTENT.learning)) status.push("Currently learning " + str(CONTENT.learning) + ".");
    if (status.length) {
      const node = $("#hero-status");
      node.textContent = status.join(" ");
      node.hidden = false;
    }

    const cta = $("#hero-cta");
    const github = httpUrl(CONTENT.github);
    if (hasProjects) {
      cta.append(el("a", { class: "btn btn-primary", href: "#projects", text: "View Projects" }));
    }
    if (github) {
      cta.append(
        externalLink(github, "GitHub Profile", {
          class: "btn " + (hasProjects ? "btn-secondary" : "btn-primary"),
        })
      );
    }
    cta.hidden = !cta.children.length;
  }

  function renderAbout() {
    const body = $("#about-body");
    const paragraphs = list(CONTENT.about);
    if (!paragraphs.length) return; // keep the default text from index.html
    body.replaceChildren(...paragraphs.map((paragraph) => el("p", { text: paragraph })));
  }

  function renderProjects() {
    const projects = Array.isArray(CONTENT.projects) ? CONTENT.projects : [];
    const target = $("#project-list");
    let count = 0;

    projects.forEach((project) => {
      const name = str(project && project.name);
      const description = str(project && project.description);
      if (!name) return;

      const repo = httpUrl(project.repo);
      const demo = httpUrl(project.demo);
      const tech = list(project.tech);
      const note = str(project.note);

      const links = [];
      if (repo) links.push(externalLink(repo, "GitHub repository", { class: "text-link" }));
      if (demo) links.push(externalLink(demo, "Live demo", { class: "text-link" }));

      const item = el("li", { class: "project" }, [el("h3", { text: name })]);
      if (description) item.append(el("p", { class: "project-desc", text: description }));
      if (tech.length) {
        item.append(
          el("ul", { class: "tags", "aria-label": "Technologies" }, tech.map((t) => el("li", { text: t })))
        );
      }
      if (note) item.append(el("p", { class: "project-note", text: note }));
      if (links.length) item.append(el("div", { class: "project-links" }, links));

      target.append(item);
      count += 1;
    });

    if (count) showSection("projects");
    return count > 0;
  }

  function renderSkills() {
    const skills = CONTENT.skills && typeof CONTENT.skills === "object" ? CONTENT.skills : {};
    const target = $("#skills-list");
    let count = 0;

    Object.entries(skills).forEach(([category, items]) => {
      const names = list(items);
      if (!names.length) return;
      target.append(
        el("div", { class: "skill-group" }, [
          el("dt", { text: category }),
          el("dd", {}, [
            el("ul", { class: "skill-items" }, names.map((n) => el("li", { text: n }))),
          ]),
        ])
      );
      count += 1;
    });

    if (count) showSection("skills");
  }

  function renderContactAndSocial() {
    const links = socialLinks();
    if (!links.length) return;

    $("#contact-links").append(...links.map(textLink));
    showSection("contact");

    const iconLinks = links.filter((link) => link.external);
    if (iconLinks.length) {
      const nav = $("#nav-social");
      nav.append(...iconLinks.map(iconOnlyLink));
      nav.hidden = false;
    }

    const footer = $("#footer-social");
    footer.append(...links.map(iconOnlyLink));
    footer.hidden = false;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    const name = str(CONTENT.name);
    $("#footer-text").textContent = "© " + year + (name ? " " + name : "");
  }

  /* Behavior */

  function setupMenu() {
    const toggle = $("#menu-toggle");
    const nav = $("#site-nav");

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    };

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) setOpen(false);
    });

    const desktop = window.matchMedia("(min-width: 46rem)");
    desktop.addEventListener("change", (event) => {
      if (event.matches) setOpen(false);
    });
  }

  function setupActiveLink() {
    if (!("IntersectionObserver" in window)) return;

    const links = Array.from(document.querySelectorAll(".nav-links a"));
    const targets = new Map();
    links.forEach((link) => {
      const section = document.getElementById(link.getAttribute("href").slice(1));
      if (section && !section.hidden) targets.set(section, link);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => link.removeAttribute("aria-current"));
          targets.get(entry.target).setAttribute("aria-current", "location");
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    targets.forEach((_link, section) => observer.observe(section));
  }

  /* Tell the owner what is still empty. Visible in the browser console only. */
  function reportMissing() {
    const missing = [];
    if (!str(CONTENT.name)) missing.push("name");
    if (!httpUrl(CONTENT.github)) missing.push("github");
    if (!httpUrl(CONTENT.linkedin)) missing.push("linkedin");
    if (!emailAddress(CONTENT.email)) missing.push("email");
    if (!list(CONTENT.about).length) missing.push("about paragraphs");
    if (!Array.isArray(CONTENT.projects) || !CONTENT.projects.length) missing.push("projects");
    const skills = CONTENT.skills || {};
    if (!Object.values(skills).some((items) => list(items).length)) missing.push("skills");
    if (missing.length) console.info("[portfolio] Not set yet in script.js: " + missing.join(", "));
  }

  function init() {
    renderIdentity();
    renderAbout();
    const hasProjects = renderProjects();
    renderHero(hasProjects);
    renderSkills();
    renderContactAndSocial();
    renderFooter();
    setupMenu();
    setupActiveLink();
    reportMissing();
  }

  init();
})();
