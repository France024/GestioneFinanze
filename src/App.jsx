import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Wallet, Menu, X, PlusCircle, MoonStar, SunMedium } from "lucide-react";

import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Movimenti from "./pages/Movimenti.jsx";
import Resoconto from "./pages/Resoconto.jsx";
import Obiettivi from "./pages/Obiettivi.jsx";
import Categorie from "./pages/Categorie.jsx";
import Ricorrenze from "./pages/Ricorrenze.jsx";
import Portafogli from "./pages/Portafogli.jsx";
import Impostazioni from "./pages/Impostazioni.jsx";

import { loadAppData, saveAppData } from "./data/appData.js";
import "./styles/app.css";

const today = new Date().toISOString().slice(0, 10);

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [appData, setAppData] = useState(loadAppData);
  const [quickForm, setQuickForm] = useState({
    type: "uscita",
    categoryId: appData.categories.find((category) => category.type === "uscita")?.id || "",
    amount: "",
    walletId: appData.wallets[0]?.id || "",
    date: today,
    description: "",
  });

  useEffect(() => {
    saveAppData(appData);
  }, [appData]);

  useEffect(() => {
    const requestedTheme = appData.settings.theme === "automatico"
      ? (window.matchMedia("(prefers-color-scheme: light)").matches ? "chiaro" : "scuro")
      : appData.settings.theme;

    document.documentElement.dataset.theme = requestedTheme === "chiaro" ? "light" : "dark";
  }, [appData.settings.theme]);

  useEffect(() => {
    setQuickForm((current) => ({
      ...current,
      categoryId: appData.categories.find((category) => category.type === current.type)?.id || "",
      walletId: appData.wallets[0]?.id || "",
    }));
  }, [appData.categories, appData.wallets]);

  const walletLabel = useMemo(() => appData.wallets.find((wallet) => wallet.id === quickForm.walletId)?.name || "Portafoglio", [appData.wallets, quickForm.walletId]);
  const isLightTheme = appData.settings.theme === "chiaro";

  const toggleTheme = () => {
    const nextTheme = isLightTheme ? "scuro" : "chiaro";
    setAppData((current) => ({
      ...current,
      settings: {
        ...current.settings,
        theme: nextTheme,
      },
    }));
  };

  const submitQuickTransaction = (event) => {
    event.preventDefault();
    if (!quickForm.amount || !quickForm.categoryId) return;

    const category = appData.categories.find((item) => item.id === quickForm.categoryId);
    const transaction = {
      id: `tx-${Date.now()}`,
      type: quickForm.type,
      amount: Number(quickForm.amount),
      category: category?.name || "Generica",
      categoryId: quickForm.categoryId,
      icon: category?.icon || "🧩",
      color: category?.color || "#5dcaa5",
      date: quickForm.date,
      description: quickForm.description || "Transazione rapida",
      wallet: walletLabel,
      recurringRuleId: null,
    };

    setAppData((current) => ({
      ...current,
      transactions: [transaction, ...current.transactions],
    }));

    setQuickForm({
      type: "uscita",
      categoryId: appData.categories.find((category) => category.type === "uscita")?.id || "",
      amount: "",
      walletId: appData.wallets[0]?.id || "",
      date: today,
      description: "",
    });
    setFabOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Sidebar />
        <div className="sidebar-actions">
          <button className="icon-btn" type="button" onClick={toggleTheme} aria-label={isLightTheme ? "Passa a tema scuro" : "Passa a tema chiaro"}>
            {isLightTheme ? <MoonStar size={18} /> : <SunMedium size={18} />}
          </button>
        </div>
        <div className="sidebar-footer">Versione 0.1 · struttura iniziale</div>
      </aside>

      <div className={`mobile-drawer ${mobileOpen ? "is-open" : ""}`}>
        <div className="mobile-drawer__header">
          <div className="brand" style={{ marginBottom: 0 }}>
            <div className="brand__icon">
              <Wallet size={17} strokeWidth={2} />
            </div>
            <div className="brand__text">
              <span className="brand__title">Gestione Finanze</span>
            </div>
          </div>
          <button className="icon-btn" onClick={() => setMobileOpen(false)} aria-label="Chiudi menu">
            <X size={18} />
          </button>
        </div>
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </div>

      <div className="main">
        <div className="topbar">
          <div className="topbar__brand">
            <Wallet size={17} />
            Gestione Finanze
          </div>

          <div className="topbar__actions">
            <button className="icon-btn" type="button" onClick={toggleTheme} aria-label={isLightTheme ? "Passa a tema scuro" : "Passa a tema chiaro"}>
              {isLightTheme ? <MoonStar size={18} /> : <SunMedium size={18} />}
            </button>
            <button className="icon-btn" onClick={() => setMobileOpen(true)} aria-label="Apri menu">
              <Menu size={18} />
            </button>
          </div>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home appData={appData} />} />
            <Route path="/movimenti" element={<Movimenti appData={appData} setAppData={setAppData} />} />
            <Route path="/resoconto" element={<Resoconto appData={appData} />} />
            <Route path="/obiettivi" element={<Obiettivi appData={appData} setAppData={setAppData} />} />
            <Route path="/categorie" element={<Categorie appData={appData} setAppData={setAppData} />} />
            <Route path="/ricorrenze" element={<Ricorrenze appData={appData} setAppData={setAppData} />} />
            <Route path="/portafogli" element={<Portafogli appData={appData} setAppData={setAppData} />} />
            <Route path="/impostazioni" element={<Impostazioni appData={appData} setAppData={setAppData} />} />
          </Routes>
        </div>
      </div>

      <button className="fab-button" onClick={() => setFabOpen(true)} aria-label="Aggiungi transazione">
        <PlusCircle size={18} />
        <span>Nuova transazione</span>
      </button>

      {fabOpen && (
        <div className="modal-overlay" onClick={() => setFabOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-card__header">
              <h3>Nuova transazione</h3>
              <button className="icon-btn" type="button" onClick={() => setFabOpen(false)} aria-label="Chiudi modulo">
                <X size={16} />
              </button>
            </div>
            <form className="quick-form" onSubmit={submitQuickTransaction}>
              <label className="field">
                <span>Tipo</span>
                <select value={quickForm.type} onChange={(event) => setQuickForm((current) => ({ ...current, type: event.target.value, categoryId: appData.categories.find((category) => category.type === event.target.value)?.id || "" }))}>
                  <option value="entrata">Entrata</option>
                  <option value="uscita">Uscita</option>
                </select>
              </label>

              <label className="field">
                <span>Categoria</span>
                <select value={quickForm.categoryId} onChange={(event) => setQuickForm((current) => ({ ...current, categoryId: event.target.value }))}>
                  {appData.categories.filter((category) => category.type === quickForm.type && !category.archived).map((category) => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Importo</span>
                <input type="number" min="0" step="0.01" value={quickForm.amount} onChange={(event) => setQuickForm((current) => ({ ...current, amount: event.target.value }))} placeholder="0.00" />
              </label>

              <label className="field">
                <span>Data</span>
                <input type="date" value={quickForm.date} onChange={(event) => setQuickForm((current) => ({ ...current, date: event.target.value }))} />
              </label>

              <label className="field">
                <span>Descrizione</span>
                <input type="text" value={quickForm.description} onChange={(event) => setQuickForm((current) => ({ ...current, description: event.target.value }))} placeholder="Es. Ristorante" />
              </label>

              <div className="modal-actions">
                <button className="ghost-btn" type="button" onClick={() => setFabOpen(false)}>Annulla</button>
                <button className="primary-btn" type="submit">Salva</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
