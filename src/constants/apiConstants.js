// Utilise le proxy Vite en développement, URL complète en production
export const API_URL = import.meta.env.PROD
  ? "http://localhost:8080/api"
  : "/api";