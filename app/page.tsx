import { BrandDefs } from "@/components/BrandDefs";
import { Footer } from "@/components/Footer";
import { HeroPills } from "@/components/heroes/HeroPills";
import { Landing } from "@/components/Landing";
import { Nav } from "@/components/Nav";
import { RevealObserver } from "@/components/RevealObserver";

// Hero variants live in components/heroes; compare full pages at /heroes and swap the hero here.
export default function Home() {
  return (
    <>
      <BrandDefs />
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <HeroPills />
        <Landing />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
