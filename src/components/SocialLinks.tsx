import type { SocialLink } from "../types";
import { NEW_TAB } from "./ExternalLink";
import { ArrowUpRight, Icon } from "./Icons";

interface SocialIconListProps {
  id: string;
  className: string;
  links: SocialLink[];
}

export function SocialIconList({ id, className, links }: SocialIconListProps) {
  if (!links.length) return null;

  return (
    <ul className={className} id={id} aria-label="Social links">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            aria-label={link.label + (link.external ? NEW_TAB : "")}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            <Icon name={link.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SocialTextLink({ link }: { link: SocialLink }) {
  return (
    <li>
      <a
        className="contact-row"
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
      >
        <Icon name={link.icon} />
        <span className="contact-label">{link.label}</span>
        <span className="contact-handle">{link.handle}</span>
        {link.external && <span className="sr-only">{NEW_TAB}</span>}
        <ArrowUpRight />
      </a>
    </li>
  );
}
