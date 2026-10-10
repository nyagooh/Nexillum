import { Clouds } from "./Clouds";
import { ArrowDot, SectionLabel } from "./ui";

const ICONS: Record<string, React.ReactNode> = {
  credits: <><circle cx="9" cy="9" r="5" /><path d="M14.5 6.2A5 5 0 1 1 9 19" /></>,
  cloud: <path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.3 4.4 4.4 0 0 0 7 18Z" />,
  migrate: <path d="M4 8h14l-3-3M20 16H6l3 3" />,
  devops: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />,
  cost: <path d="M3 7l6 6 4-4 8 8M21 12v5h-5" />,
};

const SERVICES = [
  {
    icon: "credits",
    tag: "Credits",
    title: "AWS Activate credits",
    body: "We check eligibility, prepare your application and help you spend credits on what moves the product.",
  },
  {
    icon: "cloud",
    tag: "Architecture",
    title: "Cloud architecture",
    body: "Well-architected AWS foundations: accounts, networking, security and environments that hold up when traffic does.",
  },
  {
    icon: "migrate",
    tag: "Migration",
    title: "Migration",
    body: "Off a single server or another provider and onto AWS. Planned, staged and reversible.",
  },
  {
    icon: "devops",
    tag: "DevOps",
    title: "DevOps & CI/CD",
    body: "Infrastructure as code, pipelines and monitoring your team owns and understands.",
  },
  {
    icon: "cost",
    tag: "Cost",
    title: "Cost optimisation",
    body: "A predictable bill, before and after the credits run out.",
  },
];

export function Services() {
  return (
    <section className="section section--dark" id="services">
      <Clouds tone="dark" set="a" />
      <div className="wrap">
        <div className="reveal">
          <SectionLabel no="02">What we do</SectionLabel>
          <h2 className="h2">Everything your startup needs from the cloud.</h2>
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
          <a href="#contact" className="card card--lime reveal">
            <span>Book an architecture review</span>
            <ArrowDot />
          </a>
        </div>
      </div>
    </section>
  );
}
