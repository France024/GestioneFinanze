import React from "react";

export default function EmptyPage({ label, num }) {
  return (
    <div className="page-empty">
      <span className="page-empty__num">{num}</span>
      <h1 className="page-empty__title">{label}</h1>
      <p className="page-empty__hint">Questa sezione è pronta. Il contenuto arriverà qui.</p>
    </div>
  );
}
