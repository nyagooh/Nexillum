import type { ComponentType } from "react";
import { HeroCollection } from "../variants/collection/HeroCollection";
import { HeroFuture } from "../variants/future/HeroFuture";
import { HeroEditorial } from "./HeroEditorial";
import { HeroPills } from "./HeroPills";
import { HeroSky } from "./HeroSky";

/** Hero variants. Everything below the hero is the same landing page for all of them. */
export const HEROES: { id: string; name: string; note: string; Component: ComponentType }[] = [
  { id: "a", name: "Pills", note: "Homepage today · centred statement, rolling pill, photo tile strip", Component: HeroPills },
  { id: "b", name: "Editorial", note: "Clay-illustrated panels open on hover", Component: HeroEditorial },
  { id: "c", name: "Sky", note: "Full-bleed photo above the clouds · fly up through the cloud layer", Component: HeroSky },
  { id: "d", name: "Collection", note: "Dark studio, storm backdrop, live 3D clay mark, lookbook rail", Component: HeroCollection },
  { id: "e", name: "Future", note: "Drifting sky, giant type, a towering cloud framed in an arch", Component: HeroFuture },
];
