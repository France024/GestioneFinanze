import React, { useRef, useState } from "react";
import { saveAppData } from "../data/appData.js";

export default function Impostazioni({ appData, setAppData }) {
  const [settings, setSettings] = useState(appData.settings);
  const fileInputRef = useRef(null);

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(appData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `backup_finanze_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setAppData((current) => ({ ...current, ...parsed }));
        saveAppData({ ...appData, ...parsed });
      } catch {
        window.alert("File di backup non valido.");
      }
    };
    reader.readAsText(file);
  };

  const resetData = () => {
    if (window.confirm("Vuoi cancellare tutti i dati locali?")) {
      setAppData({ categories: [], transactions: [], goals: [], recurringRules: [], wallets: [], settings: appData.settings });
      window.localStorage.removeItem("gestione-finanze-data-v1");
    }
  };

  const updateSettings = (key, value) => {
    const nextSettings = { ...settings, [key]: value };
    setSettings(nextSettings);
    setAppData((current) => ({ ...current, settings: nextSettings }));
  };

  return (
    <section className="page-stack">
      <div className="page-stack__header">
        <div>
          <span className="page-empty__num">08</span>
          <h1 className="page-empty__title">Impostazioni</h1>
          <p className="page-empty__hint">Tema, valuta, notifiche, accessibilità e backup sono controllati in locale senza dipendenze esterne.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="section-card">
          <header className="section-card__header"><h2>Preferenze</h2><span>locale</span></header>
          <div className="stack-list">
            <label className="field compact">
              <span>Tema</span>
              <select value={settings.theme} onChange={(event) => updateSettings("theme", event.target.value)}>
                <option value="scuro">Scuro</option>
                <option value="chiaro">Chiaro</option>
                <option value="automatico">Automatico</option>
              </select>
            </label>
            <label className="field compact">
              <span>Valuta</span>
              <select value={settings.currency} onChange={(event) => updateSettings("currency", event.target.value)}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </label>
            <label className="field compact">
              <span>Dimensione testo</span>
              <select value={settings.textSize} onChange={(event) => updateSettings("textSize", event.target.value)}>
                <option value="normale">Normale</option>
                <option value="grande">Grande</option>
                <option value="molto-grande">Molto grande</option>
              </select>
            </label>
            <label className="field compact checkbox-row">
              <input type="checkbox" checked={settings.notificationsEnabled} onChange={(event) => updateSettings("notificationsEnabled", event.target.checked)} />
              <span>Notifiche oggetti</span>
            </label>
          </div>
        </section>

        <section className="section-card">
          <header className="section-card__header"><h2>Backup</h2><span>file</span></header>
          <div className="stack-list">
            <button className="primary-btn" type="button" onClick={exportBackup}>Esporta backup</button>
            <button className="ghost-btn" type="button" onClick={() => fileInputRef.current?.click()}>Importa backup</button>
            <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={importBackup} />
            <button className="ghost-btn danger-btn" type="button" onClick={resetData}>Reset dati</button>
          </div>
        </section>
      </div>
    </section>
  );
}
