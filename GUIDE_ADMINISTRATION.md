# GUIDE D'ADMINISTRATION & DE DÉPLOIEMENT
## CHALLENGE TRAVEL & TOURS — MÉDÉA

Ce guide complet est destiné à l'équipe de direction et aux administrateurs de l'agence **Challenge Travel & Tours**. Il détaille le fonctionnement, l'administration quotidienne et le déploiement du site vitrine officiel.

---

## 📁 1. Structure du Projet Livré

```text
CHALLENGE_TRAVEL_TOURS/
├── index.html                  # Page d'accueil officielle (bilingue FR/EN)
├── services.html               # Page Services (Omra, Visa Arabie Saoudite, Voyages)
├── galerie.html                # Page Galerie photos avec filtres et Lightbox
├── actualites.html             # Page Actualités, conseils et offres
├── contact.html                # Page Contact avec formulaire sécurisé
├── 404.html                    # Page d'erreur 404 bilingue sur-mesure
├── mentions-legales.html       # Mentions légales & Politique de confidentialité
│
├── assets/
│   ├── css/
│   │   └── style.css           # Feuille de styles haut de gamme responsive
│   ├── js/
│   │   └── main.js            # Moteur bilingue, WhatsApp contextualisé, Lightbox
│   └── images/
│       ├── logo.svg            # Logo vectoriel officiel haute fidélité
│       └── favicon.svg         # Favicon officiel
│
├── wordpress-kit/
│   ├── challenge-theme/        # Thème WordPress sur-mesure complet
│   │   ├── style.css           # Déclaration du thème WP
│   │   ├── functions.php       # Optimisations, WebP, SVG, sécurité, menus
│   │   ├── header.php          # Header sticky responsive & sélecteur langue
│   │   ├── footer.php          # Footer 4 colonnes & widget WhatsApp
│   │   ├── index.php           # Archive des actualités
│   │   ├── single.php          # Vue détaillée d'un article
│   │   ├── page.php            # Rendu des pages Elementor
│   │   └── 404.php             # Gestion 404 WordPress
│   │
│   └── elementor-templates/
│       └── homepage-elementor-template.json # Modèle JSON importable en 1 clic
│
└── GUIDE_ADMINISTRATION.md     # Le présent guide
```

---

## 🚀 2. Test & Prévisualisation Immédiate (Sans Serveur)

Le site vitrine a été conçu pour être consultable immédiatement :
1. Ouvrez le dossier `CHALLENGE_TRAVEL_TOURS/`.
2. Double-cliquez sur `index.html` pour l'ouvrir dans Google Chrome, Microsoft Edge, Firefox ou Safari.
3. **Tester les fonctionnalités interactives** :
   - **Sélecteur de langue** : Cliquez sur `FR | EN` dans l'en-tête pour basculer instantanément tous les textes sans rechargement.
   - **Menu mobile** : Réduisez la largeur de votre navigateur (ou activez l'inspecteur mobile F12) pour tester le menu burger fluide.
   - **Galerie & Lightbox** : Sur `galerie.html`, filtrez par catégorie (Omra, Voyages, Agence, Événements) et cliquez sur une photo pour l'agrandir en plein écran.
   - **WhatsApp dynamique** : Le bouton vert flottant préremplit automatiquement un message adapté à la page visitée (Omra, Visa ou contact général).
   - **Formulaire de contact** : Remplissez et validez le formulaire pour tester les retours visuels et la protection anti-spam.

---

## 🌐 3. Installation sur WordPress & Elementor

### Étape 1 : Activer le Thème WordPress
1. Compressez le dossier `wordpress-kit/challenge-theme/` en fichier `.zip` (ou téléversez-le via FTP dans `/wp-content/themes/challenge-theme/`).
2. Dans votre tableau de bord WordPress : **Apparence > Thèmes > Ajouter > Téléverser un thème**.
3. Cliquez sur **Activer**.

### Étape 2 : Plugins Recommandés
Pour une gestion optimale et sans surcharger le site :
1. **Elementor** (Éditeur visuel de pages gratuit).
2. **Polylang** (Gestion bilingue Français / Anglais gratuite et légère).
3. **Contact Form 7** ou **WPForms** (Pour la réception des emails).

### Étape 3 : Importer le Modèle Elementor
1. Dans le menu WordPress : **Modèles > Modèles enregistrés**.
2. Cliquez sur **Importer des modèles** (en haut).
3. Sélectionnez le fichier `wordpress-kit/elementor-templates/homepage-elementor-template.json`.
4. Créez une nouvelle page "Accueil", réglez l'attribut de page sur **Elementor Pleine Largeur**, puis insérez le modèle importé.

---

## ✏️ 4. Administration Quotidienne par l'Agence

### A. Publier une Nouvelle Actualité
1. Allez dans **Articles > Ajouter un nouvel article**.
2. Renseignez le titre et le corps de texte.
3. Sélectionnez une catégorie dans la colonne de droite : `Omra`, `Visa`, `Voyages`, `Actualités` ou `Offres`.
4. Définissez une **Image mise en avant** de qualité (format 16:9 recommandé).
5. Cliquez sur **Publier**. L'article apparaît immédiatement sur la page d'accueil et dans la section Actualités.

### B. Mettre à Jour les Coordonnées
- Les numéros de téléphone officiels (`0773 496 112`, `0660 037 877`, `028 269 999`) et l'email (`challenge.atv@gmail.com`) sont centralisés dans le pied de page (`footer.php`) et sur la page `contact.html`.
- Si un nouveau numéro WhatsApp ou une nouvelle adresse physique à Alger doit être ajoutée, il suffit de modifier la constante correspondante.

### C. Gestion des Langues (Polylang)
- Dans **Langues > Paramètres**, configurez :
  - Langue par défaut : `Français (fr)`
  - Seconde langue : `English (en)`
- Pour chaque page créée en Français, cliquez sur l'icône `+` à côté du drapeau anglais pour rédiger sa version traduite correspondante.

---

## 🔒 5. Bonnes Pratiques de Sécurité & Mise en Ligne

1. **Activation HTTPS / SSL** : Obligatoire pour la confiance des visiteurs et le référencement Google. Activable gratuitement via Let's Encrypt chez votre hébergeur.
2. **Protection Anti-Spam** : Le formulaire intègre un champ Honeypot invisible pour bloquer les robots automatisés sans perturber les vrais clients.
3. **Optimisation des Images** : Le thème accepte nativement le format moderne `.webp` pour diviser le poids des images par 3 tout en conservant une netteté cristalline.
4. **Mises à jour & Sauvegardes** : Planifier une sauvegarde hebdomadaire de la base de données et des fichiers médias via UpdraftPlus.
