"use client";

import { useEffect } from "react";

/** Fades `.reveal` elements in as they enter the viewport, including ones mounted later (hot reload, swapped sections). */
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

    const watch = () =>
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-in):not([data-watched])").forEach((el, i) => {
        el.dataset.watched = "";
        el.style.transitionDelay = `${(i % 3) * 70}ms`;
        io.observe(el);
      });

    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.querySelectorAll<HTMLElement>("[data-watched]").forEach((el) => delete el.dataset.watched);
    };
  }, []);

  return null;
}
