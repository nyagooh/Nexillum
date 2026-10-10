"use client";

import { createContext, useContext, useState } from "react";

export type Audience = "founder" | "org";

const AudienceContext = createContext<{
  audience: Audience;
  setAudience: (a: Audience) => void;
}>({ audience: "founder", setAudience: () => {} });

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudience] = useState<Audience>("founder");
  return <AudienceContext.Provider value={{ audience, setAudience }}>{children}</AudienceContext.Provider>;
}

export const useAudience = () => useContext(AudienceContext);

/** A link to #contact that also pre-selects the matching contact form. */
export function AudienceLink({
  audience,
  className,
  children,
}: {
  audience: Audience;
  className?: string;
  children: React.ReactNode;
}) {
  const { setAudience } = useAudience();
  return (
    <a className={className} href="#contact" onClick={() => setAudience(audience)}>
      {children}
    </a>
  );
}
