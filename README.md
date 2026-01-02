# SAE-501 Synapse

## 📋 Description

Application web de gestion de formations en ligne pour l'entreprise TXLFORMA. Projet dans le cadre de la SAE501 du BUT MMI.

## 🚀 Technologies Utilisées

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

## ️ Installation

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

3. **Configurer les variables d'environnement**

   Créez un fichier `.env` à la racine du projet :

   ```env
   VITE_API_URL=http://localhost:8080
   ```

4. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

   L'application sera accessible à l'adresse : `http://localhost:5173`

## 🎨 Fonctionnalités

### Pour les Étudiants

- ✅ Consultation du catalogue de formations
- ✅ Détails des formations et sessions
- ✅ Inscription aux formations
- ✅ Tableau de bord personnel
- ✅ Gestion du profil

### Pour les Administrateurs

- ✅ Dashboard avec statistiques (Chart.js, CountUp.js)
- ✅ Gestion des formations (CRUD)
- ✅ Gestion des sessions (CRUD)
- ✅ Gestion des comptes utilisateurs (CRUD)
- ✅ Gestion des enseignants (CRUD)
- ✅ Recherche et filtrage

## 👥 Contributeurs

Projet développé dans le cadre du SAE-501 par l'équipe Synapse.

## 📄 Licence

Ce projet est développé à des fins éducatives dans le cadre du SAE-501.
