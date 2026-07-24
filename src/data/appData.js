const STORAGE_KEY = "gestione-finanze-data-v1";
const STORAGE_VERSION = 2;

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
  transactions: [],
  goals: [],
  recurringRules: [],
  wallets: [],
  settings: defaultSettings,
};

export function loadAppData() {
  if (typeof window === "undefined") return DEFAULT_APP_DATA;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_APP_DATA;

  try {
    const parsed = JSON.parse(raw);
    const payload = parsed?.data ?? parsed;

    if (parsed?.version === STORAGE_VERSION && payload && typeof payload === "object") {
      return {
        ...DEFAULT_APP_DATA,
        ...payload,
        categories: Array.isArray(payload.categories) && payload.categories.length ? payload.categories : DEFAULT_APP_DATA.categories,
        transactions: Array.isArray(payload.transactions) ? payload.transactions : [],
        goals: Array.isArray(payload.goals) ? payload.goals : [],
        recurringRules: Array.isArray(payload.recurringRules) ? payload.recurringRules : [],
        wallets: Array.isArray(payload.wallets) ? payload.wallets : [],
        settings: { ...DEFAULT_APP_DATA.settings, ...(payload.settings || {}) },
      };
    }

    return DEFAULT_APP_DATA;
  } catch {
    return DEFAULT_APP_DATA;
  }
}

export function saveAppData(data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, data }));
}
