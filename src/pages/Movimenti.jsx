import React, { useMemo, useState } from "react";

const money = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

export default function Movimenti({ appData, setAppData }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("tutte");
  const [sortBy, setSortBy] = useState("data");

  const filteredTransactions = useMemo(() => {
    const filtered = appData.transactions.filter((transaction) => {
      const matchesType = typeFilter === "tutte" || transaction.type === typeFilter;
      const matchesSearch = transaction.description.toLowerCase().includes(search.toLowerCase()) || transaction.category.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "importo") return b.amount - a.amount;
      return new Date(b.date) - new Date(a.date);
    });
  }, [appData.transactions, search, sortBy, typeFilter]);

  const removeTransaction = (transactionId) => {
    setAppData((current) => ({
      ...current,
      transactions: current.transactions.filter((transaction) => transaction.id !== transactionId),
    }));
  };

  return (
    <section className="page-stack">
      <div className="page-stack__header">
        <div>
          <span className="page-empty__num">02</span>
          <h1 className="page-empty__title">Transazioni</h1>
          <p className="page-empty__hint">Consulta, cerca, ordina ed elimina ogni movimento registrato in modo semplice e leggibile.</p>
        </div>
      </div>

      <section className="filter-bar">
        <label className="field compact">
          <span>Ricerca</span>
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Descrizione o categoria" />
        </label>
        <label className="field compact">
          <span>Tipo</span>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="tutte">Tutte</option>
            <option value="entrata">Entrate</option>
            <option value="uscita">Uscite</option>
          </select>
        </label>
        <label className="field compact">
          <span>Ordina per</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="data">Data</option>
            <option value="importo">Importo</option>
          </select>
        </label>
      </section>

      <section className="section-card">
        <div className="stack-list">
          {filteredTransactions.map((transaction) => (
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
                <button className="ghost-btn thin" type="button" onClick={() => removeTransaction(transaction.id)}>Elimina</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
