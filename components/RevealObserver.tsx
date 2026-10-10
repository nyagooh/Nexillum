"use client";

import { useEffect } from "react";

/** Fades `.reveal` elements in as they enter the viewport. */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 70}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
