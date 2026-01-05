# SAE-501 Synapse

## Description

Application web de gestion de formations en ligne pour l'entreprise TXLFORMA. Projet dans le cadre de la SAE501 du BUT MMI.

## Liens annexes :

### Figma :
https://www.figma.com/design/rCju9B0B6GPkQZQteJamXs/Untitled?node-id=0-1&t=zppyp5AM8Lq6ocLu-1

### Google Sheets (Gestion de projet)
https://docs.google.com/spreadsheets/d/1pWGgZ2eqJKw4hhwJ4UL4aFLdzIzlTNApL_veXBvF-9M/edit?usp=sharing

## Technologies Utilisées

### Frontend

- **React** (v19.1.1)
- **React Router DOM** (v7.9.5)
- **Vite** (v7.1.7)
- **Bootstrap** (v5.3.8)

### Visualisation de Données

- **Chart.js** (v4.5.1)
- **React Chart.js 2** (v5.3.1)
- **CountUp.js** (v2.9.0)

### Sécurité

- **bcryptjs** (v3.0.3)

### Outils de Développement

- **ESLint** (v9.36.0)
- **@vitejs/plugin-react** (v5.0.4)

## Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**

   ```bash
   git clone https://github.com/MatteoBaldinetti/SAE-501_Synapse.git
   cd SAE-501_Synapse
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Démarrer le container Docker**

   ```bash
   cd docker
   docker compose up -d
   ```

4. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

   L'application sera accessible à l'adresse : `http://localhost:5173`
