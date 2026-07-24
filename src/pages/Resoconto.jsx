import React, { useMemo, useState } from "react";

const money = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

export default function Resoconto({ appData }) {
  const [mode, setMode] = useState("mensile");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const rangeTransactions = useMemo(() => {
    const items = [...appData.transactions];

    if (mode === "mensile") {
      return items.filter((item) => item.date.startsWith(month));
    }

    if (mode === "annuale") {
      return items.filter((item) => item.date.startsWith(String(year)));
    }

    return items.filter((item) => item.date >= startDate && item.date <= endDate);
  }, [appData.transactions, endDate, mode, month, startDate, year]);

  const income = rangeTransactions.filter((item) => item.type === "entrata").reduce((sum, item) => sum + item.amount, 0);
  const expenses = rangeTransactions.filter((item) => item.type === "uscita").reduce((sum, item) => sum + item.amount, 0);
  const net = income - expenses;

  const categoryTotals = Object.entries(
    rangeTransactions.reduce((accumulator, item) => {
      accumulator[item.category] = (accumulator[item.category] || 0) + item.amount;
      return accumulator;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const averageIncome = income / Math.max(1, rangeTransactions.length || 1);
  const averageExpenses = expenses / Math.max(1, rangeTransactions.length || 1);
  const projection = net + (rangeTransactions.length ? net / Math.max(1, rangeTransactions.length) : 0);

  return (
    <section className="page-stack">
      <div className="page-stack__header">
        <div>
          <span className="page-empty__num">03</span>
          <h1 className="page-empty__title">Resoconti</h1>
          <p className="page-empty__hint">Selettore mensile, annuale e personalizzato con riepilogo numerico, lista raggruppata e statistiche di proiezione.</p>
        </div>
      </div>

      <section className="filter-bar">
        <label className="field compact">
          <span>Modalità</span>
          <select value={mode} onChange={(event) => setMode(event.target.value)}>
            <option value="mensile">Mensile</option>
            <option value="annuale">Annuale</option>
            <option value="personalizzato">Personalizzato</option>
          </select>
        </label>

        {mode === "mensile" && (
          <label className="field compact">
            <span>Mese</span>
            <input type="month" value={month} onChange={(event) => setMonth(event.target.value)} />
          </label>
        )}

        {mode === "annuale" && (
          <label className="field compact">
            <span>Anno</span>
            <input type="number" min="2020" value={year} onChange={(event) => setYear(Number(event.target.value))} />
          </label>
        )}

        {mode === "personalizzato" && (
          <>
            <label className="field compact">
              <span>Inizio</span>
              <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            </label>
            <label className="field compact">
              <span>Fine</span>
              <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
            </label>
          </>
        )}
      </section>

      <div className="summary-grid">
        <article className="summary-card summary-card--positive"><span className="summary-card__label">Entrate</span><strong className="summary-card__value">{money.format(income)}</strong></article>
        <article className="summary-card summary-card--negative"><span className="summary-card__label">Uscite</span><strong className="summary-card__value">{money.format(expenses)}</strong></article>
        <article className="summary-card summary-card--neutral"><span className="summary-card__label">Saldo netto</span><strong className="summary-card__value">{money.format(net)}</strong></article>
      </div>

      <div className="dashboard-grid">
        <section className="section-card">
          <header className="section-card__header"><h2>Classifica per categoria</h2><span>{categoryTotals.length}</span></header>
          <div className="stack-list">
            {categoryTotals.map(([category, value]) => (
              <div key={category} className="goal-row">
                <div className="goal-row__top"><strong>{category}</strong><span>{money.format(value)}</span></div>
                <div className="progress-bar"><span className="progress-bar__fill progress-bar__fill--positive" style={{ width: `${Math.min((value / Math.max(1, income + expenses)) * 100, 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card">
          <header className="section-card__header"><h2>Statistiche avanzate</h2><span>locale</span></header>
          <div className="stack-list">
            <div className="trend-box"><span>Media entrate</span><strong>{money.format(averageIncome)}</strong></div>
            <div className="trend-box"><span>Media uscite</span><strong>{money.format(averageExpenses)}</strong></div>
            <div className="trend-box"><span>Proiezione saldo</span><strong>{money.format(projection)}</strong></div>
          </div>
        </section>
      </div>
    </section>
  );
}
