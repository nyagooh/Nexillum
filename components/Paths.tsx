import { AudienceLink } from "./Audience";
import { Mark } from "./BrandDefs";
import { ArrowDot, SectionLabel } from "./ui";

export function Paths() {
  return (
    <section className="section section--light" id="paths">
      <div className="wrap paths">
        <div className="paths__head reveal">
          <SectionLabel no="02">Who we serve</SectionLabel>
          <h2 className="h2 h2--xl">One bridge. Two ways in.</h2>
        </div>

        <div className="paths__cards">
          <article className="path reveal">
            <span className="path__icon path__icon--lime"><Mark /></span>
            <div>
              <h3>For founders</h3>
              <p>Startups, SMEs and technology-led businesses building on the cloud.</p>
              <ul className="chips">
                <li>AWS architecture</li><li>Activate credits</li><li>Engineering support</li>
              </ul>
              <AudienceLink audience="founder" className="link-arrow">Apply to the programme <ArrowDot /></AudienceLink>
            </div>
          </article>

          <article className="path reveal">
            <span className="path__icon path__icon--violet"><Mark /></span>
            <div>
              <h3>For organisations</h3>
              <p>Companies, investors and institutions working with or into Africa.</p>
              <ul className="chips">
                <li>Market entry</li><li>BD support</li><li>Delivery capacity</li>
              </ul>
              <AudienceLink audience="org" className="link-arrow">Talk to partnerships <ArrowDot /></AudienceLink>
            </div>
          </article>

          <a href="#contact" className="path path--lime reveal">
            <h3>Not sure which? Say hello.</h3>
            <ArrowDot dir="se" />
          </a>
        </div>
      </div>
    </section>
  );
}
