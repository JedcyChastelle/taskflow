# TaskFlow

Gestion de projets et de tâches en **React + TypeScript** (Vite), construite pas à pas au fil des TP du module React + Next.js — M2 Informatique, ESIEE-IT.

## Démo en ligne

| TP | Branche | Site |
|----|---------|------|
| TP1 | `tp1` | https://taskflow-tp1-jedcy.vercel.app |
| TP2 | `tp2` | https://taskflow-tp2-jedcy.vercel.app |
| TP3 | `tp3` | https://taskflow-tp3-jedcy.vercel.app |
| TP Next.js | — | https://taskflow-next-jedcy-blush.vercel.app |

API du TP3 (json-server sur Render) : https://taskflow-api-jedcy.onrender.com/projects

> L'API gratuite s'endort après 15 minutes sans visite : la première ouverture peut prendre une minute.

## Installation

```bash
git clone https://github.com/JedcyChastelle/taskflow.git
cd taskflow
npm install
```

## Lancement

```bash
npm run dev        # API sur http://localhost:3001 + site sur http://localhost:5173
npm run reset-db   # remet db.json dans son état initial (copie de db.seed.json)
npm run build      # vérification TypeScript + build de production
```

## Fonctionnalités

### TP1 — TaskFlow v0
- Liste de tâches typée (statut, priorité)
- Ajout d'une tâche avec validation (champ vide, 80 caractères maximum)
- Statut cliquable : À faire → En cours → Terminé
- Suppression, filtres (Toutes / À faire / En cours / Terminées), compteur de tâches restantes

### TP2 — TaskFlow v1
- Tâches sauvegardées dans le navigateur (hook `useLocalStorage`)
- Titre de l'onglet « (n) TaskFlow » (`useEffect`)
- Focus automatique dans le champ (`useRef`)
- Choix de la priorité Haute / Moyenne / Basse
- Minuteur de concentration de 25 minutes
- Thème clair / sombre mémorisé (`ThemeContext`)

### TP3 — Multi-pages + API
- Navigation avec React Router : `/`, `/projects/:id`, `/projects/new`, `/about`, page 404
- Données lues et écrites via une API json-server (`src/api.ts`)
- Écrans de chargement et d'erreur
- Formulaire de création de projet validé, puis redirection vers le projet

## Organisation Git

- Une branche par TP (`tp1`, `tp2`, `tp3`), fusionnée dans `dev` par une pull request.
- Chaque branche reste en ligne sur son propre projet Vercel.

## Technologies

React 19 · TypeScript · Vite · React Router · json-server · Vercel · Render

## Répartition du travail

J'ai travaillé seule 