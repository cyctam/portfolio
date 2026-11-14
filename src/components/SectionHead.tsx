interface SectionHeadProps {
  id: string;
  meta: string;
  title: string;
}

export function SectionHead({ id, meta, title }: SectionHeadProps) {
  return (
    <div className="section-head">
      <p className="section-meta">{meta}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
