# Gestione Finanze

Questa web app è stata preparata come Progressive Web App (PWA) installabile sul telefono.

## Installazione sul telefono

Dopo la pubblicazione su un host HTTPS:
- apri il sito da Chrome o Safari;
- scegli "Installa app" oppure "Aggiungi alla schermata Home";
- l'app verrà disponibile come applicazione installata sul dispositivo.

## Offline

Una volta aperta almeno una volta online, la PWA può essere usata anche senza connessione internet.

## Avvio in locale

```bash
npm install
npm run dev
```

L'app sarà disponibile su `http://localhost:5173`.

## Build di produzione

```bash
npm run build
npm run preview
```

## Distribuzione gratuita

Puoi pubblicare l'app gratuitamente usando servizi come Netlify, Vercel o GitHub Pages. Una volta distribuita su HTTPS, apri il sito nel browser del telefono e scegli "Installa app" o "Aggiungi alla schermata Home".