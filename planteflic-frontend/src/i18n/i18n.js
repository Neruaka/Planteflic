//frontend/src/i18n/i18n.js

// Import des modules i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Configuration i18n
i18n
  // Détection automatique de la langue du navigateur
  .use(LanguageDetector)
  // Intégration avec React
  .use(initReactI18next)
  // Initialisation avec les options
  .init({
    // Langue par défaut si aucune détection
    fallbackLng: 'fr',
    
    // Langues supportées
    supportedLngs: ['fr', 'en'],
    
    // Configuration du détecteur de langue
    detection: {
      // Ordre de détection : localStorage > navigateur > langue par défaut
      order: ['localStorage', 'navigator'],
      // Clé de stockage dans localStorage
      lookupLocalStorage: 'i18nextLng',
      // Cache la langue détectée
      caches: ['localStorage']
    },

    // Désactiver les namespaces (optionnel pour simplifier)
    ns: false,
    defaultNS: false,

    // Ressources de traduction
    resources: {
      // Traductions françaises
      fr: {
        translation: {
          // Navigation et interface générale
          nav: {
            dashboard: "Tableau de bord",
            logout: "Déconnexion",
            theme: "Changer de thème"
          },
          
          // Page de connexion
          login: {
            title: "Connexion",
            email: "Adresse email",
            password: "Mot de passe",
            submit: "Se connecter",
            noAccount: "Pas encore de compte ?",
            register: "S'inscrire",
            error: "Erreur de connexion"
          },
          
          // Page d'inscription
          register: {
            title: "Inscription",
            email: "Adresse email",
            password: "Mot de passe",
            submit: "S'inscrire",
            hasAccount: "Déjà un compte ?",
            login: "Se connecter",
            error: "Erreur lors de l'inscription",
            success: "Inscription réussie ! Vous pouvez maintenant vous connecter."
          },
          
          // Dashboard
          dashboard: {
            title: "🌿 Mes plantes",
            add: "➕ Ajouter",
            loading: "Chargement des plantes... 🌱",
            error: "Impossible de charger les plantes 😓",
            empty: "Aucune plante pour le moment. Ajoutez votre première plante ! 🌿",
            edit: "✏️ Modifier"
          },
          
          // Informations des plantes
          plant: {
            species: "Espèce",
            watering: "Arrosage : tous les {{frequency}} jours",
            lastWatered: "Dernier arrosage",
            notSpecified: "Non renseignée"
          },
          
          // Formulaire nouvelle plante
          newPlant: {
            title: "🌱 Ajouter une nouvelle plante",
            name: "Nom de la plante *",
            species: "Espèce (ex: Monstera deliciosa) *",
            frequency: "Fréquence d'arrosage (jours) *",
            lastWatered: "Date du dernier arrosage *",
            submit: "✅ Ajouter la plante",
            cancel: "❌ Annuler",
            loading: "🌱 Ajout...",
            required: "* Champs obligatoires",
            error: "Erreur lors de l'ajout de la plante",
            validation: "Tous les champs sont obligatoires"
          },
          
          // Formulaire édition plante
          editPlant: {
            title: "🌿 Modifier la plante",
            name: "Nom de la plante *",
            species: "Espèce (ex: Monstera deliciosa) *",
            frequency: "Fréquence d'arrosage (jours) *",
            lastWatered: "Date du dernier arrosage *",
            submit: "✅ Modifier",
            delete: "🗑️ Supprimer",
            cancel: "❌ Annuler",
            loadingEdit: "🌱 Modification...",
            loadingDelete: "🗑️ Suppression...",
            loading: "Chargement de la plante... 🌱",
            error: "Erreur lors de la modification",
            deleteError: "Erreur lors de la suppression",
            loadError: "Impossible de charger la plante",
            deleteConfirm: "Êtes-vous sûr de vouloir supprimer cette plante ?",
            validation: "Tous les champs sont obligatoires"
          },
          
          // Messages généraux
          common: {
            welcome: "Bienvenue sur Planteflic !",
            error: "Une erreur est survenue",
            success: "Opération réussie",
            loading: "Chargement...",
            save: "Sauvegarder",
            cancel: "Annuler",
            delete: "Supprimer",
            edit: "Modifier",
            add: "Ajouter"
          }
        }
      },
      
      // Traductions anglaises
      en: {
        translation: {
          // Navigation and general interface
          nav: {
            dashboard: "Dashboard",
            logout: "Logout",
            theme: "Switch theme"
          },
          
          // Login page
          login: {
            title: "Login",
            email: "Email address",
            password: "Password",
            submit: "Sign in",
            noAccount: "Don't have an account?",
            register: "Sign up",
            error: "Connection error"
          },
          
          // Register page
          register: {
            title: "Register",
            email: "Email address",
            password: "Password",
            submit: "Sign up",
            hasAccount: "Already have an account?",
            login: "Sign in",
            error: "Registration error",
            success: "Registration successful! You can now sign in."
          },
          
          // Dashboard
          dashboard: {
            title: "🌿 My plants",
            add: "➕ Add",
            loading: "Loading plants... 🌱",
            error: "Unable to load plants 😓",
            empty: "No plants yet. Add your first plant! 🌿",
            edit: "✏️ Edit"
          },
          
          // Plant information
          plant: {
            species: "Species",
            watering: "Watering: every {{frequency}} days",
            lastWatered: "Last watered",
            notSpecified: "Not specified"
          },
          
          // New plant form
          newPlant: {
            title: "🌱 Add a new plant",
            name: "Plant name *",
            species: "Species (e.g: Monstera deliciosa) *",
            frequency: "Watering frequency (days) *",
            lastWatered: "Last watering date *",
            submit: "✅ Add plant",
            cancel: "❌ Cancel",
            loading: "🌱 Adding...",
            required: "* Required fields",
            error: "Error adding plant",
            validation: "All fields are required"
          },
          
          // Edit plant form
          editPlant: {
            title: "🌿 Edit plant",
            name: "Plant name *",
            species: "Species (e.g: Monstera deliciosa) *",
            frequency: "Watering frequency (days) *",
            lastWatered: "Last watering date *",
            submit: "✅ Update",
            delete: "🗑️ Delete",
            cancel: "❌ Cancel",
            loadingEdit: "🌱 Updating...",
            loadingDelete: "🗑️ Deleting...",
            loading: "Loading plant... 🌱",
            error: "Error updating plant",
            deleteError: "Error deleting plant",
            loadError: "Unable to load plant",
            deleteConfirm: "Are you sure you want to delete this plant?",
            validation: "All fields are required"
          },
          
          // General messages
          common: {
            welcome: "Welcome to Planteflic!",
            error: "An error occurred",
            success: "Operation successful",
            loading: "Loading...",
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            add: "Add"
          }
        }
      }
    }
  });

export default i18n;