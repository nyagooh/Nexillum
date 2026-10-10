"use client";

import { useAudience, type Audience } from "./Audience";
import { Mark } from "./BrandDefs";
import { ArrowDot } from "./ui";

const SEGMENTS: { id: Audience; label: string }[] = [
  { id: "founder", label: "I’m a founder" },
  { id: "org", label: "I’m an organisation" },
];

// Forms open the visitor's mail client. Point `action` at a form service to receive submissions directly.
export function Contact() {
  const { audience, setAudience } = useAudience();

  return (
    <section className="contact" id="contact">
      <div className="contact__bar wrap">
        <p className="eyebrow-dot eyebrow-dot--dark"><i aria-hidden="true" /> Always open for builders</p>
        <a href="#top" className="backtop">Back to top <ArrowDot dir="up" /></a>
      </div>

      <div className="contact__grid wrap">
        <div className="contact__left reveal">
          <h2 className="contact__title">
            Let’s build<br />beyond<br />borders<span className="lime">.</span>
          </h2>
          <p className="contact__sub">Same cloud. Higher possibilities.</p>
        </div>

        <div className="contact__right reveal">
          <div className="contact__brand">
            <Mark className="contact__mark" />
            <span>Nexillum</span>
          </div>
          <p className="contact__label">Our contact</p>
          <a className="contact__email" href="mailto:hello@nexillum.com">
            hello<span className="lime">@</span>nexillum.com
          </a>
          <p className="contact__lede">
            Tell us who you are. The right person replies within two working days.
          </p>

          <div className="seg" role="tablist" aria-label="I am">
            {SEGMENTS.map((s) => (
              <button key={s.id} role="tab" aria-selected={audience === s.id} onClick={() => setAudience(s.id)}>
                {s.label}
              </button>
            ))}
          </div>

          {audience === "founder" ? (
            <form className="form" action="mailto:founders@nexillum.com" method="post" encType="text/plain">
              <label><span>Name</span><input name="name" required autoComplete="name" /></label>
              <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
              <label><span>Startup</span><input name="startup" /></label>
              <label>
                <span>Stage</span>
                <select name="stage">
                  <option>Idea</option><option>Pre-seed</option><option>Seed</option><option>Series A+</option>
                </select>
              </label>
              <label className="full"><span>What are you building?</span><textarea name="message" rows={3} /></label>
              <button className="pill pill--lime pill--lg full" type="submit">Send to the founder team <ArrowDot /></button>
            </form>
          ) : (
            <form className="form" action="mailto:partners@nexillum.com" method="post" encType="text/plain">
              <label><span>Name</span><input name="name" required autoComplete="name" /></label>
              <label><span>Work email</span><input name="email" type="email" required autoComplete="email" /></label>
              <label><span>Organisation</span><input name="organisation" autoComplete="organization" /></label>
              <label>
                <span>Interest</span>
                <select name="interest">
                  <option>Cloud &amp; AI delivery</option><option>Market entry</option><option>BD support</option>
                  <option>Delivery capacity</option><option>Something else</option>
                </select>
              </label>
              <label className="full"><span>How can we help?</span><textarea name="message" rows={3} /></label>
              <button className="pill pill--lime pill--lg full" type="submit">Send to partnerships <ArrowDot /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
