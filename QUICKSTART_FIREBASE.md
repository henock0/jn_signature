# 🚀 Guide de démarrage rapide Firebase

## Configuration en 5 minutes

### Étape 1: Créer un projet Firebase

1. Allez sur https://console.firebase.google.com/
2. Cliquez sur "Ajouter un projet"
3. Nommez votre projet "JN Signature" (ou autre nom)
4. Suivez les étapes de création

### Étape 2: Activer Authentication

1. Dans votre projet Firebase, allez dans **Authentication**
2. Cliquez sur **Commencer**
3. Sous "Méthodes de connexion", activez **E-mail/Mot de passe**

### Étape 3: Créer Firestore Database

1. Allez dans **Firestore Database**
2. Cliquez sur **Créer une base de données**
3. Choisissez le mode de démarrage:
   - **Mode test** (recommandé pour débuter) - ouvert pendant 30 jours
   - **Mode production** - vous devrez configurer les règles tout de suite
4. Choisissez l'emplacement (ex: `europe-west1` pour l'Europe)

### Étape 4: Obtenir les identifiants

1. Allez dans **Project Settings** (⚙️ en haut à gauche)
2. Faites défiler jusqu'à "Vos applications"
3. Cliquez sur l'icône **</>** (Web)
4. Enregistrez une application (ex: "JN Signature Web")
5. Copiez les valeurs de `firebaseConfig`

### Étape 5: Configurer l'application

Ouvrez le fichier `.env.local` et remplacez les valeurs:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... (votre clé API)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre-projet-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Étape 6: Créer les collections Firestore

Dans Firestore Database, créez ces collections (créez des documents factices pour initialiser):

#### 1. Collection `categories`
```json
{
  "name": "Vêtements",
  "slug": "vetements",
  "description": "Collection de vêtements",
  "image_url": "https://example.com/image.jpg",
  "created_at": "2024-02-03T10:00:00Z",
  "updated_at": "2024-02-03T10:00:00Z"
}
```

#### 2. Collection `products`
```json
{
  "name": "Chemise Premium",
  "description": "Belle chemise de qualité",
  "price": 89.99,
  "original_price": 120.00,
  "category_id": "ID_CATEGORIE_CI_DESSUS",
  "sub_category": null,
  "image_url": "https://example.com/shirt.jpg",
  "stock": 10,
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Noir", "Blanc", "Bleu"],
  "featured": true,
  "active": true,
  "created_at": "2024-02-03T10:00:00Z",
  "updated_at": "2024-02-03T10:00:00Z"
}
```

#### 3. Collection `profiles`
Créez un profil admin:
```json
{
  "email": "admin@jnsignature.com",
  "full_name": "Administrateur",
  "role": "admin",
  "phone": null,
  "address": null,
  "created_at": "2024-02-03T10:00:00Z",
  "updated_at": "2024-02-03T10:00:00Z"
}
```
**IMPORTANT**: L'ID du document doit être l'UID de l'utilisateur Firebase Auth.

#### 4. Collections vides (à créer)
- `orders` (vide au début)
- `order_items` (vide au début)
- `notifications` (vide au début)

### Étape 7: Configurer les règles Firestore (IMPORTANT)

Dans Firestore Database > Règles, collez ces règles de base:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Categories - tout le monde peut lire
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Products - tout le monde peut lire
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Profiles - utilisateur peut lire son propre profil
    match /profiles/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Orders - utilisateur peut voir ses commandes
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if false; // Seuls les admins via backend
    }
    
    // Order items
    match /order_items/{itemId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Notifications
    match /notifications/{notificationId} {
      allow read: if request.auth != null;
      allow write: if false; // Seuls les admins via backend
    }
  }
}
```

### Étape 8: Créer un utilisateur admin

1. Dans Firebase Console > **Authentication**
2. Cliquez sur **Ajouter un utilisateur**
3. Entrez:
   - Email: `admin@jnsignature.com`
   - Mot de passe: votre mot de passe admin sécurisé
4. Notez l'**UID** de l'utilisateur créé

5. Dans **Firestore Database** > collection `profiles`
6. Créez un document avec l'**ID = UID** de l'utilisateur:
```json
{
  "email": "admin@jnsignature.com",
  "full_name": "Administrateur JN Signature",
  "role": "admin",
  "phone": null,
  "address": null,
  "created_at": "2024-02-03T10:00:00Z",
  "updated_at": "2024-02-03T10:00:00Z"
}
```

### Étape 9: Tester l'application

1. Redémarrez le serveur de développement:
   ```bash
   npm run dev
   ```

2. Ouvrez http://localhost:3000

3. Connectez-vous avec:
   - Email: `admin@jnsignature.com`
   - Mot de passe: celui que vous avez créé

4. Vérifiez que vous pouvez:
   - ✅ Voir la page d'accueil
   - ✅ Voir les produits (si vous en avez créé)
   - ✅ Accéder à l'admin
   - ✅ Créer/modifier des produits

## ✅ C'est terminé !

Votre application est maintenant configurée avec Firebase ! 🎉

## 🔧 Dépannage

### Erreur: "Firebase: Error (auth/configuration-not-found)"
- Vérifiez que les variables d'environnement dans `.env.local` sont correctes
- Redémarrez le serveur de développement

### Erreur: "Missing or insufficient permissions"
- Vérifiez les règles Firestore
- Assurez-vous que l'utilisateur est authentifié

### L'admin ne fonctionne pas
- Vérifiez que le profil dans Firestore a `role: "admin"`
- Vérifiez que l'ID du document = UID de l'utilisateur

### Les produits ne s'affichent pas
- Vérifiez que vous avez créé des produits dans Firestore
- Vérifiez que `active: true` sur les produits
- Regardez la console du navigateur pour les erreurs

## 📚 Ressources

- [Documentation Firebase](https://firebase.google.com/docs)
- [MIGRATION_FIREBASE.md](MIGRATION_FIREBASE.md) - Guide complet
- [MIGRATION_COMPLETE.md](MIGRATION_COMPLETE.md) - Résumé de la migration

## 💡 Astuce

Pour un démarrage rapide, vous pouvez importer des données de test en utilisant l'interface Firestore ou un script d'import.
