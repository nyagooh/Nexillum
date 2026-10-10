"use client";

import { motion } from "motion/react";
import { Mark } from "./BrandDefs";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "AWS Activate credits", href: "#services" },
      { label: "Cloud architecture", href: "#services" },
      { label: "Migration", href: "#services" },
      { label: "DevOps & CI/CD", href: "#services" },
      { label: "Cost optimisation", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "How it works", href: "#how" },
      { label: "Team", href: "#team" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@nexillum.com", href: "mailto:hello@nexillum.com" },
      { label: "Apply for AWS credits", href: "#contact" },
      { label: "Book an architecture review", href: "#contact" },
    ],
  },
];

const NAME = "Nexillum".split("");
const LETTER = { hidden: { y: "70%", opacity: 0 }, show: { y: "0%", opacity: 1 } };

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div className="footer__brand">
          <a className="footer__logo" href="#top">
            <Mark className="footer__mark" />
            <span>Nexillum</span>
          </a>
          <p>AWS credits and cloud services for startups. Same cloud. Higher possibilities.</p>
        </div>

        <div className="footer__cols">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="footer__heading">{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Letters rise in once as the wordmark scrolls into view */}
      <div className="wrap">
        <motion.div
          className="footer__name"
          aria-hidden="true"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {NAME.map((ch, i) => (
            <motion.span key={i} variants={LETTER} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}>
              {ch}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="wrap">
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Nexillum. All rights reserved.</span>
          <span>Nairobi, Kenya</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
