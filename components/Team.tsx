import { Mark } from "./BrandDefs";
import { ArrowDot, SectionLabel } from "./ui";

// Placeholders: swap in real names, roles and photos
const PEOPLE = [
  { name: "Name Surname", role: "Founder & CEO" },
  { name: "Name Surname", role: "Head of Cloud Engineering" },
  { name: "Name Surname", role: "Partnerships & Markets" },
];

export function Team() {
  return (
    <section className="section section--dark section--flush" id="team">
      <div className="wrap">
        <div className="reveal">
          <SectionLabel no="04">Leadership</SectionLabel>
          <h2 className="h2">Two fluencies. One team. Boardroom and grassroots.</h2>
        </div>
        <div className="people">
          {PEOPLE.map((p) => (
            <article key={p.role} className="person reveal">
              <div className="person__photo"><Mark /></div>
              <h3>{p.name}</h3>
              <p>{p.role}</p>
            </article>
          ))}
          <a href="mailto:careers@nexillum.com" className="person person--join reveal">
            <span className="person__join-q">Are<br />you?</span>
            <span className="person__join-cta">Join Nexillum <ArrowDot /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
