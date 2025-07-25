# Planteflic

**Application de gestion de plantes avec système de rappel d'arrosage**

Une application web moderne permettant de gérer ses plantes d'intérieur avec un système intelligent de rappel d'arrosage basé sur les dates.

## Aperçu

- Gestion complète : Ajout, modification et suppression de plantes
- Rappels d'arrosage : Alertes visuelles avec badges rouges pour les plantes nécessitant un arrosage
- Interface responsive : Design adaptatif pour mobile, tablette et desktop
- Authentification sécurisée : Système de connexion avec JWT
- Thème sombre/clair : Basculement entre les thèmes
- Multilingue : Support français et anglais
- PWA Ready : Interface optimisée pour tous les appareils

## Technologies utilisées

### Frontend
- **React 19** avec Hooks
- **React Router** pour la navigation
- **Axios** pour les requêtes HTTP
- **i18next** pour l'internationalisation
- **React Hot Toast** pour les notifications
- **Vite** comme bundler

### Backend
- **Node.js** avec Express.js
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification
- **bcryptjs** pour le hashage des mots de passe
- **Joi** pour la validation des données
- **CORS** pour les requêtes cross-origin

## Installation

### Prérequis
- Node.js (v18 ou plus)
- MongoDB (local ou distant)
- Git

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/planteflic.git
cd planteflic
```

### 2. Installation du backend
```bash
cd planteflic-backend
npm install
```

### 3. Configuration de l'environnement
Créer un fichier `.env` dans le dossier `planteflic-backend` :
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/planteflic
JWT_SECRET=votre_secret_jwt_super_securise
```

### 4. Installation du frontend
```bash
cd ../planteflic-frontend
npm install
```

## Démarrage

### Backend (Terminal 1)
```bash
cd planteflic-backend
npm start
```
Le serveur démarre sur `http://localhost:5000`

### Frontend (Terminal 2)
```bash
cd planteflic-frontend
npm run dev
```
L'application démarre sur `http://localhost:5173`

## Fonctionnalités

### Authentification
- Inscription avec email et mot de passe
- Connexion sécurisée avec JWT
- Persistance de session
- Déconnexion

### Gestion des plantes
- **Ajout** : Nom, espèce, fréquence d'arrosage, dernière date d'arrosage, image (optionnelle)
- **Modification** : Édition de toutes les informations
- **Suppression** : Avec confirmation
- **Visualisation** : Liste avec cartes détaillées

### Système de rappel d'arrosage
- **Calcul automatique** : Basé sur la fréquence d'arrosage et la dernière date
- **Alertes visuelles** : Badge rouge animé sur les plantes nécessitant un arrosage
- **Statistiques** : Compteur de plantes à arroser
- **Arrosage en un clic** : Mise à jour instantanée de la date

### Interface utilisateur
- **Design responsive** : Adaptation mobile, tablette, desktop
- **Thème sombre/clair** : Basculement manuel avec persistance
- **Animations fluides** : Transitions CSS et micro-interactions
- **Notifications** : Toasts pour le feedback utilisateur
- **Loader animé** : Plante animée pendant les chargements

### Internationalisation
- **Français** par défaut
- **Anglais** disponible
- **Détection automatique** de la langue du navigateur
- **Persistance** du choix utilisateur

## Architecture

### Structure du projet
```
planteflic/
├── planteflic-backend/
│   ├── config/          # Configuration DB
│   ├── controllers/     # Logique métier
│   ├── middleware/      # Middleware d'auth
│   ├── models/          # Modèles MongoDB
│   ├── routes/          # Routes API
│   ├── validators/      # Validation Joi
│   └── server.js        # Point d'entrée
├── planteflic-frontend/
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── context/     # Contextes React
│   │   ├── hooks/       # Hooks personnalisés
│   │   ├── i18n/        # Traductions
│   │   ├── pages/       # Pages principales
│   │   ├── routes/      # Protection des routes
│   │   ├── services/    # API et services
│   │   └── styles/      # Styles CSS
│   └── public/          # Assets statiques
└── README.md
```

### API Endpoints

#### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

#### Plantes (protégées)
- `GET /api/plants` - Liste des plantes
- `POST /api/plants` - Créer une plante
- `GET /api/plants/:id` - Détails d'une plante
- `PUT /api/plants/:id` - Modifier une plante
- `DELETE /api/plants/:id` - Supprimer une plante
- `POST /api/plants/:id/water` - Marquer comme arrosée

## Scripts disponibles

### Backend
```bash
npm start        # Démarrage avec nodemon
npm test         # Tests (à implémenter)
```

### Frontend
```bash
npm run dev      # Développement avec Vite
npm run build    # Build de production
npm run preview  # Aperçu du build
npm run lint     # Linting ESLint
```

## Fonctionnalités avancées

### Responsive Design
- **Mobile First** : Design pensé d'abord pour mobile
- **Breakpoints** : 480px, 768px, 1024px
- **Touch Friendly** : Boutons adaptés au tactile
- **Flexbox/Grid** : Layouts modernes et flexibles

### Performance
- **Lazy Loading** : Chargement différé des composants
- **Optimisation bundle** : Tree shaking avec Vite
- **Compression** : Assets optimisés
- **Cache** : Stratégies de mise en cache

### Sécurité
- **JWT** : Tokens sécurisés avec expiration
- **Validation** : Joi côté backend, validation frontend
- **CORS** : Configuration sécurisée
- **Hashage** : Mots de passe hashés avec bcrypt


## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'feat: ajouter nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request


## Auteur

**Planteflic** - Application développée avec ❤️ pour les amoureux des plantes

---

## Roadmap

### Améliorations continues
- [ ] Tests unitaires et d'intégration
- [ ] Documentation API avec Swagger
- [ ] CI/CD avec GitHub Actions
- [ ] Monitoring et logs
- [ ] Base de données de plantes
- [ ] Reconnaissance d'images (IA)

---
