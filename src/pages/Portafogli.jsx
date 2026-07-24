import React, { useMemo, useState } from "react";

const money = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

export default function Portafogli({ appData, setAppData }) {
  const [form, setForm] = useState({ name: "", currency: "EUR", icon: "💳", color: "#5dcaa5", initialBalance: "0" });

  const totals = useMemo(() => {
    return appData.wallets.reduce((sum, wallet) => sum + Number(wallet.initialBalance || 0), 0);
  }, [appData.wallets]);

  const addWallet = (event) => {
    event.preventDefault();
    if (!form.name) return;

    const wallet = {
      id: `wallet-${Date.now()}`,
      name: form.name,
      currency: form.currency,
      icon: form.icon,
      color: form.color,
      initialBalance: Number(form.initialBalance),
      isDefault: false,
    };

    setAppData((current) => ({ ...current, wallets: [...current.wallets, wallet] }));
    setForm({ name: "", currency: "EUR", icon: "💳", color: "#5dcaa5", initialBalance: "0" });
  };

  return (
    <section className="page-stack">
      <div className="page-stack__header">
        <div>
          <span className="page-empty__num">07</span>
          <h1 className="page-empty__title">Portafogli</h1>
          <p className="page-empty__hint">Gestisci conti multi-valuta, saldo iniziale e vista aggregata locale con tassi manuali.</p>
        </div>
      </div>

      <div className="categories-layout">
        <form className="category-form" onSubmit={addWallet}>
          <div className="form-header">
            <div>
              <span className="label-pill">Nuovo</span>
              <h2>Portafoglio</h2>
            </div>
          </div>
          <label className="field">
            <span>Nome</span>
            <input type="text" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Es. Conto principale" />
          </label>
          <label className="field">
            <span>Valuta</span>
            <select value={form.currency} onChange={(event) => setForm((current) => ({ ...current, currency: event.target.value }))}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </label>
          <label className="field">
            <span>Saldo iniziale</span>
            <input type="number" min="0" step="0.01" value={form.initialBalance} onChange={(event) => setForm((current) => ({ ...current, initialBalance: event.target.value }))} />
          </label>
          <button className="primary-btn" type="submit">Aggiungi portafoglio</button>
        </form>

        <section className="section-card">
          <header className="section-card__header">
            <h2>Elenco portafogli</h2>
            <span>{money.format(totals)}</span>
          </header>
          <div className="stack-list">
            {appData.wallets.map((wallet) => (
              <div className="goal-card" key={wallet.id}>
                <div className="goal-row__top">
                  <strong>{wallet.name}</strong>
                  <span>{wallet.currency}</span>
                </div>
                <p className="empty-list">Saldo: {money.format(wallet.initialBalance)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
