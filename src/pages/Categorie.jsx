import React, { useMemo, useState } from "react";
import { Archive, ArrowDown, ArrowUp, Palette, Pencil, Plus, Trash2 } from "lucide-react";

const colorPalette = ["#5dcaa5", "#69b9ff", "#f3b35f", "#ff8f70", "#a07cff", "#ff6fa8", "#8ddf72", "#7bb2ff"];

function reorderCategoryList(list, startIndex, endIndex) {
  const next = [...list];
  const [moved] = next.splice(startIndex, 1);
  next.splice(endIndex, 0, moved);

  return next.map((item, index) => ({ ...item, order: index + 1 }));
}

export default function Categorie({ appData, setAppData }) {
  const [form, setForm] = useState({ type: "uscita", name: "", icon: "🛒", color: colorPalette[0] });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("Le categorie predefinite sono già pronte e possono essere personalizzate.");

  const sortedCategories = useMemo(() => {
    return [...appData.categories].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  }, [appData.categories]);

  const incomeCategories = sortedCategories.filter((category) => category.type === "entrata");
  const expenseCategories = sortedCategories.filter((category) => category.type === "uscita");
  const archivedCategories = sortedCategories.filter((category) => category.archived);

  const livePreview = {
    type: form.type,
    name: form.name.trim() || "Nuova categoria",
    icon: form.icon || "🧩",
    color: form.color || colorPalette[0],
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ type: "uscita", name: "", icon: "🛒", color: colorPalette[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    if (!trimmedName) {
      setMessage("Inserisci un nome per la categoria prima di salvare.");
      return;
    }

    const nextId = editingId || `${form.type}-${crypto.randomUUID?.() ?? Date.now()}`;
    const typeList = appData.categories.filter((category) => category.type === form.type);

    if (editingId) {
      setAppData((current) => ({
        ...current,
        categories: current.categories.map((category) =>
          category.id === editingId ? { ...category, name: trimmedName, icon: form.icon, color: form.color, type: form.type } : category,
        ),
      }));
      setMessage(`Categoria “${trimmedName}” aggiornata.`);
    } else {
      const newCategory = {
        id: nextId,
        type: form.type,
        name: trimmedName,
        icon: form.icon,
        color: form.color,
        order: typeList.length + 1,
        archived: false,
        isDefault: false,
      };

      setAppData((current) => ({ ...current, categories: [...current.categories, newCategory] }));
      setMessage(`Categoria “${trimmedName}” creata.`);
    }

    resetForm();
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setForm({
      type: category.type,
      name: category.name,
      icon: category.icon,
      color: category.color,
    });
    setMessage(`Stai modificando “${category.name}”.`);
  };

  const toggleArchive = (categoryId) => {
    const selected = appData.categories.find((category) => category.id === categoryId);
    if (!selected) return;

    setAppData((current) => ({
      ...current,
      categories: current.categories.map((category) => (category.id === categoryId ? { ...category, archived: !category.archived } : category)),
    }));
    setMessage(selected.archived ? `Categoria “${selected.name}” riattivata.` : `Categoria “${selected.name}” archiviata.`);
  };

  const removeCategory = (categoryId) => {
    const selected = appData.categories.find((category) => category.id === categoryId);
    if (!selected) return;

    setAppData((current) => ({
      ...current,
      categories: current.categories.filter((category) => category.id !== categoryId),
    }));
    setMessage(`Categoria “${selected.name}” eliminata.`);

    if (editingId === categoryId) {
      resetForm();
    }
  };

  const moveCategory = (categoryId, direction) => {
    const selected = appData.categories.find((category) => category.id === categoryId);
    if (!selected) return;

    const sameType = appData.categories.filter((category) => category.type === selected.type);
    const currentIndex = sameType.findIndex((category) => category.id === categoryId);
    const targetIndex = currentIndex + direction;

    if (targetIndex < 0 || targetIndex >= sameType.length) return;

    const reordered = reorderCategoryList(sameType, currentIndex, targetIndex);
    setAppData((current) => {
      const next = [...current.categories];
      reordered.forEach((category) => {
        const index = next.findIndex((item) => item.id === category.id);
        if (index >= 0) next[index] = { ...next[index], order: category.order };
      });
      return { ...current, categories: next };
    });
  };

  const renderList = (items) => {
    if (items.length === 0) {
      return <p className="empty-list">Nessuna categoria presente in questo gruppo.</p>;
    }

    return items.map((category) => (
      <div className="category-card" key={category.id}>
        <div className="category-card__preview" style={{ background: `${category.color}18`, color: category.color }}>
          <span className="category-card__icon" aria-hidden="true">{category.icon}</span>
          <span>{category.name}</span>
        </div>

        <div className="category-card__actions">
          <button className="icon-btn tiny" type="button" onClick={() => moveCategory(category.id, -1)} aria-label={`Sposta su ${category.name}`}>
            <ArrowUp size={14} />
          </button>
          <button className="icon-btn tiny" type="button" onClick={() => moveCategory(category.id, 1)} aria-label={`Sposta giù ${category.name}`}>
            <ArrowDown size={14} />
          </button>
          <button className="icon-btn tiny" type="button" onClick={() => startEditing(category)} aria-label={`Modifica ${category.name}`}>
            <Pencil size={14} />
          </button>
          <button className="icon-btn tiny" type="button" onClick={() => toggleArchive(category.id)} aria-label={category.archived ? `Riattiva ${category.name}` : `Archivia ${category.name}`}>
            <Archive size={14} />
          </button>
          <button className="icon-btn tiny danger" type="button" onClick={() => removeCategory(category.id)} aria-label={`Elimina ${category.name}`}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="categories-page">
      <div className="categories-page__header">
        <div>
          <span className="page-empty__num">05</span>
          <h1 className="page-empty__title">Gestisci categorie</h1>
          <p className="page-empty__hint">
            Personalizza entrate e uscite con nome, emoji, colore e ordine. La pagina segue la logica del README per mantenere categorie sempre coerenti.
          </p>
        </div>
        <div className="stats-chip">
          <strong>{sortedCategories.length}</strong>
          <span>categorie</span>
        </div>
      </div>

      <div className="categories-layout">
        <form className="category-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <div>
              <span className="label-pill">{editingId ? "Modifica" : "Aggiungi"}</span>
              <h2>{editingId ? "Modifica categoria" : "Nuova categoria"}</h2>
            </div>
            <button type="button" className="ghost-btn" onClick={resetForm}>Annulla</button>
          </div>

          <label className="field">
            <span>Tipo</span>
            <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}>
              <option value="entrata">Entrata</option>
              <option value="uscita">Uscita</option>
            </select>
          </label>

          <label className="field">
            <span>Nome</span>
            <input type="text" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Es. Trasporto" />
          </label>

          <label className="field">
            <span>Icona</span>
            <input type="text" value={form.icon} onChange={(event) => setForm((current) => ({ ...current, icon: event.target.value }))} placeholder="🛒" maxLength={3} />
          </label>

          <label className="field">
            <span>Colore</span>
            <div className="color-row">
              {colorPalette.map((color) => (
                <button key={color} type="button" className={`swatch ${form.color === color ? "is-selected" : ""}`} style={{ background: color }} onClick={() => setForm((current) => ({ ...current, color }))} aria-label={`Seleziona colore ${color}`} />
              ))}
              <input type="color" value={form.color} onChange={(event) => setForm((current) => ({ ...current, color: event.target.value }))} aria-label="Seleziona un colore personalizzato" />
            </div>
          </label>

          <div className="preview-box">
            <span className="label-pill">Anteprima live</span>
            <div className="preview-badge" style={{ background: `${livePreview.color}18`, color: livePreview.color }}>
              <span aria-hidden="true">{livePreview.icon}</span>
              <span>{livePreview.name}</span>
            </div>
          </div>

          <button className="primary-btn" type="submit">
            <Plus size={16} /> {editingId ? "Salva modifiche" : "Aggiungi categoria"}
          </button>
        </form>

        <div className="categories-columns">
          <section className="section-card">
            <header className="section-card__header">
              <h2>Entrate</h2>
              <span>{incomeCategories.length}</span>
            </header>
            {renderList(incomeCategories)}
          </section>

          <section className="section-card">
            <header className="section-card__header">
              <h2>Uscite</h2>
              <span>{expenseCategories.length}</span>
            </header>
            {renderList(expenseCategories)}
          </section>
        </div>
      </div>

      <section className="section-card section-card--compact">
        <header className="section-card__header">
          <h2>Categorie archiviate</h2>
          <span>{archivedCategories.length}</span>
        </header>
        {archivedCategories.length === 0 ? <p className="empty-list">Nessuna categoria archiviata.</p> : renderList(archivedCategories)}
      </section>

      <div className="note-banner" aria-live="polite">
        <Palette size={16} />
        <span>{message}</span>
      </div>
    </section>
  );
}
