import { Mark } from "./BrandDefs";
import { Clouds } from "./Clouds";
import { ArrowDot, SectionLabel } from "./ui";

const STAGES = [
  {
    title: "Idea & pre-seed",
    body: "Credits, a first architecture and the basics done right.",
    chips: ["AWS Activate", "Landing zone", "Security basics"],
    cta: "Apply for credits",
    tone: "lime",
  },
  {
    title: "Seed",
    body: "Infrastructure that scales with your first real users.",
    chips: ["CI/CD", "Monitoring", "Cost controls"],
    cta: "Talk to an engineer",
    tone: "violet",
  },
  {
    title: "Series A and beyond",
    body: "Reliability, performance and a bill that makes sense.",
    chips: ["Reliability", "Performance", "Cost reviews"],
    cta: "Book a review",
    tone: "ink",
  },
];

export function Paths() {
  return (
    <section className="section section--light" id="stages">
      <Clouds set="b" />
      <div className="wrap paths">
        <div className="paths__head reveal">
          <SectionLabel no="03">Who it’s for</SectionLabel>
          <h2 className="h2 h2--xl">Built for every stage.</h2>
        </div>

        <div className="paths__cards">
          {STAGES.map((s) => (
            <article key={s.title} className="path reveal">
              <span className={`path__icon path__icon--${s.tone}`}><Mark /></span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="chips">
                  {s.chips.map((c) => <li key={c}>{c}</li>)}
                </ul>
                <a href="#contact" className="link-arrow">{s.cta} <ArrowDot /></a>
              </div>
            </article>
          ))}

          <a href="#contact" className="path path--lime reveal">
            <h3>Not sure where you fit? Say hello.</h3>
            <ArrowDot dir="se" />
          </a>
        </div>
      </div>
    </section>
  );
}
