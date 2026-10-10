import { Mark } from "./BrandDefs";
import { Clouds } from "./Clouds";
import { ArrowDot } from "./ui";

// The form opens the visitor's mail client. Point `action` at a form service to receive submissions directly.
export function Contact() {
  return (
    <section className="contact" id="contact">
      <Clouds tone="dark" set="b" />
      <div className="contact__bar wrap">
        <p className="eyebrow-dot eyebrow-dot--dark"><i aria-hidden="true" /> Always open for builders</p>
      </div>

      <div className="contact__grid wrap">
        <div className="contact__left reveal">
          <h2 className="contact__title">
            Let’s build<br />what’s<br />next<span className="lime">.</span>
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
          <p className="contact__lede">Tell us about your startup. An engineer replies within two working days.</p>

          <form className="form" action="mailto:hello@nexillum.com" method="post" encType="text/plain">
            <label><span>Name</span><input name="name" required autoComplete="name" /></label>
            <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
            <label><span>Startup</span><input name="startup" /></label>
            <label>
              <span>Stage</span>
              <select name="stage">
                <option>Idea</option><option>Pre-seed</option><option>Seed</option><option>Series A+</option>
              </select>
            </label>
            <label className="full">
              <span>Applying for AWS credits?</span>
              <select name="credits">
                <option>Yes</option><option>Not yet</option><option>Already have credits</option>
              </select>
            </label>
            <label className="full"><span>What are you building?</span><textarea name="message" rows={3} /></label>
            <button className="pill pill--lime pill--lg full" type="submit">Send <ArrowDot /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
