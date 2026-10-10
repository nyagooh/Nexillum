import { AudienceLink } from "./Audience";
import { ArrowDot, SectionLabel } from "./ui";

const ICONS: Record<string, React.ReactNode> = {
  cloud: <path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.3 4.4 4.4 0 0 0 7 18Z" />,
  credits: <><circle cx="9" cy="9" r="5" /><path d="M14.5 6.2A5 5 0 1 1 9 19" /></>,
  ai: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" /></>,
  people: <><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M15.5 5.6a3 3 0 0 1 0 5.8M17 14a5.5 5.5 0 0 1 3.5 5" /></>,
};

const SERVICES = [
  {
    icon: "cloud",
    tag: "Founders · Organisations",
    title: "Cloud architecture & migration",
    body: "Well-architected AWS foundations, or a planned move off the single server. Accounts, networking, security, environments.",
  },
  {
    icon: "credits",
    tag: "Founders",
    title: "Credits & cost",
    body: "We help you qualify for AWS Activate credits, then keep your bill predictable once they run out.",
  },
  {
    icon: "ai",
    tag: "Founders · Organisations",
    title: "AI & data engineering",
    body: "Pipelines, models and AI features in production on infrastructure you own and understand.",
  },
  {
    icon: "globe",
    tag: "Organisations",
    title: "Market entry & BD",
    body: "Local context, partners and introductions for companies and institutions working into African markets.",
  },
  {
    icon: "people",
    tag: "Organisations",
    title: "Delivery capacity",
    body: "Engineers and technical leads on the ground, working to your standards and your time zone.",
  },
];

export function Services() {
  return (
    <section className="section section--dark" id="services">
      <div className="wrap">
        <div className="reveal">
          <SectionLabel no="01">What we do</SectionLabel>
          <h2 className="h2">Cloud, credits and capacity on both sides of the bridge.</h2>
        </div>

        <div className="cards">
          {SERVICES.map((s) => (
            <article key={s.title} className="card reveal">
              <span className="card__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[s.icon]}</svg>
              </span>
              <p className="tag-brace">{s.tag}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
          <AudienceLink audience="founder" className="card card--lime reveal">
            <span>Book an architecture review</span>
            <ArrowDot />
          </AudienceLink>
        </div>
      </div>
    </section>
  );
}
