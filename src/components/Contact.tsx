import { ContactForm } from "./ContactForm";
import { SectionHead } from "./SectionHead";

const NOTES = [
  {
    label: "CURRENTLY EXPLORING",
    text: "Cloud Infrastructure · DevOps Automation · Backend Systems",
  },
  {
    label: "OPEN TO OPPORTUNITIES",
    text: "Interested in learning from experienced engineers, collaborating on meaningful projects, and growing in cloud and DevOps engineering.",
  },
];

/** Always on the page. The social links live in the header, hero and footer. */
export function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <SectionHead id="contact-title" meta="04 / contact" title="Contact" />
          <p className="contact-text">
            If you want to talk about cloud, DevOps or a project, get in touch.
          </p>


<ul className="contact-notes">
  {NOTES.map((note, index) => (
    <li
      className={`card note reveal note-${index + 1}`}
      key={note.label}
    >
      <h3 className="note-label">{note.label}</h3>
      <p className="note-text">{note.text}</p>
    </li>
  ))}
</ul>

        </div>

        <ContactForm />
      </div>
    </section>
  );
}