# SAE-501 Synapse

## Description

Application web de gestion de formations en ligne pour l'entreprise TXLFORMA. Projet dans le cadre de la SAE501 du BUT MMI.

Toutes les parties du projet (Front, Back, Base de données) se trouvent dans une image Docker afin de pouvoir tout lancer en une commande (Voir la partie Installation)

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

### Backend
- **Sprint Boot** (v3.5.7)
- **MySQL** (v9.5.0)
- **Stripe** (v24.12.0)
- **OpenAPI/Swagger** (v2.8.14)
- **Maven** (v3.9.9)

### Outils de Développement

- **ESLint** (v9.36.0)
- **@vitejs/plugin-react** (v5.0.4)
- **IntelliJ IDEA** (v2025.2.2)

## Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn
- Maven 3.9.9

### Étapes d'installation

1. **Cloner le repository**

   ```bash
   git clone https://github.com/MatteoBaldinetti/SAE-501_Synapse.git
   cd SAE-501_Synapse
   ```

2. **Démarrer le container Docker**

   ```bash
   cd docker
   docker compose -p txlforma up -d
   ```
   
   L'application sera accessible à l'adresse : `http://localhost:5173`

   #### Pour enlever le projet en entier
   ```bash
   docker-compose -p txlforma down -v
   ```

### Lancement individuel

## Web
```bash
cd Web
npm install
npm run dev
```

## API
### Il faut d'abord lancer un serveur sql avant de lancer l'api
```bash
docker run -d --name txlforma-mysql -e MYSQL_ROOT_PASSWORD=txlforma -e MYSQL_DATABASE=txlforma -p 3306:3306 -v txlforma_db:/var/lib/mysql mysql:latest
```

### Lancement de l'api
```bash
cd api
.\mvnw.cmd clean package
.\mvnw.cmd spring-boot:run
```
