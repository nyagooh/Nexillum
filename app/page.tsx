import { AudienceProvider } from "@/components/Audience";
import { BigTicker } from "@/components/BigTicker";
import { BrandDefs } from "@/components/BrandDefs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HeroPills } from "@/components/heroes/HeroPills";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { Paths } from "@/components/Paths";
import { RevealObserver } from "@/components/RevealObserver";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";

// Hero variants live in components/heroes; compare them at /heroes and swap the import here.
export default function Home() {
  return (
    <AudienceProvider>
      <BrandDefs />
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <HeroPills />
        <Services />
        <Paths />
        <BigTicker />
        <HowItWorks />
        <Team />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </AudienceProvider>
  );
}
