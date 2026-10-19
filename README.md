# TaskFlow — TP3 (multi-pages + API)

Gestion de projets et de tâches en React + TypeScript (Vite), React Router et json-server.

## Installation
npm install

## Lancement
npm run dev        → lance l'API (http://localhost:3001) ET le site (http://localhost:5173)
npm run reset-db   → remet db.json dans son état initial (copie de db.seed.json)
npm run build      → vérification TypeScript + build de production

## Pages
- `/` : liste des projets (chargés depuis l'API, avec le nombre de tâches terminées)
- `/projects/:id` : un projet et ses tâches (ajout, statut, suppression enregistrés dans db.json)
- `/projects/new` : création de projet validée, puis redirection vers le projet
- `/about` : à propos + minuteur de concentration
- toute autre adresse ou projet inexistant : page 404