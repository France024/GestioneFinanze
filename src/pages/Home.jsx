import React, { useMemo } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import SummaryCard from "../components/SummaryCard.jsx";

const money = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

export default function Home({ appData }) {
  const { transactions, goals } = appData;

  const monthKey = new Date().toISOString().slice(0, 7);
  const currentMonthTransactions = transactions.filter((item) => item.date.startsWith(monthKey));
  const totalIncome = currentMonthTransactions.filter((item) => item.type === "entrata").reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = currentMonthTransactions.filter((item) => item.type === "uscita").reduce((sum, item) => sum + item.amount, 0);
  const currentBalance = totalIncome - totalExpenses;

  const previousMonthKey = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().slice(0, 7);
  const previousMonthTransactions = transactions.filter((item) => item.date.startsWith(previousMonthKey));
  const previousIncome = previousMonthTransactions.filter((item) => item.type === "entrata").reduce((sum, item) => sum + item.amount, 0);
  const previousExpenses = previousMonthTransactions.filter((item) => item.type === "uscita").reduce((sum, item) => sum + item.amount, 0);
  const previousBalance = previousIncome - previousExpenses;

  const progressGoals = goals.slice(0, 3);
  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  const summaryTone = currentBalance >= 0 ? "positive" : "negative";

  const snapshot = useMemo(() => {
    return [
      { label: "Saldo attuale", value: money.format(currentBalance), tone: summaryTone },
      { label: "Entrate mese", value: money.format(totalIncome), tone: "positive" },
      { label: "Uscite mese", value: money.format(totalExpenses), tone: "negative" },
    ];
  }, [currentBalance, totalIncome, totalExpenses, summaryTone]);

  return (
    <section className="dashboard-page">
      <div className="dashboard-page__header">
        <div>
          <span className="page-empty__num">01</span>
          <h1 className="page-empty__title">Dashboard</h1>
          <p className="page-empty__hint">Panoramica rapida della situazione finanziaria con saldo, obiettivi e ultime transazioni.</p>
        </div>
        <div className="stats-chip">
          <strong>{transactions.length}</strong>
          <span>movimenti</span>
        </div>
      </div>

      <div className="summary-grid">
        {snapshot.map((item) => (
          <SummaryCard key={item.label} label={item.label} value={item.value} tone={item.tone} />
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="section-card">
          <header className="section-card__header">
            <h2>Confronto con il mese precedente</h2>
            <span>{previousBalance >= 0 ? "Positivo" : "Negativo"}</span>
          </header>
          <div className="comparison-row">
            <div className="trend-box">
              <ArrowUpRight size={16} />
              <span>Entrate: {money.format(previousIncome)}</span>
            </div>
            <div className="trend-box">
              <ArrowDownRight size={16} />
              <span>Uscite: {money.format(previousExpenses)}</span>
            </div>
          </div>
          <p className="empty-list">Saldo del mese corrente: {money.format(currentBalance)}. Il confronto è stato calcolato automaticamente in locale.</p>
        </section>

        <section className="section-card">
          <header className="section-card__header">
            <h2>Obiettivi attivi</h2>
            <span>{progressGoals.length}</span>
          </header>
          <div className="stack-list">
            {progressGoals.map((goal) => {
              const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
              const tone = goal.type === "uscita" ? (progress >= 100 ? "negative" : progress >= 80 ? "warning" : "positive") : (progress >= 100 ? "positive" : "neutral");
              return (
                <div key={goal.id} className="goal-row">
                  <div className="goal-row__top">
                    <strong>{goal.name}</strong>
                    <span>{money.format(goal.currentAmount)} / {money.format(goal.targetAmount)}</span>
                  </div>
                  <div className="progress-bar">
                    <span className={`progress-bar__fill progress-bar__fill--${tone}`} style={{ width: `${progress}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="section-card">
        <header className="section-card__header">
          <h2>Ultime transazioni</h2>
          <span>{recentTransactions.length}</span>
        </header>
        <div className="stack-list">
          {recentTransactions.map((transaction) => (
            <div className="transaction-row" key={transaction.id}>
              <div className="transaction-row__meta">
                <span className="emoji-badge" style={{ background: `${transaction.color}22`, color: transaction.color }}>{transaction.icon}</span>
                <div>
                  <strong>{transaction.category}</strong>
                  <small>{transaction.description}</small>
                </div>
              </div>
              <div className="transaction-row__right">
                <span className={transaction.type === "entrata" ? "amount amount--positive" : "amount amount--negative"}>{transaction.type === "entrata" ? "+" : "-"}{money.format(transaction.amount)}</span>
                <small>{transaction.date}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
