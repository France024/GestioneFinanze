const STORAGE_KEY = "gestione-finanze-data-v1";

const defaultCategories = [
  { id: "inc-salary", type: "entrata", name: "Stipendio", icon: "💼", color: "#5dcaa5", order: 1, archived: false, isDefault: true },
  { id: "inc-other", type: "entrata", name: "Arbitri", icon: "📈", color: "#69b9ff", order: 2, archived: false, isDefault: true },
  { id: "inc-extra", type: "entrata", name: "Altro", icon: "🎁", color: "#f3b35f", order: 3, archived: false, isDefault: true },
  { id: "out-car", type: "uscita", name: "Benzina", icon: "🚗", color: "#ff8f70", order: 1, archived: false, isDefault: true },
  { id: "out-friends", type: "uscita", name: "Uscite amici", icon: "🥂", color: "#a07cff", order: 2, archived: false, isDefault: true },
  { id: "out-giulia", type: "uscita", name: "Uscite Giulia", icon: "💄", color: "#ff6fa8", order: 3, archived: false, isDefault: true },
  { id: "out-auto", type: "uscita", name: "Auto", icon: "🛠️", color: "#7bb2ff", order: 4, archived: false, isDefault: true },
  { id: "out-food", type: "uscita", name: "Spesa", icon: "🛒", color: "#8ddf72", order: 5, archived: false, isDefault: true },
  { id: "out-other", type: "uscita", name: "Altro", icon: "📦", color: "#d5b35f", order: 6, archived: false, isDefault: true },
];

const defaultTransactions = [
  { id: "tx-1", type: "entrata", amount: 2000, category: "Stipendio", categoryId: "inc-salary", icon: "💼", color: "#5dcaa5", date: "2026-07-03", description: "Stipendio mensile", wallet: "Portafoglio Principale", recurringRuleId: null },
  { id: "tx-2", type: "uscita", amount: 75, category: "Benzina", categoryId: "out-car", icon: "🚗", color: "#ff8f70", date: "2026-07-04", description: "Rifornimento", wallet: "Portafoglio Principale", recurringRuleId: null },
  { id: "tx-3", type: "uscita", amount: 120, category: "Spesa", categoryId: "out-food", icon: "🛒", color: "#8ddf72", date: "2026-07-05", description: "Spesa settimana", wallet: "Portafoglio Principale", recurringRuleId: null },
  { id: "tx-4", type: "entrata", amount: 260, category: "Arbitri", categoryId: "inc-other", icon: "📈", color: "#69b9ff", date: "2026-07-06", description: "Vendita extra", wallet: "Portafoglio Principale", recurringRuleId: null },
  { id: "tx-5", type: "uscita", amount: 78, category: "Uscite amici", categoryId: "out-friends", icon: "🥂", color: "#a07cff", date: "2026-07-08", description: "Cena con amici", wallet: "Portafoglio Principale", recurringRuleId: null },
  { id: "tx-6", type: "uscita", amount: 60, category: "Auto", categoryId: "out-auto", icon: "🛠️", color: "#7bb2ff", date: "2026-07-10", description: "Manutenzione auto", wallet: "Portafoglio Principale", recurringRuleId: null },
];

const defaultGoals = [
  { id: "goal-1", name: "Budget Benzina", type: "uscita", categoryId: "out-car", categoryName: "Benzina", period: "mensile", targetAmount: 120, currentAmount: 75, notifyThresholds: [50, 80, 100], notifiedThresholds: [50], recurring: true },
  { id: "goal-2", name: "Risparmio mensile", type: "saldo", period: "mensile", targetAmount: 800, currentAmount: 650, notifyThresholds: [50, 80, 100], notifiedThresholds: [80], recurring: true },
];

const defaultRules = [
  { id: "rule-1", type: "entrata", categoryId: "inc-salary", categoryName: "Stipendio", amount: 2000, description: "Stipendio mensile", frequency: "mensile", executionDay: 3, startDate: "2026-07-03", endDate: null, active: true },
  { id: "rule-2", type: "uscita", categoryId: "out-food", categoryName: "Spesa", amount: 90, description: "Spesa settimanale", frequency: "settimanale", executionDay: 5, startDate: "2026-07-05", endDate: null, active: true },
];

const defaultWallets = [
  { id: "wallet-1", name: "Portafoglio Principale", currency: "EUR", icon: "💳", color: "#5dcaa5", initialBalance: 500, isDefault: true },
  { id: "wallet-2", name: "Conto Risparmi", currency: "EUR", icon: "🏦", color: "#69b9ff", initialBalance: 1200, isDefault: false },
];

const defaultSettings = {
  theme: "scuro",
  currency: "EUR",
  dateFormat: "dd/mm/yyyy",
  notificationsEnabled: false,
  textSize: "normale",
  highContrast: false,
  reduceAnimations: false,
};

export const DEFAULT_APP_DATA = {
  categories: defaultCategories,
  transactions: defaultTransactions,
  goals: defaultGoals,
  recurringRules: defaultRules,
  wallets: defaultWallets,
  settings: defaultSettings,
};

export function loadAppData() {
  if (typeof window === "undefined") return DEFAULT_APP_DATA;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_APP_DATA;

  try {
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_APP_DATA,
      ...parsed,
      categories: parsed.categories?.length ? parsed.categories : DEFAULT_APP_DATA.categories,
      transactions: parsed.transactions?.length ? parsed.transactions : DEFAULT_APP_DATA.transactions,
      goals: parsed.goals?.length ? parsed.goals : DEFAULT_APP_DATA.goals,
      recurringRules: parsed.recurringRules?.length ? parsed.recurringRules : DEFAULT_APP_DATA.recurringRules,
      wallets: parsed.wallets?.length ? parsed.wallets : DEFAULT_APP_DATA.wallets,
      settings: { ...DEFAULT_APP_DATA.settings, ...(parsed.settings || {}) },
    };
  } catch {
    return DEFAULT_APP_DATA;
  }
}

export function saveAppData(data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
