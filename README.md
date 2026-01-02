# SAE-501 Synapse

## 📋 Description

Synapse est une plateforme de gestion de formations en ligne développée dans le cadre du projet SAE-501. L'application permet aux étudiants de consulter et s'inscrire à des formations, tandis que les administrateurs peuvent gérer les formations, les sessions, et les comptes utilisateurs.

## 🚀 Technologies Utilisées

### Frontend
- **React** (v19.1.1) - Bibliothèque JavaScript pour construire l'interface utilisateur
- **React Router DOM** (v7.9.5) - Gestion de la navigation et du routage
- **Vite** (v7.1.7) - Build tool et serveur de développement rapide
- **Bootstrap** (v5.3.8) - Framework CSS pour le design responsive

### Visualisation de Données
- **Chart.js** (v4.5.1) - Bibliothèque de graphiques
- **React Chart.js 2** (v5.3.1) - Wrapper React pour Chart.js
- **CountUp.js** (v2.9.0) - Animations de compteurs

### Sécurité
- **bcryptjs** (v3.0.3) - Hachage de mots de passe

### Outils de Développement
- **ESLint** (v9.36.0) - Linter pour maintenir la qualité du code
- **@vitejs/plugin-react** (v5.0.4) - Plugin Vite pour React

## 📁 Arborescence du Projet

```
SAE-501_Synapse/
│
├── public/                          # Fichiers statiques publics
│
├── src/                             # Code source de l'application
│   ├── assets/                      # Ressources (images, fonts, etc.)
│   │   └── images/                  # Images du projet
│   │       ├── bigLogo.webp
│   │       ├── smallLogo.webp
│   │       ├── home_header_background.webp
│   │       ├── login_background.webp
│   │       ├── profile_picture.webp
│   │       ├── famous_course1.webp
│   │       ├── famous_course2.webp
│   │       └── famous_course3.webp
│   │
│   ├── components/                  # Composants réutilisables
│   │   ├── admin/                   # Composants d'administration
│   │   │   ├── Forms/               # Formulaires d'administration
│   │   │   │   ├── AdminAccounts.jsx
│   │   │   │   ├── CreateFormation.jsx
│   │   │   │   ├── CreateSession.jsx
│   │   │   │   ├── CreateUser.jsx
│   │   │   │   ├── EditFormation.jsx
│   │   │   │   ├── EditSession.jsx
│   │   │   │   └── EditUser.jsx
│   │   │   ├── AdminSession.jsx
│   │   │   ├── Admin_dashboard.jsx
│   │   │   └── Admin_formation.jsx
│   │   ├── ConfirmationDeleteModal.jsx
│   │   ├── CookieAgreement.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProfileComponents.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── SearchBar.jsx
│   │   └── TableCours.jsx
│   │
│   ├── constants/                   # Constantes de l'application
│   │   └── apiConstants.js
│   │
│   ├── contexts/                    # Contextes React (gestion d'état global)
│   │   └── AuthContext.jsx
│   │
│   ├── pages/                       # Pages de l'application
│   │   ├── admin/                   # Pages d'administration
│   │   │   └── AdminView.jsx
│   │   ├── student/                 # Pages étudiants
│   │   │   ├── Cours.jsx
│   │   │   ├── CoursDetail.jsx
│   │   │   ├── CoursPayment.jsx
│   │   │   └── DashBoard.jsx
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   │
│   ├── styles/                      # Fichiers CSS
│   │   ├── AdminDashboard.css
│   │   ├── ConfirmationDeleteModal.css
│   │   ├── CookieAgreement.css
│   │   ├── Cours.css
│   │   ├── CoursDetail.css
│   │   ├── CoursPayment.css
│   │   ├── Dashboard.css
│   │   ├── Home.css
│   │   ├── Login.css
│   │   └── Navbar.css
│   │
│   ├── App.jsx                      # Composant principal
│   ├── App.css                      # Styles du composant principal
│   ├── main.jsx                     # Point d'entrée de l'application
│   └── index.css                    # Styles globaux
│
├── .gitignore                       # Fichiers ignorés par Git
├── index.html                       # Page HTML principale
├── package.json                     # Dépendances et scripts npm
├── package-lock.json                # Verrouillage des versions des dépendances
├── vite.config.js                   # Configuration Vite
└── README.md                        # Documentation du projet
```

## 🛠️ Installation

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

## 📜 Scripts Disponibles

- **`npm run dev`** - Lance le serveur de développement Vite
- **`npm run build`** - Compile l'application pour la production
- **`npm run preview`** - Prévisualise la version de production
- **`npm run lint`** - Vérifie la qualité du code avec ESLint

## 🏗️ Architecture de l'Application

### Structure des Composants

#### Pages Principales
- **Home** - Page d'accueil avec présentation des formations
- **Login** - Page de connexion
- **AdminView** - Interface d'administration (dashboard, formations, sessions, comptes)
- **Student Pages** - Interface étudiante (cours, détails, paiement, dashboard)

#### Composants Réutilisables
- **Navbar** - Barre de navigation
- **Footer** - Pied de page
- **SearchBar** - Barre de recherche
- **TableCours** - Tableau d'affichage des cours
- **ConfirmationDeleteModal** - Modal de confirmation de suppression
- **CookieAgreement** - Bannière de consentement aux cookies

### Gestion de l'État
- **AuthContext** - Contexte d'authentification pour gérer l'état de connexion de l'utilisateur

### API
L'application communique avec une API backend via les endpoints définis dans `apiConstants.js`. Par défaut, l'API est accessible à `http://localhost:8080`.

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
- ✅ Recherche et filtrage

## 🔒 Sécurité

- Authentification via JWT (gérée par le backend)
- Hachage des mots de passe avec bcryptjs
- Protection des routes administrateur
- Validation des formulaires

## 🌐 API Endpoints

L'application utilise les endpoints suivants :

- **Formations** : `/api/trainings`
- **Sessions** : `/api/sessions`
- **Utilisateurs** : `/api/users`
- **Authentification** : `/api/auth`

## 📝 Conventions de Code

- Utilisation de **React Hooks** (useState, useEffect, useContext)
- Composants fonctionnels
- Nommage en **camelCase** pour les variables et fonctions
- Nommage en **PascalCase** pour les composants
- CSS modulaire par composant/page

## 👥 Contributeurs

Projet développé dans le cadre du SAE-501 par l'équipe Synapse.

## 📄 Licence

Ce projet est développé à des fins éducatives dans le cadre du SAE-501.

---

**Note** : Assurez-vous que le backend API est en cours d'exécution avant de lancer l'application frontend.
