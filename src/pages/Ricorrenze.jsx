import React, { useMemo, useState } from "react";

export default function Ricorrenze({ appData, setAppData }) {
  const [form, setForm] = useState({
    type: "uscita",
    categoryId: appData.categories.find((category) => category.type === "uscita")?.id || "",
    amount: "",
    description: "",
    frequency: "mensile",
    executionDay: 1,
    startDate: new Date().toISOString().slice(0, 10),
  });

  const activeRules = useMemo(() => appData.recurringRules.filter((rule) => rule.active), [appData.recurringRules]);

  const submitRule = (event) => {
    event.preventDefault();
    if (!form.amount || !form.categoryId) return;

    const category = appData.categories.find((item) => item.id === form.categoryId);
    const rule = {
      id: `rule-${Date.now()}`,
      type: form.type,
      categoryId: form.categoryId,
      categoryName: category?.name || "Generica",
      amount: Number(form.amount),
      description: form.description || "Regola ricorrente",
      frequency: form.frequency,
      executionDay: Number(form.executionDay),
      startDate: form.startDate,
      endDate: null,
      active: true,
    };

    setAppData((current) => ({ ...current, recurringRules: [rule, ...current.recurringRules] }));
    setForm({
      type: "uscita",
      categoryId: appData.categories.find((category) => category.type === "uscita")?.id || "",
      amount: "",
      description: "",
      frequency: "mensile",
      executionDay: 1,
      startDate: new Date().toISOString().slice(0, 10),
    });
  };

  const toggleRule = (ruleId) => {
    setAppData((current) => ({
      ...current,
      recurringRules: current.recurringRules.map((rule) => (rule.id === ruleId ? { ...rule, active: !rule.active } : rule)),
    }));
  };

  return (
    <section className="page-stack">
      <div className="page-stack__header">
        <div>
          <span className="page-empty__num">06</span>
          <h1 className="page-empty__title">Ricorrenze</h1>
          <p className="page-empty__hint">Crea regole automatiche per movimenti fissi e gestisci il loro stato attivo o in pausa.</p>
        </div>
      </div>

      <div className="categories-layout">
        <form className="category-form" onSubmit={submitRule}>
          <div className="form-header">
            <div>
              <span className="label-pill">Nuova</span>
              <h2>Regola ricorrente</h2>
            </div>
          </div>
          <label className="field">
            <span>Tipo</span>
            <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value, categoryId: appData.categories.find((category) => category.type === event.target.value)?.id || "" }))}>
              <option value="entrata">Entrata</option>
              <option value="uscita">Uscita</option>
            </select>
          </label>
          <label className="field">
            <span>Categoria</span>
            <select value={form.categoryId} onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))}>
              {appData.categories.filter((category) => category.type === form.type && !category.archived).map((category) => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Importo</span>
            <input type="number" min="0" step="0.01" value={form.amount} onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))} />
          </label>
          <label className="field">
            <span>Descrizione</span>
            <input type="text" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          </label>
          <label className="field">
            <span>Frequenza</span>
            <select value={form.frequency} onChange={(event) => setForm((current) => ({ ...current, frequency: event.target.value }))}>
              <option value="settimanale">Settimanale</option>
              <option value="mensile">Mensile</option>
              <option value="annuale">Annuale</option>
            </select>
          </label>
          <label className="field">
            <span>Giorno di esecuzione</span>
            <input type="number" min="1" max="31" value={form.executionDay} onChange={(event) => setForm((current) => ({ ...current, executionDay: event.target.value }))} />
          </label>
          <label className="field">
            <span>Data di inizio</span>
            <input type="date" value={form.startDate} onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))} />
          </label>
          <button className="primary-btn" type="submit">Salva regola</button>
        </form>

        <section className="section-card">
          <header className="section-card__header">
            <h2>Regole attive</h2>
            <span>{activeRules.length}</span>
          </header>
          <div className="stack-list">
            {activeRules.map((rule) => (
              <div className="goal-card" key={rule.id}>
                <div className="goal-row__top">
                  <strong>{rule.categoryName}</strong>
                  <span>{rule.frequency}</span>
                </div>
                <p className="empty-list">{rule.description}</p>
                <div className="goal-card__footer">
                  <small>{rule.startDate}</small>
                  <button className="ghost-btn thin" type="button" onClick={() => toggleRule(rule.id)}>Metti in pausa</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
