//planteflic-frontend/src/i18n/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    },

    ns: false,
    defaultNS: false,

    resources: {
      fr: {
        translation: {
          nav: {
            dashboard: "Tableau de bord",
            logout: "Déconnexion",
            theme: "Changer de thème"
          },
          
          login: {
            title: "Connexion",
            email: "Adresse email",
            password: "Mot de passe",
            submit: "Se connecter",
            noAccount: "Pas encore de compte ?",
            register: "S'inscrire",
            error: "Erreur de connexion"
          },
          
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
          
          dashboard: {
            title: "🌿 Mes plantes",
            add: "➕ Ajouter",
            loading: "Chargement des plantes... 🌱",
            error: "Impossible de charger les plantes 😓",
            empty: "Aucune plante pour le moment. Ajoutez votre première plante ! 🌿",
            edit: "✏️ Modifier"
          },
          
          plant: {
            species: "Espèce",
            watering: "Arrosage : tous les {{frequency}} jours",
            lastWatered: "Dernier arrosage",
            notSpecified: "Non renseignée"
          },
          
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
          
          toast: {
            plantAdded: "🌱 Plante ajoutée avec succès !",
            plantUpdated: "✅ Plante modifiée avec succès !",
            plantDeleted: "🗑️ Plante supprimée avec succès !",
            loginSuccess: "🎉 Connexion réussie !",
            registerSuccess: "🎊 Inscription réussie !",
            logoutSuccess: "👋 Déconnexion réussie !",
            error: "❌ Une erreur est survenue",
            loading: "⏳ Chargement en cours...",
            savingPlant: "💾 Sauvegarde de la plante...",
            deletingPlant: "🗑️ Suppression en cours...",
            loadingPlants: "🌿 Chargement des plantes..."
          },
          
          loader: {
            authenticating: "🔐 Authentification...",
            savingData: "💾 Sauvegarde...",
            deletingData: "🗑️ Suppression...",
            loadingData: "📥 Chargement..."
          },
          
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
      
      en: {
        translation: {
          nav: {
            dashboard: "Dashboard",
            logout: "Logout",
            theme: "Switch theme"
          },
          
          login: {
            title: "Login",
            email: "Email address",
            password: "Password",
            submit: "Sign in",
            noAccount: "Don't have an account?",
            register: "Sign up",
            error: "Connection error"
          },
          
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
          
          dashboard: {
            title: "🌿 My plants",
            add: "➕ Add",
            loading: "Loading plants... 🌱",
            error: "Unable to load plants 😓",
            empty: "No plants yet. Add your first plant! 🌿",
            edit: "✏️ Edit"
          },
          
          plant: {
            species: "Species",
            watering: "Watering: every {{frequency}} days",
            lastWatered: "Last watered",
            notSpecified: "Not specified"
          },
          
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
          
          toast: {
            plantAdded: "🌱 Plant added successfully!",
            plantUpdated: "✅ Plant updated successfully!",
            plantDeleted: "🗑️ Plant deleted successfully!",
            loginSuccess: "🎉 Login successful!",
            registerSuccess: "🎊 Registration successful!",
            logoutSuccess: "👋 Logout successful!",
            error: "❌ An error occurred",
            loading: "⏳ Loading...",
            savingPlant: "💾 Saving plant...",
            deletingPlant: "🗑️ Deleting...",
            loadingPlants: "🌿 Loading plants..."
          },
          
          loader: {
            authenticating: "🔐 Authenticating...",
            savingData: "💾 Saving...",
            deletingData: "🗑️ Deleting...",
            loadingData: "📥 Loading..."
          },
          
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