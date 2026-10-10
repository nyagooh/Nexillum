import { HeroBridge } from "./HeroBridge";
import { HeroPills } from "./HeroPills";
import { HeroSplit } from "./HeroSplit";
import { HeroTerminal } from "./HeroTerminal";

export const HEROES = [
  { id: "a", name: "Pills", note: "Centred statement, brand lines rolling through a pill, tile strip below", Component: HeroPills },
  { id: "b", name: "Bridge", note: "Africa ↔ World with a route map, traffic moving both ways", Component: HeroBridge },
  { id: "c", name: "Split", note: "Dark, the split cloud opens as you scroll and follows the cursor", Component: HeroSplit },
  { id: "d", name: "Terminal", note: "Founder-facing, a live onboarding terminal types beside the headline", Component: HeroTerminal },
];
