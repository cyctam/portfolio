import type { SocialLink } from "../types";
import { ArrowUp } from "./Icons";
import { SocialIconList } from "./SocialLinks";

interface FooterProps {
  name: string;
  links: SocialLink[];
}

export function Footer({ name, links }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p id="footer-text">{"© " + year + (name ? " " + name : "")}</p>
        <SocialIconList id="footer-social" className="footer-social" links={links} />
        <a className="to-top" href="#top">
          Back to top
          <ArrowUp />
        </a>
      </div>
    </footer>
  );
}
