import { useActiveSection } from "../hooks/useActiveSection";
import { useMobileMenu } from "../hooks/useMobileMenu";
import type { SocialLink, NavItem } from "../types";
import { SocialIconList } from "./SocialLinks";

interface HeaderProps {
  logoName: string;
  nav: NavItem[];
  social: SocialLink[];
}

export function Header({ logoName, nav, social }: HeaderProps) {
  const { open, setOpen, toggleRef } = useMobileMenu();
  const current = useActiveSection(nav.map((item) => item.id));

  return (
    <header className="site-header">
      <div className={open ? "pill is-open" : "pill"}>
        {logoName && (
          <a className="logo" id="logo" href="#top">
            <span className="logo-mark" aria-hidden="true">
              {logoName.charAt(0).toUpperCase()}
            </span>
            <span className="logo-name">{logoName}</span>
          </a>
        )}

        <button
          ref={toggleRef}
          className="menu-toggle"
          id="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <span className="burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <nav
          className={open ? "site-nav is-open" : "site-nav"}
          id="site-nav"
          aria-label="Main"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
          }}
        >
          <ul className="nav-links">
            {nav.map((item) => (
              <li
                key={item.id}
                className={item.id === "contact" ? "nav-cta" : undefined}
                data-nav={item.optional ? item.id : undefined}
              >
                <a
                  href={"#" + item.id}
                  aria-current={current === item.id ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <SocialIconList
            id="nav-social"
            className="nav-social"
            links={social.filter((link) => link.external)}
          />
        </nav>
      </div>
    </header>
  );
}
