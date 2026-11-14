
import { useEffect, useState } from "react";

const phrases = [
  "Turning ideas into working systems.",
  "Learning the cloud, one deployment at a time.",
  "Automating the boring stuff with IaC.",
  "Curious about security, ML, and everything in between.",
  "Always poking around under the hood.",
];

export function AnimatedIntro() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];

    const timer = window.setTimeout(() => {
      if (!deleting) {
        if (text.length < phrase.length) {
          setText(phrase.slice(0, text.length + 1));
        } else {
          setDeleting(true);
        }
      } else if (text.length > 0) {
        setText(phrase.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
      }
    }, !deleting && text === phrase ? 1600 : deleting ? 30 : 65);

    return () => window.clearTimeout(timer);
  }, [text, deleting, phraseIndex]);

  return (
    <span className="animated-intro">
      <span aria-hidden="true">{text}</span>
      <span className="typing-cursor" aria-hidden="true" />
      <span className="sr-only">{phrases.join(" ")}</span>
    </span>
  );
}
