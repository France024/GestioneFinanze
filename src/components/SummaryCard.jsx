import React from "react";

export default function SummaryCard({ label, value, tone = "neutral" }) {
  return (
    <article className={`summary-card summary-card--${tone}`}>
      <span className="summary-card__label">{label}</span>
      <strong className="summary-card__value">{value}</strong>
    </article>
  );
}
