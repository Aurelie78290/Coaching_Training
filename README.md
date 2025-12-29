## 🃏 Poker Training Platform

Plateforme d’entraînement au poker **technique et mental**, conçue pour un coach professionnel et destinée à ses élèves.

Le site permet de travailler :
- la lecture des mains
- la compréhension des décisions street par street
- la gestion mentale et la prise de recul
- l’autonomie du joueur à travers des exercices interactifs
- 
## 🎯 Objectifs du projet

- Proposer un **outil pédagogique interactif** pour les joueurs de poker en ligne
- Rejouer des mains pas à pas (préflop → river)
- Visualiser les actions de chaque joueur dans un format proche d’un **replayer**
- Mettre en avant l’aspect **mental et décisionnel**, pas seulement les cartes
- Créer une base évolutive pour intégrer d’autres exercices (focus main, training room, routines mentales…)

## 🧠 À qui s’adresse ce projet ?

- Aux **élèves du coach** (joueurs amateurs à confirmés)
- Aux joueurs souhaitant structurer leur progression
- À terme : à toute personne intéressée par un apprentissage sérieux du poker

## 🛠️ Stack technique

### Frontend
- ⚛️ **React**
- 🟦 **TypeScript**
- 🎨 CSS (layout custom, animations)
- Gestion d’état avec hooks (`useState`, `useEffect`)

### Backend (API séparée)
- 🟢 **Node.js**
- 🚂 **Express**
- API REST fournissant :
  - les mains de poker
  - les joueurs
  - les actions par street
  - les données nécessaires au replayer

👉 Le backend est disponible dans un dépôt séparé :  https://github.com/Aurelie78290/API_CoachingTraining

## 🔄 Fonctionnalités actuelles

- ✔️ Navigation entre plusieurs mains
- ✔️ Replayer street par street (preflop, flop, turn, river)
- ✔️ Déroulé des actions une par une
- ✔️ Mise en évidence du joueur actif
- ✔️ Affichage progressif du board
- ✔️ Table de poker avec joueurs positionnés visuellement

  ## 🚧 Fonctionnalités à venir

- 📊 Statistiques simples par main
- ✍️ Notes et réflexions de l’élève
- 🎥 Replayer amélioré (timing, animations)
- 🧩 Autres exercices à venir (en refléxion avec le coach)

## 📁 Project Structure (Frontend)

src/
 ├── components/
 │   ├── MainsItem.tsx
 │   └── ...
 ├── pages/
 │   ├── MainsList.tsx
 │   └── ...
 ├── assets/
 │   ├── images/
 ├── styles/
 └── types/


##👩‍💻 Objectif personnel

Ce projet s’inscrit dans une démarche de reconversion vers le développement web, avec un focus sur :

- la structuration d’une application React

- la conception d’une API REST

- l’UX orientée apprentissage
