import { About } from "./About";
import { Band } from "./Band";
import { Contact } from "./Contact";
import { HowItWorks } from "./HowItWorks";
import { Paths } from "./Paths";
import { Services } from "./Services";
import { Team } from "./Team";

/** Everything below the hero, shared by every hero variant. */
export function Landing() {
  return (
    <>
      <About />
      <Services />
      <Paths />
      <HowItWorks />
      <Team />
      <Contact />
      <Band />
    </>
  );
}
