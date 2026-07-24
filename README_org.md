# 📱💻 GestioneFinanze — Documento di Specifiche Complete

**Versione:** 1.0 
**Tipo documento:** Specifica di prodotto + guida operativa allo sviluppo
**Piattaforma target:** Progressive Web App (PWA) — un'unica codebase, installabile su smartphone (iOS/Android) e computer (Windows/macOS/Linux), funzionamento 100% offline dopo la prima apertura

> Questo documento è pensato per essere sufficiente **da solo**: anche una persona senza esperienza pregressa di sviluppo, seguendo l'ordine delle sezioni e i comandi indicati nella Sezione 20 ("Guida pratica: dal foglio bianco al primo avvio"), deve poter costruire un progetto funzionante e coerente con quanto descritto.

> ⚠️ **Nota sulla scelta del linguaggio** Il committente ha scelto esplicitamente **JavaScript/React**, confermando l'architettura a Progressive Web App di questo documento. Per rispettare comunque lo spirito del requisito "file eseguibile utilizzabile su qualsiasi dispositivo", la Sezione 20.8 include anche le istruzioni per generare, in aggiunta alla PWA installabile, un **eseguibile desktop reale** (`.exe`/`.app`/AppImage) tramite Electron o Tauri, a partire dallo stesso codice sorgente.

---

## Indice

1. [Visione e panoramica del progetto](#1-visione-e-panoramica-del-progetto)
2. [Obiettivi di progetto e priorità](#2-obiettivi-di-progetto-e-priorità)
3. [Principi fondamentali e vincoli non negoziabili](#3-principi-fondamentali-e-vincoli-non-negoziabili)
4. [Architettura tecnica](#4-architettura-tecnica)
5. [Stack tecnologico consigliato](#5-stack-tecnologico-consigliato)
6. [Modello dati completo](#6-modello-dati-completo)
7. [Mappa delle pagine e navigazione](#7-mappa-delle-pagine-e-navigazione)
8. [Funzionalità dettagliate per pagina](#8-funzionalità-dettagliate-per-pagina)
9. [Pulsante "Nuova transazione" (FAB / azione rapida)](#9-pulsante-nuova-transazione-fab--azione-rapida)
10. [Sistema di categorie personalizzate](#10-sistema-di-categorie-personalizzate)
11. [Transazioni ricorrenti automatiche](#11-transazioni-ricorrenti-automatiche)
12. [Sistema di obiettivi (budget) e notifiche di soglia](#12-sistema-di-obiettivi-budget-e-notifiche-di-soglia)
13. [Backup, esportazione, importazione e reset dati](#13-backup-esportazione-importazione-e-reset-dati)
14. [Grafici: tipologie, regole e utilizzo](#14-grafici-tipologie-regole-e-utilizzo)
15. [Design System (UI)](#15-design-system-ui)
16. [Accessibilità (a11y)](#16-accessibilità-a11y)
17. [Gestione multi-valuta, portafogli e localizzazione](#17-gestione-multi-valuta-portafogli-e-localizzazione)
18. [Funzionamento offline e installazione](#18-funzionamento-offline-e-installazione)
19. [Stati vuoti, errori, conferme e feedback](#19-stati-vuoti-errori-conferme-e-feedback)
20. [Guida pratica: dal foglio bianco al primo avvio](#20-guida-pratica-dal-foglio-bianco-al-primo-avvio)
21. [Struttura tecnica dei file del progetto](#21-struttura-tecnica-dei-file-del-progetto)
22. [Requisiti non funzionali](#22-requisiti-non-funzionali)
23. [Roadmap di sviluppo consigliata](#23-roadmap-di-sviluppo-consigliata)
24. [Checklist finale dei requisiti](#24-checklist-finale-dei-requisiti)
25. [Funzionalità NON richieste — proposte in attesa di conferma](#25-funzionalità-non-richieste--proposte-in-attesa-di-conferma)
26. [Tracciabilità: istruzioni originali → sezioni del documento](#26-tracciabilità-istruzioni-originali--sezioni-del-documento)

---

## 1. Visione e panoramica del progetto

**GestioneFinanze** è un'applicazione personale per il monitoraggio di entrate e uscite, pensata per essere:

- **Completa**: gestione di entrate, uscite, categorie personalizzate, transazioni ricorrenti, obiettivi di budget, report visivi e backup dei dati.
- **Autonoma**: nessun account, nessun server, nessun servizio cloud esterno. Tutti i dati restano esclusivamente sul dispositivo dell'utente.
- **Universale**: stesso identico codice sorgente e stessa esperienza d'uso sia su smartphone (iOS/Android) sia su computer (Windows/macOS/Linux), installabile come app "nativa" tramite tecnologia PWA.
- **Immediata**: aggiungere una spesa o un'entrata deve richiedere pochi secondi, da qualunque schermata ci si trovi.
- **Curata e accessibile**: interfaccia moderna, fluida, leggibile, utilizzabile anche da persone con disabilità visive o motorie, con tema chiaro e scuro.
- **Sicura nei dati**: anche senza account né cloud, l'utente deve poter mettere al sicuro il proprio storico tramite un backup locale esportabile/importabile manualmente.

L'app deve permettere, come funzioni principali, di:
- Registrare **entrate** e **uscite**, ciascuna assegnata a una categoria.
- Personalizzare completamente le categorie (nome, icona/emoji, colore, ordine).
- Automatizzare i movimenti fissi e ripetitivi tramite **regole di ricorrenza**.
- Visualizzare **resoconti mensili/annuali** tramite liste e grafici (globali e per categoria).
- Impostare **obiettivi finanziari** (entrate, uscite, saldo — totali o per categoria), mensili, annuali o senza scadenza, monitorandone l'avanzamento in percentuale.
- **Esportare e importare** un backup completo dei dati in locale, oltre a un reset totale protetto.
- Offrire un'esperienza **accessibile (a11y)** e curata dal punto di vista UX/UI, con supporto a tema chiaro e scuro e a diverse dimensioni del testo.

---

## 2. Obiettivi di progetto e priorità

| # | Obiettivo | Priorità |
|---|-----------|----------|
| 1 | Tracciamento completo di entrate/uscite con categorie personalizzabili | Alta |
| 2 | Funzionamento 100% offline, zero dipendenze esterne a runtime | Alta |
| 3 | Un'unica codebase per PC e mobile (iOS/Android), layout adattivo | Alta |
| 4 | Report visivi (grafici) e testuali (liste) mensili/annuali | Alta |
| 5 | Sistema di obiettivi con avanzamento percentuale | Alta |
| 6 | Accessibilità (a11y) e design UX/UI curato, tema chiaro/scuro | Alta |
| 7 | Pulsante di aggiunta rapida raggiungibile da ogni schermata | Alta |
| 8 | Persistenza dati affidabile in locale (IndexedDB) | Alta |
| 9 | Transazioni ricorrenti automatiche (es. stipendio mensile) | Media |
| 10 | Backup/Export ed Import/Ripristino dati in locale | Media |
| 11 | Export dati in formato leggibile (JSON) per uso personale | Media |

---

## 3. Principi fondamentali e vincoli non negoziabili

Questi principi guidano **ogni** scelta tecnica e di design del progetto. In caso di dubbio durante lo sviluppo, questa sezione ha sempre la priorità.

| Principio | Significato pratico |
|---|---|
| **Offline-first** | L'app deve funzionare al 100% senza connessione internet, in ogni sua funzione, dopo la prima apertura/installazione. |
| **Zero dipendenze esterne a runtime** | Nessuna chiamata a siti web, API esterne, CDN esterni o database remoti durante l'uso. Tutte le librerie (framework, libreria grafici, font, icone) vanno scaricate/incluse nel progetto **in fase di build**, non caricate da internet mentre l'app gira. **Unica eccezione ammessa in tutto il progetto:** la *Notification API* nativa del browser, usata esclusivamente per gli avvisi di soglia sugli obiettivi (Sezione 12) — è un'API del dispositivo stesso, non un servizio remoto, e richiede comunque l'autorizzazione esplicita dell'utente. |
| **Dati locali** | I dati (transazioni, categorie, obiettivi, ricorrenze, impostazioni) sono salvati **esclusivamente sul dispositivo** tramite IndexedDB, tecnologia di storage nativa del browser. |
| **Privacy assoluta** | Nessun dato lascia mai il dispositivo in automatico. L'unica eccezione è l'export manuale esplicitamente richiesto dall'utente (backup). Nessun tracking, nessun analytics di terze parti, nessun account, nessun login. |
| **Un solo codice, due piattaforme** | Un'unica Web App installabile (PWA) che si adatta in modo responsive a schermi piccoli (telefono) e grandi (desktop), evitando due progetti separati da mantenere. |
| **Accessibilità nativa, non aggiunta dopo** | I criteri di accessibilità (contrasto, dimensioni, lettori di schermo, navigazione da tastiera) vanno rispettati fin dalla progettazione dei singoli componenti, non aggiunti a posteriori. |

> ℹ️ **Nota su "database esterno"**: IndexedDB **non** viola il vincolo "niente di esterno": non è un server remoto, ma uno storage integrato nel browser stesso, funzionante offline, privato per l'app e per il dispositivo. È l'equivalente moderno e strutturato di "salvare un file sul telefono", non un servizio cloud.

---

## 4. Architettura tecnica

### 4.1 Tipo di applicazione
**Progressive Web App (PWA)**: un'applicazione web che gira nel browser ma che può essere "installata" come se fosse un'app nativa — icona propria sulla Home Screen (iOS/Android) o come programma autonomo su desktop (Windows/macOS/Linux tramite Chrome/Edge), senza barra del browser visibile, avvio rapido.

### 4.2 Perché una PWA e non un'app nativa separata

| Approccio | Pro | Contro | Scelto? |
|---|---|---|---|
| **PWA** | Un'unica codebase, facile da mantenere, installabile ovunico, offline-first nativo, nessuno store obbligatorio | Alcune limitazioni minori su iOS per storage avanzato/notifiche push | ✅ **Sì — approccio scelto** |
| App nativa (Flutter / React Native) | Prestazioni native, accesso hardware completo | Doppio sforzo di build/pubblicazione, richiede store (Apple/Google), due configurazioni da mantenere | ❌ No |
| App desktop + app mobile separate (es. Electron + nativa) | Massima integrazione col sistema operativo | Due (o più) codebase distinte da mantenere nel tempo | ❌ No |

**Decisione di progetto:** si procede con la **PWA responsive**, unica codebase, installabile su tutte le piattaforme.

### 4.3 Come funziona l'offline: Service Worker

- Al **primo caricamento** (che richiede una connessione, esattamente come installare qualsiasi altra app), il Service Worker salva in cache **tutti** i file necessari al funzionamento: interfaccia (HTML/CSS/JS), font, icone.
- Da quel momento in poi l'app si apre e funziona **sempre**, con o senza connessione, perché non deve più scaricare nulla dalla rete.
- Strategia di cache consigliata: **Cache First** per tutti i file dell'app (disponibili istantaneamente), nessuna chiamata di rete prevista durante l'uso normale.
- Quando viene pubblicato un aggiornamento dell'app, il Service Worker scarica la nuova versione in background alla prossima connessione disponibile e la rende attiva al riavvio successivo, senza mai interrompere l'uso offline nel frattempo.

### 4.4 Web App Manifest

File di configurazione (`manifest.json`) che permette a smartphone e computer di "installare" l'app: nome (GestioneFinanze), nome breve, icone in più risoluzioni, colore del tema, colore di sfondo, modalità di visualizzazione a schermo intero (`display: standalone`, senza barra del browser), orientamento preferito, lingua.

### 4.5 Persistenza dati

- Motore di storage: **IndexedDB**, adatto a grandi quantità di transazioni, con capacità di interrogazione (query) e persistenza robusta anche con migliaia di record.
- Nessun dato lascia mai il dispositivo automaticamente.
- Le **impostazioni semplici** (tema, valuta, ecc.) possono opzionalmente essere salvate anche in `localStorage` per un accesso ultra-rapido all'avvio, mantenendo comunque IndexedDB come fonte dati principale.
- Vedi Sezione 13 per le funzioni di backup/export/import.

---

## 5. Stack tecnologico consigliato

| Livello | Tecnologia consigliata | Motivo |
|---|---|---|
| Interfaccia | **React** (con build tool **Vite**) — in alternativa Svelte, o HTML/CSS/JS vanilla se si vuole la massima leggerezza | Componenti riutilizzabili, stato reattivo, ecosistema maturo, ottima integrazione con i plugin PWA |
| Routing | React Router (o equivalente) | Navigazione tra le pagine descritte nella Sezione 7 |
| Grafici | **Chart.js** (o Recharts) **incluso nel bundle**, mai caricato da CDN a runtime | Coerenza offline totale, ampia varietà di grafici supportati |
| Storage locale | **IndexedDB**, tramite wrapper **Dexie.js** per semplificarne l'uso | Storage strutturato, veloce, capiente, nativo del browser; Dexie riduce drasticamente la complessità del codice rispetto all'API IndexedDB nativa |
| Offline / installabilità | **Service Worker** + **Web App Manifest**, generati tramite plugin `vite-plugin-pwa` | Cache dell'app, funzionamento offline, installazione su Home Screen/Desktop, gestito in automatico dal tool di build |
| Font e icone | Font self-hosted (inclusi nel progetto, non da Google Fonts online), icone SVG incluse localmente o set di emoji di sistema | Evita qualunque richiesta di rete a runtime |
| Identificatori univoci | Libreria `uuid` (o `crypto.randomUUID()` nativo del browser) | Generazione di ID univoci per transazioni, categorie, obiettivi, regole |
| Build/bundling | **Vite** | Generazione di un bundle statico, leggero, installabile e servibile anche senza connessione dopo il primo caricamento |
| Backend | **Nessuno** | L'app è totalmente client-side: nessun server necessario in produzione |

---

## 6. Modello dati completo

Di seguito la struttura logica delle entità principali, così come vanno salvate in IndexedDB. Sono schemi concettuali (non codice finale, ma sufficientemente precisi da poter essere trascritti quasi identici nel codice).

### 6.1 Transazione (`Transaction`)

```json
{
  "id": "uuid-v4",
  "type": "entrata | uscita",
  "categoryId": "uuid della categoria",
  "accountId": "uuid del portafoglio/conto",
  "amount": 45.90,
  "date": "2026-07-02",
  "description": "testo libero opzionale",
  "recurringRuleId": "uuid-regola | null",
  "createdAt": "2026-07-02T10:15:00.000Z",
  "updatedAt": "2026-07-02T10:15:00.000Z"
}
```

- `amount`: sempre un numero **positivo**; il segno concettuale (entrata/uscita) è determinato esclusivamente dal campo `type`.
- `description`: opzionale, testo libero per note (es. "Benzina Q8 - viaggio Roma").
- `recurringRuleId`: valorizzato solo se la transazione è stata generata automaticamente da una regola ricorrente (vedi Sezione 11); resta comunque modificabile/eliminabile singolarmente.
- `accountId`: indica a quale **portafoglio/conto** appartiene il movimento (vedi Sezione 6.6 e Sezione 17 per il sistema multi-valuta). Se l'utente non ha creato portafogli aggiuntivi, ogni transazione viene assegnata automaticamente al portafoglio predefinito creato al primo avvio, in modo trasparente per chi usa l'app con una sola valuta.

### 6.2 Categoria (`Category`)

```json
{
  "id": "uuid-v4",
  "type": "entrata | uscita",
  "name": "Benzina",
  "icon": "⛽",
  "color": "#D32F2F",
  "isDefault": true,
  "archived": false,
  "order": 3
}
```

- `icon`: emoji scelta da un selettore visuale (emoji picker) integrato nell'app, oppure identificativo di un'icona SVG inclusa localmente.
- `color`: colore esadecimale, usato in badge, liste e grafici; scelto da una palette predefinita accessibile o tramite color-picker con controllo automatico del contrasto minimo.
- `isDefault`: distingue le categorie precaricate di fabbrica da quelle create dall'utente. Le categorie di default restano comunque rinominabili, ricolorabili e disattivabili.
- `archived`: permette di "nascondere" una categoria dai menu di selezione per le nuove transazioni, senza cancellare lo storico di quelle già registrate.
- `order`: posizione nella lista, modificabile via drag & drop.

**Categorie Entrate precaricate di default:**

| Icona | Nome | Colore suggerito |
|---|---|---|
| 💼 | Stipendio | Verde `#2E7D32` |
| 🏐 | Arbitri | Arancione `#EF6C00` |
| 📥 | Altro | Grigio `#616161` |

**Categorie Uscite precaricate di default:**

| Icona | Nome | Colore suggerito |
|---|---|---|
| ⛽ | Benzina | Rosso `#D32F2F` |
| 🍻 | Uscite amici | Viola `#7B1FA2` |
| ❤️ | Uscite Giulia | Rosa `#C2185B` |
| 🚗 | Auto | Blu `#1565C0` |
| 🛒 | Spesa | Verde acqua `#00897B` |
| 📦 | Altro | Grigio `#616161` |

Tutte queste categorie sono **modificabili, rinominabili, ricolorabili, riordinabili o archiviabili/eliminabili** dall'utente tramite la pagina Categorie (vedi Sezione 10).

### 6.3 Regola di ricorrenza (`RecurringRule`)

```json
{
  "id": "uuid-v4",
  "type": "entrata | uscita",
  "categoryId": "uuid-categoria",
  "amount": 1400.00,
  "description": "Stipendio mensile",
  "frequency": "settimanale | mensile | annuale",
  "executionDay": 27,
  "startDate": "2026-07-01",
  "endDate": "null oppure data",
  "active": true
}
```

Vedi Sezione 11 per il funzionamento dettagliato della generazione automatica.

### 6.4 Obiettivo (`Goal`)

```json
{
  "id": "uuid-v4",
  "targetType": "entrata | uscita | saldo",
  "period": "mensile | annuale | nessuno",
  "referenceMonth": "2026-07",
  "referenceYear": "2026",
  "recurring": true,
  "targetAmount": 300.00,
  "categoryId": "uuid-categoria | null",
  "notifyThresholds": [50, 80, 100],
  "notifiedThresholds": [],
  "createdAt": "2026-07-01T09:00:00.000Z",
  "active": true
}
```

- `targetType`:
  - `entrata` → obiettivo sul totale entrate, oppure su una categoria specifica di entrata se `categoryId` è valorizzato.
  - `uscita` → obiettivo sul totale uscite, oppure su una categoria specifica (es. "non superare 100€ di Benzina questo mese").
  - `saldo` → obiettivo sul saldo netto (entrate − uscite) del periodo.
- `period`:
  - `mensile` → si applica al mese indicato in `referenceMonth`.
  - `annuale` → si applica all'anno indicato in `referenceYear`.
  - `nessuno` → obiettivo "libero", senza scadenza temporale, monitorato sul totale complessivo da quando è stato creato.
- `recurring`: se `true` e `period = mensile`, l'obiettivo si rigenera automaticamente ogni nuovo mese con lo stesso importo target; se `false`, vale solo per il periodo indicato.
- `categoryId`: opzionale, per obiettivi legati a una categoria specifica anziché al totale.
- `notifyThresholds`: elenco di soglie percentuali (es. `[50, 80, 100]`), **personalizzabili liberamente dall'utente** per ciascun obiettivo (aggiunta, rimozione, modifica dei valori), oltre le quali viene inviata una notifica locale (vedi Sezione 12.1).
- `notifiedThresholds`: elenco delle soglie già notificate nel periodo corrente, usato internamente per evitare di inviare più volte lo stesso avviso; viene azzerato a ogni nuovo periodo (es. a inizio mese per un obiettivo mensile).

Vedi Sezione 12 per le regole di calcolo dell'avanzamento e per il funzionamento delle notifiche.

### 6.5 Impostazioni utente (`Settings`)

```json
{
  "theme": "chiaro | scuro | automatico",
  "defaultAccountId": "uuid del portafoglio principale",
  "aggregateDisplayCurrency": "EUR",
  "locale": "it-IT",
  "dateFormat": "gg/mm/aaaa",
  "startOfWeek": "lunedì",
  "fontSize": "normale | grande | molto_grande",
  "highContrast": false,
  "reduceMotion": false,
  "notificationsEnabled": false
}
```

Esiste un solo record di impostazioni per l'intera app (non è una lista).

- `defaultAccountId`: il portafoglio proposto per default nel modulo di nuova transazione (Sezione 9) e usato per pre-popolare l'app al primo avvio (vedi Sezione 6.6).
- `aggregateDisplayCurrency`: valuta usata solo per la **vista aggregata** su più portafogli in valute diverse (Sezione 17); non altera la valuta nativa di ciascun portafoglio.
- `notificationsEnabled`: interruttore generale delle notifiche locali di soglia sugli obiettivi (Sezione 12.1); `false` di default — l'app non richiede mai il permesso del browser automaticamente, solo quando l'utente attiva questa opzione.

### 6.6 Portafoglio / Conto (`Account`)

```json
{
  "id": "uuid-v4",
  "name": "Conto principale",
  "currency": "EUR",
  "icon": "🏦",
  "color": "#1565C0",
  "initialBalance": 0,
  "isDefault": true,
  "archived": false,
  "order": 1,
  "createdAt": "2026-07-01T09:00:00.000Z"
}
```

- Ogni transazione (Sezione 6.1) appartiene a **esattamente un** portafoglio tramite `accountId`.
- Al primo avvio l'app crea automaticamente un portafoglio predefinito (`isDefault: true`) nella valuta scelta durante l'introduzione guidata (Sezione 19), così chi usa una sola valuta non deve configurare nulla in più.
- L'utente può creare, rinominare, ricolorare, riordinare e archiviare portafogli aggiuntivi in qualsiasi momento, ciascuno con la propria valuta nativa (vedi Sezione 17 per il dettaglio funzionale).
- Un portafoglio con transazioni associate non può essere eliminato direttamente: va prima archiviato o le sue transazioni vanno riassegnate a un altro portafoglio, con la stessa logica già prevista per le categorie (Sezione 10.2).

### 6.7 Tasso di cambio manuale (`ExchangeRate`)

```json
{
  "id": "uuid-v4",
  "fromCurrency": "USD",
  "toCurrency": "EUR",
  "rate": 0.92,
  "updatedAt": "2026-07-01T09:00:00.000Z"
}
```

- Inserito e aggiornato **manualmente** dall'utente dalla pagina Portafogli (Sezione 8.8) — mai scaricato automaticamente da internet, in coerenza con il vincolo di funzionamento offline (Sezione 3, Sezione 7.2 delle istruzioni originali).
- Usato esclusivamente per calcolare una **stima aggregata** del saldo complessivo quando esistono portafogli in valute diverse; ogni valore calcolato con un tasso manuale è sempre etichettato in interfaccia come "stima", mai come dato ufficiale (vedi Sezione 17.3).
- Se per una coppia di valute non è stato inserito alcun tasso, la vista aggregata mostra i saldi separati per valuta invece di sommarli, senza inventare conversioni.

---

## 7. Mappa delle pagine e navigazione

### 7.1 Struttura di navigazione

- **Su smartphone**: barra di navigazione inferiore fissa (*Bottom Navigation Bar*), sempre visibile, con 4-5 icone + etichette. Il pulsante di aggiunta rapida (FAB, vedi Sezione 9) è sovrapposto in evidenza, raggiungibile col pollice.
- **Su desktop/tablet largo**: barra laterale (*Sidebar*) fissa a sinistra con le stesse voci di navigazione, etichette estese. Il pulsante "Aggiungi transazione" compare nell'header/toolbar in alto, non come elemento flottante.
- La navigazione è **identica concettualmente** su entrambe le piattaforme: cambia solo la disposizione spaziale dei controlli, mai le funzionalità disponibili.

### 7.2 Elenco pagine principali

1. **Dashboard (Home)** — quadro generale immediato della situazione finanziaria
2. **Transazioni** — elenco completo di entrate e uscite, con filtri e ricerca
3. **Resoconti** — analisi mensile/annuale/personalizzata con liste, grafici e statistiche avanzate
4. **Obiettivi** — creazione e monitoraggio dei budget, con soglie di notifica
5. **Categorie** — gestione delle categorie personalizzate
6. **Ricorrenze** — gestione delle regole di transazioni automatiche
7. **Portafogli** — gestione dei conti multi-valuta e dei tassi di cambio manuali
8. **Impostazioni** — tema, valuta, notifiche, accessibilità, backup, info app

### 7.3 Breakpoint responsive

| Breakpoint | Larghezza | Layout |
|---|---|---|
| Mobile | < 768px | Bottom navigation + FAB, colonna singola |
| Tablet | 768px – 1024px | Sidebar compatta (solo icone) + layout misto |
| Desktop | > 1024px | Sidebar estesa (icone + etichette) + layout multi-colonna |

---

## 8. Funzionalità dettagliate per pagina

### 8.1 Dashboard (Home)

**Obiettivo:** dare in un colpo d'occhio la situazione finanziaria attuale.

Contenuti, in ordine di priorità visiva:
- **Saldo attuale** (entrate totali − uscite totali), in grande evidenza, con colore semantico (verde se positivo, rosso se negativo) **sempre accompagnato da testo/icona**, mai solo dal colore.
- **Riepilogo mese corrente**: totale entrate, totale uscite, differenza, con freccia/percentuale di confronto rispetto al mese precedente.
- **Mini-grafico andamento saldo** (ultimi 30/90 giorni), per capire subito la tendenza.
- **Progresso obiettivi attivi** del periodo corrente (le 2-3 card principali, barre di avanzamento sintetiche, es. "Spesa Benzina: 65€ / 100€").
- **Ultime 5-10 transazioni**, con link "Vedi tutte" verso la pagina Transazioni.
- **Notifica visiva** quando una transazione ricorrente è stata generata automaticamente (es. "Stipendio di Luglio aggiunto automaticamente").
- Tocco su una qualsiasi voce apre il dettaglio o la pagina correlata.
- Pulsante di aggiunta rapida sempre presente (vedi Sezione 9).

### 8.2 Transazioni

**Obiettivo:** consultare, cercare, modificare, eliminare ogni movimento registrato.

- Elenco cronologico (più recenti in alto), raggruppato per giorno/mese con intestazioni chiare.
- Ogni riga mostra: icona categoria, nome categoria, descrizione (se presente), data, importo colorato (verde entrata / rosso uscita) **sempre con segno + o − in testo**, non solo colore.
- **Filtri disponibili**: per tipo (entrata/uscita), per categoria (multi-selezione), per intervallo di date, per intervallo di importo.
- **Ricerca testuale** nella descrizione.
- **Ordinamento**: per data o per importo.
- Tocco su una transazione apre il dettaglio con possibilità di **modifica** o **eliminazione** (con conferma).
- Swipe (su mobile) o pulsanti rapidi (su desktop) per modifica/eliminazione veloce.

### 8.3 Resoconti

**Obiettivo:** analizzare l'andamento finanziario nel tempo, in forma di lista e di grafico.

- **Selettore di periodo**, con tre modalità equivalenti per completezza di funzioni (nessuna è "meno completa" delle altre):
  1. **Mensile**, con navigazione avanti/indietro tra i mesi (es. "‹ Giugno 2026 ›").
  2. **Annuale**, con navigazione avanti/indietro tra gli anni (es. "‹ 2026 ›").
  3. **Personalizzato**: l'utente sceglie liberamente una **data di inizio** e una **data di fine** tramite un selettore a doppia data (o calendario a intervallo), utilizzabile sia da tastiera sia da touch; l'app impedisce di selezionare una data di fine precedente alla data di inizio, segnalando l'errore in tempo reale (vedi Sezione 19). Utile ad esempio per confrontare periodi non allineati al mese solare (es. "dal 15 giugno al 15 luglio", la durata di un viaggio).
- Tutti i contenuti seguenti (riepilogo, lista, grafici, statistiche) si ricalcolano identicamente qualunque sia la modalità di periodo scelta: cambia solo l'intervallo di date passato alle stesse funzioni di calcolo, non la logica.
- **a) Riepilogo numerico**: totale entrate, totale uscite, saldo netto del periodo, con evidenza visiva positivo/negativo.
- **b) Lista transazioni**: riepilogo raggruppato per categoria nel periodo selezionato, ordinabile per importo o per nome; filtri rapidi solo entrate/solo uscite/categoria specifica; ricerca testuale.
- **c) Grafici globali** del periodo:
  - Confronto Entrate vs Uscite (grafico a barre o torta/ciambella)
  - Andamento del saldo nel tempo (grafico a linee)
  - Andamento mensile di entrate/uscite/saldo per la vista annuale (barre, mese per mese)
- **d) Grafici per tipologia**:
  - Ripartizione delle uscite per categoria (grafico a torta/ciambella)
  - Ripartizione delle entrate per categoria (grafico a torta/ciambella)
  - Classifica delle categorie per importo totale (grafico a barre orizzontali)
  - Andamento nel tempo di una **singola categoria selezionata**, isolabile tramite un filtro dedicato che nasconde tutte le altre serie
- **e) Statistiche avanzate** (pannello dedicato, sempre visibile in fondo alla pagina Resoconti):
  - **Media mensile** di entrate, uscite e saldo, calcolata sullo storico dei mesi con almeno una transazione registrata.
  - **Proiezione del saldo futuro**: stima di fine mese e di fine anno, calcolata sul ritmo delle transazioni già registrate nel periodo corrente (proiezione lineare semplice: importo accumulato finora ÷ giorni trascorsi nel periodo × giorni totali del periodo). Il calcolo avviene interamente in locale sui dati già presenti in IndexedDB, senza alcun servizio esterno.
  - Ogni valore proiettato è sempre accompagnato da un'etichetta esplicita "stima/proiezione" (badge o testo), per non essere confuso con un dato consuntivo reale (es. "Al ritmo attuale, a fine mese il saldo sarà di circa 640 €").
- **Interazione lista ⇄ grafico**: cliccando su una categoria nel grafico, la lista transazioni si filtra automaticamente su quella categoria; è inoltre possibile **isolare una singola categoria** per vederne il solo andamento nel periodo selezionato.

### 8.4 Obiettivi

**Obiettivo:** impostare e monitorare budget su spesa, guadagno, saldo o singole categorie.

- **Creazione obiettivo**, l'utente sceglie in ordine:
  1. Tipo: Entrata / Uscita / Saldo
  2. (Opzionale) categoria specifica, oppure obiettivo sul totale
  3. Periodo: Mensile / Annuale / Nessuno (senza scadenza)
  4. Se mensile: possibilità di renderlo **ricorrente** (si rigenera ogni mese con lo stesso target) oppure valido solo per il mese corrente
  5. Importo target
  6. **Soglie di notifica** (opzionale ma preimpostato): una o più percentuali (default suggerito 50% / 80% / 100%) oltre le quali ricevere un avviso; l'utente può aggiungere, rimuovere o modificare liberamente questi valori per ciascun obiettivo (vedi Sezione 12.1 per il funzionamento completo delle notifiche)
- **Elenco obiettivi attivi**, ciascuno mostrato come card con:
  - Icona/nome della categoria (o "Totale" se generico)
  - Importo raggiunto attuale vs importo target (es. "780€ / 1.000€")
  - Barra di avanzamento con percentuale di completamento
  - Colore semantico dinamico: verde entro budget, giallo vicino al limite, rosso superato (per le uscite); per entrata/saldo la logica è invertita — raggiungere/superare il target è positivo (barra verde/oro oltre il 100%)
  - Giorni rimanenti nel periodo (per obiettivi mensili/annuali)
- **Filtro di dettaglio**: selezionando un obiettivo si apre una vista dedicata con grafico di avanzamento (gauge/barra circolare) e uno storico di quanto ci si è avvicinati/allontanati dal target nei periodi precedenti.
- Possibilità di modificare o eliminare un obiettivo esistente.
- Stato vuoto curato ("Nessun obiettivo impostato") con invito chiaro a crearne uno.

### 8.5 Categorie

Vedi sezione dedicata [10. Sistema di categorie personalizzate](#10-sistema-di-categorie-personalizzate).

### 8.6 Ricorrenze

Vedi sezione dedicata [11. Transazioni ricorrenti automatiche](#11-transazioni-ricorrenti-automatiche).

### 8.7 Impostazioni

- **Tema**: Chiaro / Scuro / Automatico (segue le impostazioni di sistema).
- **Valuta di visualizzazione aggregata e formato numerico** (vedi Sezione 17); i portafogli con le rispettive valute native si gestiscono nella pagina dedicata (Sezione 8.8).
- **Formato data**.
- **Notifiche**: interruttore generale "Notifiche di soglia sugli obiettivi" (corrisponde a `notificationsEnabled`, Sezione 6.5); attivandolo per la prima volta l'app richiede l'autorizzazione al browser tramite la Notification API (vedi Sezione 12.1) — mai in automatico all'avvio dell'app.
- **Accessibilità**: dimensione testo (normale/grande/molto grande), modalità alto contrasto, riduzione animazioni.
- **Backup**: esporta tutti i dati in un file `.json` (vedi Sezione 13).
- **Ripristino**: importa un file di backup precedente, con conferma esplicita prima di sovrascrivere i dati attuali.
- **Reset dati**: cancellazione totale con doppia conferma, azione distruttiva protetta contro click accidentali.
- **Informazioni sull'app**: versione, guida rapida all'uso, changelog locale.

### 8.8 Portafogli

**Obiettivo:** gestire i conti multi-valuta e permettere una stima aggregata del patrimonio complessivo, restando pienamente offline (vedi Sezione 17 per la logica funzionale completa).

- Elenco dei portafogli esistenti, ciascuno mostrato come card con: icona, nome, valuta nativa, saldo corrente in quella valuta, badge "predefinito" se applicabile.
- **Crea nuovo portafoglio**: nome, valuta (scelta da un elenco di valute comuni), icona/colore, saldo iniziale.
- **Modifica/Archivia/Elimina** un portafoglio, con la stessa logica di sicurezza già prevista per le categorie (riassegnazione o archiviazione se ha transazioni collegate, vedi Sezione 10.2).
- **Tassi di cambio manuali**: tabella dei tassi inseriti dall'utente tra le valute dei propri portafogli (Sezione 6.7), con possibilità di aggiungere, modificare o aggiornare ogni tasso in qualsiasi momento; ogni riga mostra chiaramente la data dell'ultimo aggiornamento manuale, per ricordare che non si tratta di un dato in tempo reale.
- **Vista aggregata**: saldo complessivo calcolato convertendo ogni portafoglio nella valuta di visualizzazione aggregata scelta nelle Impostazioni, usando i tassi manuali disponibili; se manca un tasso per una coppia di valute, il relativo portafoglio viene mostrato separatamente invece di essere sommato, e l'intera vista aggregata è etichettata come "stima" (mai come saldo ufficiale).

---

## 9. Pulsante "Nuova transazione" (FAB / azione rapida)

**Requisito chiave: deve essere sempre raggiungibile, da qualsiasi pagina ci si trovi.**

- **Su mobile**: implementato come *Floating Action Button* (FAB), elemento fisso in basso a destra (o centrato sopra la barra di navigazione), che rimane visibile durante lo scroll su ogni schermata.
- **Su desktop**: pulsante "Aggiungi transazione" ben visibile nella toolbar/header principale (non fluttuante).
- Al tocco/click si apre un **modulo rapido** (bottom sheet su mobile, finestra modale su desktop) per inserire una nuova transazione, con i campi nell'ordine seguente:
  1. Selettore Entrata / Uscita (in evidenza, primo campo)
  2. Selezione categoria (griglia visiva di icone/colori già configurati, con nome testuale accanto a ciascuna icona, scroll se numerose)
  3. Importo (tastierino numerico ottimizzato su mobile)
  4. Portafoglio/conto di riferimento — campo visibile solo se esiste più di un portafoglio (Sezione 8.8); se ne esiste uno solo viene assegnato automaticamente senza mostrare il campo, per non appesantire l'inserimento nel caso d'uso più comune
  5. Data (default: oggi, modificabile)
  6. Descrizione (opzionale)
  7. Pulsanti "Salva" e "Salva e aggiungi un'altra", ben visibili; pulsante "Annulla"; se si sta modificando una transazione esistente, anche "Elimina"
- Chiusura rapida (swipe down / tasto Esc / tocco fuori dal modulo), con richiesta di conferma **solo se sono stati inseriti dati**, per evitare perdite accidentali.
- Il FAB **non deve mai coprire contenuti importanti**: va posizionato tenendo conto dei margini di sicurezza e dello spazio già occupato dalla barra di navigazione.
- Su desktop, scorciatoia da tastiera (es. tasto `N`) per aprire il modulo di nuova transazione, come miglioria di efficienza/accessibilità.

---

## 10. Sistema di categorie personalizzate

Ogni categoria (sia Entrata che Uscita) è interamente personalizzabile. Sezione dedicata "Gestisci categorie", divisa in due liste (Entrate/Uscite).

### 10.1 Campi personalizzabili
- **Nome**: testo libero.
- **Icona**: selezione da un set di emoji tramite selettore visuale (emoji picker) organizzato per ricerca/tag (es. "auto", "cibo", "sport"), oppure da mini-libreria di icone SVG incluse localmente — nessun servizio esterno.
- **Colore**: selezione da una palette predefinita **accessibile** (contrasto sufficiente sia in tema chiaro che scuro) oppure colore personalizzato tramite color-picker, con controllo automatico del contrasto minimo rispetto allo sfondo.
- **Anteprima live** di come apparirà il badge della categoria (icona + colore + nome) mentre la si modifica.

### 10.2 Operazioni disponibili
- **Aggiungi** nuova categoria (Entrata o Uscita).
- **Modifica** categoria esistente (nome, icona, colore) — incluse quelle predefinite.
- **Riordina** le categorie (drag & drop o frecce su/giù) per personalizzare l'ordine nei menu di selezione.
- **Disattiva/Archivia** una categoria: non più selezionabile per nuove transazioni, ma le transazioni storiche restano visibili e integre.
- **Elimina** una categoria:
  - Se **non ha transazioni associate** → eliminazione diretta, con conferma.
  - Se **ha transazioni associate** → l'app propone in alternativa di:
    a) **Archiviare** la categoria (resta nello storico ma non è più selezionabile), oppure
    b) **Riassegnare** tutte le transazioni collegate a un'altra categoria esistente prima di procedere con l'eliminazione.

---

## 11. Transazioni ricorrenti automatiche

**Obiettivo:** evitare l'inserimento manuale ripetuto di movimenti fissi (es. stipendio mensile, abbonamento auto, ecc.).

- Pagina dedicata **Ricorrenze**, con elenco delle regole attive/in pausa.
- **Creazione regola ricorrente**: tipo (entrata/uscita), categoria, importo, descrizione, frequenza (settimanale / mensile / annuale), giorno di esecuzione, data di inizio, data di fine opzionale.
- L'app genera **automaticamente** la transazione corrispondente alla data prevista, ogni volta che viene aperta — calcolando anche le occorrenze mancate nel frattempo, così da non perdere eventi se l'app resta chiusa per un periodo prolungato.
- Ogni transazione generata automaticamente viene collegata alla regola d'origine tramite `recurringRuleId` (vedi Sezione 6.1) e resta comunque **modificabile o eliminabile singolarmente**, senza alterare la regola generale.
- L'utente può **mettere in pausa, modificare o eliminare** una regola in qualsiasi momento; l'eliminazione della regola **non cancella** le transazioni già generate in passato.
- Notifica visiva in Dashboard quando una nuova transazione ricorrente viene generata automaticamente (es. "Stipendio di Luglio aggiunto automaticamente").

---

## 12. Sistema di obiettivi (budget) e notifiche di soglia

Regole di calcolo dell'avanzamento per ciascun `targetType` (vedi anche Sezione 6.4 per la struttura dati e Sezione 8.4 per l'interfaccia):

- **Uscita (totale o per categoria)**: somma di tutte le uscite pertinenti nel periodo, confrontata con `targetAmount`. L'obiettivo è un **tetto massimo** da non superare: barra verde entro budget, gialla in avvicinamento (es. oltre l'80%), rossa se superato.
- **Entrata (totale o per categoria)**: somma di tutte le entrate pertinenti nel periodo, confrontata con `targetAmount`. L'obiettivo è un **traguardo minimo** da raggiungere: barra che diventa verde/oro al raggiungimento o superamento del target.
- **Saldo**: entrate − uscite nel periodo, confrontato con `targetAmount` come traguardo minimo da raggiungere.
- Se `period = nessuno`, il calcolo avviene sul totale complessivo delle transazioni pertinenti da quando l'obiettivo è stato creato, senza limiti temporali.

Il **filtro di dettaglio** menzionato nella Sezione 8.4 corrisponde alla possibilità, nella pagina Obiettivi, di selezionare un singolo obiettivo e visualizzarne il resoconto isolato con relativo grafico di avanzamento, invece di vedere tutti gli obiettivi insieme.

### 12.1 Notifiche locali di soglia

**Obiettivo:** avvisare l'utente quando un obiettivo attivo supera una percentuale di completamento configurata (es. *"Hai superato l'80% del budget Benzina"*), senza alcun server coinvolto.

- **Tecnologia**: [Notification API](https://developer.mozilla.org/docs/Web/API/Notification) nativa del browser (`Notification.requestPermission()` + `new Notification(...)`), abbinata dove possibile alle notifiche del Service Worker (`registration.showNotification()`) per poter comparire anche quando l'app non è in primo piano. È l'unica eccezione al vincolo "zero dipendenze esterne" (Sezione 3), in quanto API del dispositivo stesso e non un servizio remoto.
- **Permessi**: la richiesta di autorizzazione al browser avviene **solo** quando l'utente attiva esplicitamente l'opzione "Notifiche" nelle Impostazioni (Sezione 8.7) — mai in automatico al primo avvio dell'app. La funzione resta sempre disattivabile in qualsiasi momento.
- **Logica di funzionamento**: a ogni ricalcolo dell'avanzamento di un obiettivo (ad ogni apertura dell'app e a ogni nuova transazione pertinente), l'app confronta la percentuale raggiunta con le soglie impostate in `notifyThresholds` (Sezione 6.4); se una soglia è superata e non è ancora presente in `notifiedThresholds` per il periodo corrente, viene generata la notifica e la soglia viene marcata come "già notificata", così da non ripetere lo stesso avviso più volte nello stesso periodo. Il campo `notifiedThresholds` si azzera automaticamente all'inizio di ogni nuovo periodo (es. nuovo mese per un obiettivo mensile ricorrente).
- **Soglie personalizzabili**: per ciascun obiettivo l'utente può impostare liberamente una o più soglie percentuali (default suggerito: 50%, 80%, 100%), aggiungendole, modificandole o rimuovendole dalla schermata di modifica dell'obiettivo (Sezione 8.4).
- **Miglioria progressiva**: se il browser/dispositivo non supporta le notifiche (limite noto su alcune versioni di iOS per le PWA), l'app continua comunque a mostrare l'avviso **in-app** nella Dashboard e nella pagina Obiettivi, così l'informazione non va mai persa anche quando la notifica di sistema non è disponibile.

---

## 13. Backup, esportazione, importazione e reset dati

Poiché non esiste alcun account né sincronizzazione cloud, l'unico modo per l'utente di mettere al sicuro il proprio storico (o trasferirlo su un altro dispositivo) è un backup manuale locale. Questa funzione è **obbligatoria**, non opzionale, proprio a causa del vincolo "tutto locale" descritto nella Sezione 3.

### 13.1 Esportazione (Backup)
- Dalla pagina Impostazioni, l'utente può esportare **tutti** i dati (transazioni, categorie, obiettivi, regole di ricorrenza, impostazioni) in un unico file scaricabile, es. `backup_finanze_2026-07-03.json`.
- È un semplice download di file gestito dal browser, **non** un servizio cloud: il file resta sotto il pieno controllo dell'utente, che decide dove salvarlo (spazio locale, chiavetta, cartella cloud personale gestita manualmente, ecc.).

### 13.2 Importazione (Ripristino)
- L'utente può caricare un file di backup precedentemente esportato per ripristinare i dati.
- Prima di sovrascrivere i dati attuali, l'app richiede sempre una **conferma esplicita**, spiegando chiaramente cosa accadrà (es. "Questa operazione sostituirà tutti i dati attuali con quelli del file selezionato").
- Utile anche per trasferire manualmente i dati tra dispositivi diversi.

### 13.3 Reset dati
- Cancellazione totale di tutti i dati salvati, protetta da **doppia conferma** (azione distruttiva, va protetta bene in UX per evitare click accidentali — es. richiedere di digitare una parola di conferma o un doppio tocco su pulsanti distanziati).

---

## 14. Grafici: tipologie, regole e utilizzo

| Contesto | Tipo di grafico | Perché |
|---|---|---|
| Andamento saldo nel tempo (Dashboard, Resoconti) | Linea | Mostra chiaramente la tendenza (crescita/calo) |
| Confronto Entrate vs Uscite per periodo | Barre affiancate, o torta/ciambella | Confronto diretto e immediato |
| Andamento mensile entrate/uscite/saldo (vista annuale) | Barre, mese per mese | Mostra la stagionalità/variazione lungo l'anno |
| Ripartizione uscite/entrate per categoria | Torta o Ciambella | Mostra il "peso" proporzionale di ogni categoria |
| Classifica categorie per importo | Barre orizzontali | Confronto rapido tra categorie ordinate |
| Avanzamento di un obiettivo | Barra di progresso / Gauge (semicerchio) | Comunica immediatamente quanto manca al traguardo |
| Storico di un obiettivo nei periodi passati | Barre o linea comparativa | Mostra se si sta migliorando o peggiorando nel rispetto del budget |
| Proiezione del saldo futuro (Resoconti, Sezione 8.3e) | Linea tratteggiata che prosegue la serie storica | Distingue visivamente il dato reale (linea continua) dalla stima proiettata (tratteggiata), sempre con etichetta "proiezione" |

**Regole di leggibilità obbligatorie per tutti i grafici:**
- Ogni grafico ha sempre un **titolo** e, se necessario, una breve descrizione testuale del dato principale (utile anche per chi usa lettori di schermo).
- Le legende sono sempre visibili, con colore **e** testo — mai il solo colore a distinguere le serie (fondamentale anche per utenti con daltonismo).
- I valori numerici chiave sono sempre disponibili anche in forma testuale accanto o sotto al grafico, oppure tramite una tabella dati equivalente o tooltip accessibili: non tutto il significato deve dipendere dalla sola immagine.
- Nessun grafico deve mostrare più di 6-7 categorie contemporaneamente: oltre questa soglia, raggruppare le voci minori sotto "Altro" per mantenere la leggibilità.
- Animazioni di comparsa dei grafici fluide ma **disattivabili** (vedi Sezione 16, riduzione animazioni).

---

## 15. Design System (UI)

### 15.1 Filosofia visiva
Interfaccia **moderna, pulita, "mobile-first"**, con superfici a schede (card) leggermente arrotondate, ombre morbide, spaziatura generosa, gerarchia visiva chiara: i numeri importanti (saldo, importi) sono sempre gli elementi più grandi e in risalto della schermata.

### 15.2 Tipografia
- Un solo font principale, leggibile anche a dimensioni piccole (sans-serif moderno, incluso localmente nel progetto — oppure system font stack `-apple-system, "Segoe UI", Roboto, sans-serif` per zero peso di download).
- Dimensione testo base minima 16px, scalabile dalle impostazioni di accessibilità.
- Scala tipografica coerente: Importi principali (grande, bold) → Titoli sezione (medio, bold) → Testo normale → Testo secondario/etichette (piccolo, colore attenuato).
- Numeri e importi sempre allineati e con spaziatura tabellare (font tabellare) per facilitarne la lettura in colonna, con separatore delle migliaia e 2 decimali.

### 15.3 Colori e temi
- **Tema chiaro** e **Tema scuro**, entrambi progettati appositamente (non uno semplicemente "invertito" dall'altro) per garantire buon contrasto e comfort visivo in entrambi i casi.
- Tema scuro con sfondo non-nero puro (es. `#121212`/`#1E1E1E`) per ridurre l'affaticamento visivo; testo non bianco puro, per lo stesso motivo.
- Tema chiaro con sfondo bianco/quasi bianco e testo scuro ad alto contrasto.
- Colori semantici coerenti in tutta l'app:
  - Verde → entrate, valori positivi, obiettivi raggiunti
  - Rosso → uscite, valori negativi, obiettivi superati
  - Giallo/Arancione → avvisi, obiettivi vicini al limite
- Ogni colore semantico è **sempre affiancato da un'icona o da un testo** (es. ▲/▼, ✓/✗, segno + o −), mai unico indicatore.

### 15.4 Icone ed emoji
- Le emoji scelte per le categorie sono sempre accompagnate dal nome testuale (mai solo icona senza etichetta), sia per chiarezza visiva sia per gli screen reader.
- Icone di sistema (frecce, matita per modificare, cestino per eliminare) coerenti in tutta l'app, con dimensione minima adeguata al tocco.

### 15.5 Layout e disposizione
- **Mobile**: layout a colonna singola, contenuti prioritari in alto, barra di navigazione fissa in basso, FAB sempre raggiungibile col pollice.
- **Desktop**: layout a più colonne dove sensato (es. Dashboard con card affiancate, Resoconti con lista e grafico fianco a fianco), sidebar di navigazione fissa, uso efficiente dello spazio orizzontale extra senza affollare l'interfaccia.
- Spaziatura basata su una griglia costante (es. multipli di 8px) per coerenza visiva in ogni pagina.
- Elementi interattivi (pulsanti, categorie, voci di lista) con area di tocco ampia e ben distanziata.

### 15.6 Micro-interazioni
- Transizioni fluide tra le pagine (slide/fade leggero).
- Feedback immediato al tocco/click (leggero cambio di stato/colore su pulsanti e card, toast/snackbar per conferme).
- Stato di caricamento (skeleton/placeholder) durante l'apertura di grafici con molti dati, per evitare schermate percepite come "bloccate".

### 15.7 Principi UX generali
- **Chiarezza prima di tutto**: ogni schermata ha uno scopo chiaro, azioni primarie evidenti, azioni distruttive protette da conferma.
- **Coerenza**: stessi pattern di interazione ripetuti in tutta l'app (es. swipe per eliminare una riga, sempre nello stesso modo).
- **Prevenzione errori**: validazione input in tempo reale, richieste di conferma per azioni irreversibili.

---

## 16. Accessibilità (a11y)

Requisiti minimi da rispettare, in linea con le linee guida **WCAG 2.1 livello AA**:

- **Contrasto colore**: rapporto minimo 4.5:1 tra testo e sfondo, 3:1 per testo grande ed elementi grafici/icone significative — verificato sia in tema chiaro che scuro.
- **Palette testata anche per daltonismo**: non affidarsi solo al colore rosso/verde per indicare entrata/uscita o obiettivo raggiunto/non raggiunto — accompagnare sempre con icone (es. ▲/▼, ✓/✗) e testo.
- **Nessuna informazione trasmessa solo tramite colore**.
- **Navigabilità da tastiera**: ogni funzione (inclusa l'apertura del FAB e la compilazione del modulo di nuova transazione) è raggiungibile e utilizzabile anche senza mouse/touch, con indicatore di focus sempre visibile e ordine di tabulazione logico.
- **Compatibilità con lettori di schermo**: etichette (`label`) descrittive su ogni pulsante/icona (incluse le icone-emoji delle categorie, che devono avere un testo alternativo, es. "Categoria: Benzina"), struttura semantica corretta di titoli e liste, attributi **ARIA** corretti su bottoni, grafici e form.
- **Messaggi annunciati agli screen reader** (`aria-live`) per conferme ed errori.
- **Dimensione testo regolabile**: opzione nelle impostazioni per aumentare la dimensione dei testi senza rompere il layout; modalità alto contrasto.
- **Aree di tocco minime**: almeno 44×44 pixel per ogni elemento interattivo su mobile, aree cliccabili generose anche su desktop.
- **Riduzione del movimento**: supporto a `prefers-reduced-motion` e opzione esplicita nelle impostazioni per disattivare/ridurre animazioni e transizioni.
- **Messaggi di errore chiari**: mai solo un bordo rosso, sempre un testo esplicativo di cosa correggere (es. "Inserisci un importo maggiore di zero").

---

## 17. Gestione multi-valuta, portafogli e localizzazione

### 17.1 Portafogli multi-valuta

- L'app supporta **più portafogli/conti** (entità `Account`, Sezione 6.6), ciascuno con la propria valuta nativa, scelta da un elenco delle valute più comuni (Euro €, Dollaro USA $, Sterlina £, Franco svizzero CHF, ecc.).
- Al primo avvio viene creato automaticamente un portafoglio predefinito nella valuta scelta durante l'introduzione guidata (Sezione 19): chi usa l'app con una sola valuta non deve configurare nulla in più, il comportamento resta identico a un'app "a valuta singola".
- Ogni transazione appartiene a un solo portafoglio (`accountId`, Sezione 6.1) e viene sempre visualizzata, formattata e sommata **nella valuta nativa di quel portafoglio**.
- La gestione completa dei portafogli avviene nella pagina dedicata (Sezione 8.8): creazione, modifica, archiviazione, riassegnazione transazioni.

### 17.2 Formattazione di importi, data e lingua

- Tutti gli importi in tutta l'app (transazioni, grafici, obiettivi, dashboard) vengono **sempre** formattati secondo la valuta del portafoglio di appartenenza e la lingua/locale selezionata (simbolo corretto, posizione del simbolo, separatore delle migliaia e decimale coerenti — es. formato italiano `1.234,56 €`).
- Formato data personalizzabile (es. `gg/mm/aaaa`), primo giorno della settimana configurabile.

### 17.3 Tassi di cambio manuali e vista aggregata (nessun servizio esterno)

- I tassi di cambio tra le valute usate nei propri portafogli **non vengono mai scaricati automaticamente da internet**: sarebbe una dipendenza esterna a runtime, esclusa dai vincoli di progetto (Sezione 3, punto 7.2 delle istruzioni originali).
- L'utente inserisce e aggiorna **manualmente** i tassi di cambio di cui ha bisogno dalla pagina Portafogli (entità `ExchangeRate`, Sezione 6.7), in qualsiasi momento lo desideri.
- Con i tassi disponibili, l'app può calcolare un **saldo aggregato stimato** su tutti i portafogli, convertito nella valuta di visualizzazione aggregata scelta nelle Impostazioni (`aggregateDisplayCurrency`, Sezione 6.5).
- Questo valore aggregato è **sempre etichettato chiaramente come stima** (es. badge "stima" accanto al totale), mai come saldo ufficiale in tempo reale, per non generare confusione con un vero tasso di cambio di mercato.
- Se per una coppia di valute non è stato inserito alcun tasso, i portafogli in quella valuta vengono mostrati separatamente nella vista aggregata, senza essere sommati arbitrariamente.

---

## 18. Funzionamento offline e installazione

- **Primo avvio**: richiede una connessione una tantum per scaricare l'app (come installare una qualsiasi applicazione).
- **Utilizzo successivo**: l'app funziona **sempre**, anche in modalità aereo, anche senza rete per mesi: tutte le pagine, i grafici, l'inserimento e la modifica dei dati restano pienamente operativi.
- **Installazione su smartphone**: tramite il menu del browser ("Aggiungi a schermata Home" su iOS/Android), l'app compare con icona propria come un'app nativa, si apre a schermo intero.
- **Installazione su computer**: tramite l'icona di installazione del browser (Chrome/Edge), l'app compare come programma autonomo, con propria finestra e icona nel launcher/menu Start.
- **Persistenza dei dati**: i dati restano salvati sul dispositivo anche a app chiusa; vengono letti/scritti istantaneamente ad ogni apertura, senza tempi di attesa di sincronizzazione (perché non c'è alcuna sincronizzazione remota).
- **Compatibilità**: funzionamento garantito sui browser moderni — Safari iOS, Chrome/Edge su Android e desktop, Firefox.

---

## 19. Stati vuoti, errori, conferme e feedback

- **Prima apertura assoluta**: breve introduzione guidata (2-3 schermate) che spiega il funzionamento base e invita a impostare la valuta preferita; poi si atterra sulla Dashboard con le categorie di default già pronte.
- **Liste vuote** (es. nessuna transazione ancora inserita, nessun obiettivo impostato): illustrazione/testo amichevole che invita all'azione successiva più utile (es. aggiungere la prima transazione tramite il pulsante rapido), invece di una schermata bianca.
- **Eliminazioni**: ogni eliminazione (transazione, categoria, obiettivo, regola ricorrente) richiede sempre una conferma esplicita, con testo chiaro su cosa verrà rimosso e se l'azione è reversibile o no.
- **Errori di inserimento** (es. importo vuoto, negativo o non numerico): segnalati in tempo reale accanto al campo interessato, con testo esplicativo, senza bloccare silenziosamente il salvataggio.
- **Feedback immediato**: ogni azione (salvataggio, eliminazione, errore, import completato) genera un feedback visivo chiaro (toast/snackbar, animazione di conferma).

---

## 20. Guida pratica: dal foglio bianco al primo avvio

Questa sezione è pensata per chi non ha esperienza pregressa e vuole seguire dei passi concreti per avviare il progetto in locale, in coerenza con tutte le sezioni precedenti. I comandi sono per macOS/Linux/Windows con terminale (su Windows, PowerPoint o il terminale integrato di VS Code vanno bene).

### 20.1 Prerequisiti da installare una volta sola sul computer
1. **Node.js** (versione 18 o superiore) — scaricabile da nodejs.org, installa automaticamente anche `npm`.
2. Un **editor di codice**, consigliato Visual Studio Code (gratuito).
3. Verifica che tutto sia installato correttamente aprendo un terminale e digitando:
   ```bash
   node -v
   npm -v
   ```
   Devono comparire dei numeri di versione, senza errori.

### 20.2 Creazione del progetto base con Vite + React
```bash
npm create vite@latest gestionefinanze -- --template react
cd gestionefinanze
npm install
```

### 20.3 Installazione delle librerie principali
```bash
npm install dexie chart.js react-chartjs-2 react-router-dom uuid
npm install -D vite-plugin-pwa
```
Cosa fa ciascuna libreria:
- `dexie` → wrapper semplificato per IndexedDB (storage locale, Sezione 6).
- `chart.js` + `react-chartjs-2` → grafici (Sezione 14).
- `react-router-dom` → navigazione tra le pagine (Sezione 7).
- `uuid` → generazione di identificativi univoci per transazioni/categorie/obiettivi/regole.
- `vite-plugin-pwa` → genera automaticamente manifest e service worker per rendere l'app installabile e offline (Sezione 4).

> Le notifiche di soglia sugli obiettivi (Sezione 12.1) non richiedono alcuna libreria aggiuntiva: usano la `Notification API` già integrata nel browser.

**Opzionale — solo se si vuole anche un vero file eseguibile desktop** (vedi nota introduttiva sulla scelta del linguaggio):
```bash
npm install -D electron electron-builder
```
Questa dipendenza è aggiuntiva e non influisce sull'app web/PWA: serve solo per il packaging descritto nella Sezione 20.8.

### 20.4 Configurazione PWA in `vite.config.js`
Aprire il file `vite.config.js` creato da Vite e sostituirne il contenuto con:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'GestioneFinanze',
        short_name: 'Finanze',
        description: 'Gestione personale di entrate e uscite, 100% offline',
        theme_color: '#2E7D32',
        background_color: '#FFFFFF',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}']
      }
    })
  ]
})
```
Questo unico blocco genera automaticamente sia il `manifest.json` (Sezione 4.4) sia il Service Worker con strategia Cache First (Sezione 4.3): non serve scriverli a mano.

> A questo punto vanno preparate due icone reali (192×192 e 512×512 px) e inserite in `public/icons/`. Qualsiasi editor di immagini locale va bene; l'importante è che siano incluse nel progetto e non caricate da internet.

### 20.5 Struttura minima delle cartelle da creare dentro `src/`
Vedi la Sezione 21 per la struttura completa consigliata. Come primo passo, creare almeno:
```
src/
├── data/
│   └── db.js
├── components/
├── pages/
└── theme/
```

### 20.6 Inizializzazione di IndexedDB con Dexie (`src/data/db.js`)
```javascript
import Dexie from 'dexie'

export const db = new Dexie('GestioneFinanzeDB')

db.version(1).stores({
  transactions: 'id, type, categoryId, accountId, date, recurringRuleId',
  categories: 'id, type, order',
  recurringRules: 'id, active',
  goals: 'id, targetType, period, active',
  accounts: 'id, archived, order',
  exchangeRates: 'id, fromCurrency, toCurrency',
  settings: 'id'
})

// Popolamento categorie di default al primo avvio (eseguito una sola volta)
export async function seedDefaultCategoriesIfEmpty() {
  const count = await db.categories.count()
  if (count > 0) return

  const defaultCategories = [
    { type: 'entrata', name: 'Stipendio', icon: '💼', color: '#2E7D32', isDefault: true, archived: false, order: 1 },
    { type: 'entrata', name: 'Arbitri', icon: '🏐', color: '#EF6C00', isDefault: true, archived: false, order: 2 },
    { type: 'entrata', name: 'Altro', icon: '📥', color: '#616161', isDefault: true, archived: false, order: 3 },
    { type: 'uscita', name: 'Benzina', icon: '⛽', color: '#D32F2F', isDefault: true, archived: false, order: 1 },
    { type: 'uscita', name: 'Uscite amici', icon: '🍻', color: '#7B1FA2', isDefault: true, archived: false, order: 2 },
    { type: 'uscita', name: 'Uscite Giulia', icon: '❤️', color: '#C2185B', isDefault: true, archived: false, order: 3 },
    { type: 'uscita', name: 'Auto', icon: '🚗', color: '#1565C0', isDefault: true, archived: false, order: 4 },
    { type: 'uscita', name: 'Spesa', icon: '🛒', color: '#00897B', isDefault: true, archived: false, order: 5 },
    { type: 'uscita', name: 'Altro', icon: '📦', color: '#616161', isDefault: true, archived: false, order: 6 }
  ]

  for (const cat of defaultCategories) {
    await db.categories.add({ id: crypto.randomUUID(), ...cat })
  }
}

// Creazione del portafoglio predefinito al primo avvio (Sezione 6.6/17.1)
export async function seedDefaultAccountIfEmpty(defaultCurrency = 'EUR') {
  const count = await db.accounts.count()
  if (count > 0) return

  await db.accounts.add({
    id: crypto.randomUUID(),
    name: 'Conto principale',
    currency: defaultCurrency,
    icon: '🏦',
    color: '#1565C0',
    initialBalance: 0,
    isDefault: true,
    archived: false,
    order: 1,
    createdAt: new Date().toISOString()
  })
}
```
Questo file traduce direttamente il modello dati della Sezione 6 in tabelle reali, precarica le categorie di default della Sezione 6.2 e crea il portafoglio predefinito della Sezione 6.6, così l'app funziona da subito anche per chi usa una sola valuta.

### 20.7 Primo avvio in locale
```bash
npm run dev
```
Il terminale mostrerà un indirizzo tipo `http://localhost:5173`: aprendolo nel browser si vedrà il progetto React di base, pronto per essere sviluppato seguendo l'ordine della Roadmap (Sezione 23).

### 20.8 Generazione della build finale installabile (PWA) e dell'eseguibile desktop

**a) Build PWA (obbligatoria)** — quando il progetto è pronto per essere provato come vera app installabile:
```bash
npm run build
npm run preview
```
`npm run build` crea la cartella `dist/` con i file statici ottimizzati (compresi manifest e service worker); `npm run preview` avvia un piccolo server locale per provare l'app esattamente come sarà in produzione, incluso il funzionamento offline (da testare disattivando la connessione dopo il primo caricamento).

**b) Eseguibile desktop reale con Electron (facoltativo, in aggiunta alla PWA)** — per ottenere un vero file `.exe` (Windows), `.app` (macOS) o AppImage (Linux) da lanciare con doppio click senza passare dal browser, a partire dalla stessa cartella `dist/` generata al punto (a):
```bash
npx electron-builder --config electron-builder.json
```
con un file `electron-builder.json` minimo che punta alla cartella `dist/` come sorgente e a un piccolo `electron-main.js` che apre `dist/index.html` in una finestra Electron. Il risultato è un unico eseguibile installabile su Windows/macOS/Linux, utile per chi preferisce non passare dal browser su computer; su smartphone resta comunque valida l'installazione PWA descritta nella Sezione 18, che è l'equivalente mobile dello stesso concetto di "app installata".

### 20.9 Pubblicazione per renderla installabile su smartphone/PC reali
La cartella `dist/` generata al passo precedente va pubblicata su un qualsiasi hosting statico (es. Netlify, Vercel, GitHub Pages, o anche un semplice hosting personale) tramite protocollo **HTTPS** (obbligatorio per Service Worker e installabilità PWA). Una volta online:
- Da smartphone: aprire l'indirizzo nel browser → menu → "Aggiungi a schermata Home".
- Da computer: aprire l'indirizzo in Chrome/Edge → icona di installazione nella barra degli indirizzi.

Da questo momento l'app è installata e funzionerà offline come descritto nella Sezione 18.

---

## 21. Struttura tecnica dei file del progetto

Organizzazione consigliata, coerente con la guida pratica della Sezione 20:

```
gestionefinanze/
├── public/
│   ├── icons/                         # Icone app in varie risoluzioni (192px, 512px, ecc.)
│   └── fonts/                         # Font inclusi localmente (se non si usa system font stack)
├── src/
│   ├── components/
│   │   ├── FAB/                       # Pulsante flottante + modulo rapido di inserimento
│   │   ├── NavigationBar/             # Bottom bar (mobile) / Sidebar (desktop)
│   │   ├── TransactionList/
│   │   ├── TransactionForm/
│   │   ├── CategoryPicker/
│   │   ├── EmojiPicker/
│   │   ├── Charts/                    # Componenti grafico riutilizzabili (linea, barre, torta, gauge)
│   │   ├── GoalProgress/
│   │   └── AccountPicker/             # Selettore portafoglio nel FAB (Sezione 9)
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Transactions/
│   │   ├── Reports/                   # Include statistiche avanzate e periodo personalizzato (Sezione 8.3)
│   │   ├── Goals/
│   │   ├── Categories/
│   │   ├── Recurring/
│   │   ├── Accounts/                  # Pagina Portafogli (Sezione 8.8)
│   │   └── Settings/
│   ├── data/
│   │   ├── db.js                      # Inizializzazione Dexie/IndexedDB (Sezione 20.6)
│   │   ├── transactionsRepo.js        # Funzioni CRUD transazioni
│   │   ├── categoriesRepo.js          # Funzioni CRUD categorie
│   │   ├── goalsRepo.js               # Funzioni CRUD obiettivi + calcolo avanzamento
│   │   ├── recurringRepo.js           # Funzioni CRUD regole + generazione automatica
│   │   ├── accountsRepo.js            # Funzioni CRUD portafogli (Sezione 6.6)
│   │   ├── exchangeRatesRepo.js       # Funzioni CRUD tassi di cambio manuali (Sezione 6.7)
│   │   └── backupRepo.js              # Export/Import/Reset dati (Sezione 13)
│   ├── theme/
│   │   ├── light.css
│   │   └── dark.css
│   ├── services/
│   │   └── goalNotifications.js       # Logica di soglia + Notification API (Sezione 12.1)
│   ├── utils/
│   │   ├── currencyFormatter.js
│   │   ├── dateHelpers.js
│   │   ├── goalCalculations.js
│   │   └── statsProjections.js        # Medie mensili e proiezione saldo (Sezione 8.3e)
│   ├── App.jsx                        # Routing principale (Sezione 7)
│   └── main.jsx                       # Punto di ingresso dell'app
├── electron-main.js                   # Solo se si genera anche l'eseguibile desktop (Sezione 20.8b)
├── vite.config.js                     # Configurazione build + plugin PWA (Sezione 20.4)
├── package.json
└── README.md
```

---

## 22. Requisiti non funzionali

| Requisito | Descrizione |
|---|---|
| **Offline-first** | L'app deve essere pienamente funzionante senza connessione internet, in ogni sua parte, sempre. |
| **Zero dipendenze esterne a runtime** | Nessuna chiamata a server, API, CDN, database esterni dopo l'installazione. Tutte le librerie incluse nel bundle. Unica eccezione: la Notification API nativa del browser (Sezione 12.1), che non è un servizio remoto. |
| **Privacy assoluta** | Nessun dato dell'utente lascia mai il dispositivo, se non per export manuale esplicitamente richiesto. Nessun tracking, nessun analytics di terze parti. |
| **Persistenza affidabile** | I dati non devono andare persi tra una sessione e l'altra, anche chiudendo completamente l'app/browser. |
| **Performance** | Caricamento istantaneo (dati locali), gestione fluida anche con alcune migliaia di transazioni nel tempo. |
| **Installabilità** | L'app deve poter essere "installata" su home screen (mobile) e come app desktop (PC) tramite PWA; su desktop è disponibile anche un eseguibile nativo opzionale generato con Electron (Sezione 20.8b). |
| **Portabilità dati** | Possibilità di esportare/importare un backup completo in formato leggibile (JSON), sotto controllo dell'utente. |
| **Correttezza finanziaria multi-valuta** | Nessuna somma tra valute diverse senza un tasso di cambio inserito manualmente dall'utente; ogni totale convertito è sempre etichettato come stima (Sezione 17.3). |
| **Compatibilità** | Funzionamento su browser moderni (Safari iOS, Chrome/Edge Android e desktop, Firefox). |
| **Accessibilità** | Conformità WCAG 2.1 AA come descritto nella Sezione 16. |

---

## 23. Roadmap di sviluppo consigliata

**Fase 1 — Fondamenta**
- Setup progetto PWA (manifest, service worker, installabilità) — vedi Sezione 20.
- Modello dati e livello di persistenza (IndexedDB/Dexie).
- Struttura di navigazione responsive (sidebar/bottom-nav) con routing tra le schermate vuote.
- Design System: colori, tipografia, temi chiaro/scuro.

**Fase 2 — Core: Entrate/Uscite**
- CRUD transazioni (aggiungi, modifica, elimina).
- Categorie predefinite precaricate al primo avvio.
- Pulsante/FAB globale con modulo rapido di inserimento.
- Lista transazioni con filtri base.
- Dashboard base.

**Fase 3 — Categorie personalizzate**
- CRUD categorie (nome, icona, colore), riordino, archiviazione, riassegnazione transazioni.

**Fase 4 — Report e grafici**
- Pagina Resoconti con selettore periodo (mensile/annuale), riepilogo numerico, lista.
- Grafici globali e per categoria.
- Filtri interattivi lista ⇄ grafici.

**Fase 5 — Obiettivi**
- CRUD obiettivi, calcolo automatico avanzamento, card con progress bar, vista di dettaglio.

**Fase 6 — Automazioni**
- Pagina Ricorrenze: creazione regole, generazione automatica delle transazioni, notifiche in Dashboard.

**Fase 7 — Multi-valuta e portafogli**
- Entità Portafoglio ed entità Tasso di cambio (Sezioni 6.6, 6.7).
- Pagina Portafogli: CRUD conti, inserimento manuale tassi di cambio, vista aggregata stimata.
- Selettore portafoglio nel modulo di nuova transazione (Sezione 9), migrazione dei dati esistenti verso il portafoglio predefinito.

**Fase 8 — Periodo personalizzato e statistiche avanzate**
- Terza modalità "Personalizzato" nel selettore di periodo dei Resoconti (Sezione 8.3).
- Pannello statistiche avanzate: medie mensili e proiezione del saldo futuro (Sezione 8.3e).

**Fase 9 — Notifiche di soglia sugli obiettivi**
- Campo soglie personalizzabili nel form Obiettivi.
- Integrazione Notification API + Service Worker, gestione permessi, fallback in-app (Sezione 12.1).

**Fase 10 — Backup e rifinitura UX/UI**
- Export/Import JSON, Reset dati protetto.
- Impostazioni complete (tema, valuta, notifiche, accessibilità).
- Test di accessibilità (contrasto, tastiera, lettore di schermo).

**Fase 11 — Collaudo finale**
- Test offline reale (modalità aereo) su telefono e computer.
- Test di installazione su iOS/Android/PC (PWA) e, se realizzato, dell'eseguibile desktop Electron.
- Test con grandi quantità di dati (performance) e con più portafogli/valute contemporaneamente.
- Ottimizzazione fluidità e animazioni.

---

## 24. Checklist finale dei requisiti

- [ ] App utilizzabile e comoda sia da smartphone sia da computer, installabile su iOS, Android e PC (PWA)
- [ ] Funzionamento 100% offline, zero chiamate esterne (unica eccezione: Notification API)
- [ ] Tutti i dati salvati solo in locale (IndexedDB)
- [ ] Gestione Entrate con categorie di default: Stipendio, Arbitri, Altro
- [ ] Gestione Uscite con categorie di default: Benzina, Uscite amici, Uscite Giulia, Auto, Spesa, Altro
- [ ] CRUD completo categorie personalizzate (nome, icona/emoji, colore, ordine) per entrate e uscite, colore coerente in tutta l'app
- [ ] Pulsante di aggiunta rapida sempre visibile, raggiungibile da ogni pagina, senza cambio pagina
- [ ] Transazioni ricorrenti automatiche, con generazione delle occorrenze mancate
- [ ] Pagina Resoconti con lista filtrabile per mese/anno/**periodo personalizzato**, grafici globali e per categoria con legenda e colori coerenti
- [ ] Statistiche avanzate: media mensile di entrate/uscite/saldo e proiezione del saldo futuro
- [ ] Sezione Obiettivi (entrate/uscite/saldo, totale o per categoria), periodo mensile/annuale/nessuno, con importo raggiunto, percentuale e grafico di avanzamento richiamabile da filtro dedicato
- [ ] Notifiche locali di soglia sugli obiettivi (Notification API, previa autorizzazione), soglie personalizzabili per obiettivo
- [ ] Multi-portafoglio con valute diverse; tassi di cambio inseriti e aggiornati **manualmente**, saldo aggregato stimato
- [ ] Backup/Export ed Import/Ripristino dati in locale, Reset dati protetto
- [ ] Layout responsive con posizione controlli diversa tra mobile (bottom-nav + FAB) e desktop (sidebar + header)
- [ ] Tema chiaro e scuro, entrambi progettati appositamente
- [ ] Conformità a11y (contrasto WCAG AA, navigazione da tastiera, ARIA, target di tocco, riduzione animazioni)
- [ ] Nessun account, nessun login, nessuna dipendenza da servizi esterni (a parte l'eccezione Notification API)
- [ ] Nessuna funzionalità incompleta, nessun placeholder, nessun elemento non collegato alla logica reale

---

## 25. Funzionalità NON richieste — proposte in attesa di conferma

- **Blocco app con PIN/impronta digitale**: proteggerebbe l'accesso ai dati finanziari personali in caso di dispositivo condiviso o smarrito. Richiederebbe una schermata di sblocco all'apertura dell'app e l'uso della Web Authentication API (o un semplice PIN numerico salvato in locale) per l'impronta digitale/Face ID dove disponibile.
- **Sotto-categorie o tag multipli per transazione**: permetterebbe un'analisi ancora più granulare (es. la categoria "Spesa" suddivisa in "Alimentari"/"Casa"), aggiungendo un campo `tags` o `parentCategoryId` al modello dati.

### 25.1 Sincronizzazione opzionale tramite file locale condiviso

**Cos'è:** un modo per mantenere allineati i dati tra più dispositivi (es. telefono e computer) **senza** introdurre alcun servizio cloud integrato nell'app, sfruttando invece una cartella che l'utente sincronizza già per conto proprio con un servizio a sua scelta (es. una cartella di Google Drive, iCloud Drive o Dropbox, montata come cartella locale sul dispositivo).

- **Come funzionerebbe:** nelle opzioni di backup (Sezione 13), oltre al singolo file scaricato/caricato manualmente, l'app permetterebbe di indicare come destinazione/origine una cartella locale scelta dall'utente tramite la [File System Access API](https://developer.mozilla.org/docs/Web/API/File_System_API) del browser (dove supportata). L'app leggerebbe e scriverebbe periodicamente il proprio file di backup in quella cartella; sarebbe poi il servizio cloud personale dell'utente, già configurato a livello di sistema operativo, a occuparsi della sincronizzazione effettiva sugli altri dispositivi.
- **Il vincolo chiave del design:** l'app **non** si collegherebbe mai direttamente a Google Drive, Dropbox, iCloud o servizi simili — nessuna integrazione con le loro API. Dal punto di vista dell'app, si tratterebbe semplicemente di leggere/scrivere un file in una cartella locale del dispositivo, esattamente come già avviene con l'export manuale (Sezione 13.1). La funzione resterebbe quindi pienamente coerente con "zero dipendenze esterne a runtime" (Sezione 3): sarebbe l'utente, non l'app, a gestire la sincronizzazione.
- **Gestione dei conflitti:** poiché più dispositivi potrebbero scrivere sullo stesso file in momenti diversi, servirebbe un controllo di versione semplice — ad esempio un timestamp `lastSyncedAt` all'interno del file di backup — con richiesta di conferma esplicita all'utente in caso di conflitto (es. *"Il file trovato è più recente dei tuoi dati locali: vuoi importarlo?"*), evitando sovrascritture silenziose.
- **Perché è segnalata e non implementata:** è l'unica proposta di questa sezione che dipenderebbe, sia pur indirettamente e per scelta dell'utente, da un servizio cloud esterno al di fuori del controllo dell'app — motivo in più per attendere una conferma esplicita prima di procedere.

---

*Fine documento — questo file è pensato come riferimento completo e autosufficiente per guidare, passo dopo passo, lo sviluppo del codice sorgente dell'app GestioneFinanze, dalla progettazione all'installazione finale su smartphone e computer.*
