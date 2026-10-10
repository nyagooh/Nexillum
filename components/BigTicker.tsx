import { Fragment } from "react";

const ITEMS = ["Cloud architecture", "AWS credits", "AI engineering", "Market entry", "Delivery capacity", "Africa ↔ World"];

export function BigTicker() {
  // Rendered twice so the -50% loop is seamless
  return (
    <div className="bigticker" aria-hidden="true">
      <div className="bigticker__track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <Fragment key={i}>
            <span>{item}</span>
            <i>✳</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
