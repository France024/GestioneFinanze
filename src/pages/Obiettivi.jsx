import React, { useState } from "react";

const money = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

const emptyGoal = {
  name: "",
  type: "uscita",
  categoryId: "",
  period: "mensile",
  targetAmount: "",
  notifyThresholds: "50,80,100",
};

export default function Obiettivi({ appData, setAppData }) {
  const [form, setForm] = useState(emptyGoal);

  const addGoal = (event) => {
    event.preventDefault();
    if (!form.name || !form.targetAmount) return;

    const goal = {
      id: `goal-${Date.now()}`,
      name: form.name,
      type: form.type,
      categoryId: form.categoryId || null,
      categoryName: form.categoryId || "Totale",
      period: form.period,
      targetAmount: Number(form.targetAmount),
      currentAmount: 0,
      notifyThresholds: form.notifyThresholds.split(",").map((value) => Number(value.trim())).filter(Boolean),
      notifiedThresholds: [],
      recurring: form.period === "mensile",
    };

    setAppData((current) => ({ ...current, goals: [goal, ...current.goals] }));
    setForm(emptyGoal);
  };

  const removeGoal = (goalId) => {
    setAppData((current) => ({ ...current, goals: current.goals.filter((goal) => goal.id !== goalId) }));
  };

  return (
    <section className="page-stack">
      <div className="page-stack__header">
        <div>
          <span className="page-empty__num">04</span>
          <h1 className="page-empty__title">Obiettivi</h1>
          <p className="page-empty__hint">Imposta budget su spesa, guadagno o saldo e monitora il progresso con soglie di notifica.</p>
        </div>
      </div>

      <div className="categories-layout">
        <form className="category-form" onSubmit={addGoal}>
          <div className="form-header">
            <div>
              <span className="label-pill">Nuovo</span>
              <h2>Crea obiettivo</h2>
            </div>
          </div>
          <label className="field">
            <span>Nome obiettivo</span>
            <input type="text" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Es. Budget benzina" />
          </label>
          <label className="field">
            <span>Tipo</span>
            <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}>
              <option value="uscita">Uscita</option>
              <option value="entrata">Entrata</option>
              <option value="saldo">Saldo</option>
            </select>
          </label>
          <label className="field">
            <span>Periodo</span>
            <select value={form.period} onChange={(event) => setForm((current) => ({ ...current, period: event.target.value }))}>
              <option value="mensile">Mensile</option>
              <option value="annuale">Annuale</option>
              <option value="nessuno">Nessuno</option>
            </select>
          </label>
          <label className="field">
            <span>Target</span>
            <input type="number" min="0" step="0.01" value={form.targetAmount} onChange={(event) => setForm((current) => ({ ...current, targetAmount: event.target.value }))} placeholder="100" />
          </label>
          <label className="field">
            <span>Soglie</span>
            <input type="text" value={form.notifyThresholds} onChange={(event) => setForm((current) => ({ ...current, notifyThresholds: event.target.value }))} placeholder="50,80,100" />
          </label>
          <button className="primary-btn" type="submit">Salva obiettivo</button>
        </form>

        <section className="section-card">
          <header className="section-card__header">
            <h2>Elenco obiettivi</h2>
            <span>{appData.goals.length}</span>
          </header>
          <div className="stack-list">
            {appData.goals.map((goal) => {
              const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
              return (
                <div className="goal-card" key={goal.id}>
                  <div className="goal-row__top">
                    <strong>{goal.name}</strong>
                    <span>{money.format(goal.currentAmount)} / {money.format(goal.targetAmount)}</span>
                  </div>
                  <div className="progress-bar">
                    <span className="progress-bar__fill progress-bar__fill--positive" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="goal-card__footer">
                    <small>{goal.period}</small>
                    <button className="ghost-btn thin" type="button" onClick={() => removeGoal(goal.id)}>Elimina</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
