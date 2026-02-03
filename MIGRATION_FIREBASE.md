# Migration de Supabase vers Firebase

## Résumé de la migration

L'application JN Signature a été migrée de Supabase vers Firebase pour bénéficier des services Firebase (Authentication, Firestore, Storage).

## Changements effectués

### 1. Installation de Firebase
```bash
npm install firebase
npm uninstall @supabase/supabase-js
```

### 2. Configuration Firebase

Fichier créé: `lib/firebase.ts`
- Initialisation de Firebase App
- Configuration de Firebase Auth
- Configuration de Firestore
- Configuration de Firebase Storage
- Export des types TypeScript

### 3. Variables d'environnement

Le fichier `.env.local` a été mis à jour:

**Anciennes variables (Supabase):**
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

**Nouvelles variables (Firebase):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_projet_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
```

### 4. Fichiers migrés

#### APIs
- `lib/api/products.ts` - Migration vers Firestore
- `lib/api/orders.ts` - Migration vers Firestore
- `lib/api/notifications.ts` - Migration vers Firestore

#### Contextes
- `context/AuthContext.tsx` - Migration vers Firebase Auth

#### Composants
- Tous les imports mis à jour de `@/lib/supabase` vers `@/lib/firebase`

### 5. Fichiers sauvegardés

Les fichiers originaux Supabase ont été sauvegardés avec le suffixe `-supabase-backup`:
- `lib/supabase.ts` (conservé pour référence)
- `context/AuthContext-supabase-backup.tsx`
- `lib/api/products-supabase-backup.ts`
- `lib/api/orders-supabase-backup.ts`
- `lib/api/notifications-supabase-backup.ts`

## Configuration Firebase requise

### 1. Créer un projet Firebase
1. Aller sur https://console.firebase.google.com/
2. Créer un nouveau projet
3. Activer Authentication (Email/Password)
4. Créer une base de données Firestore
5. Configurer Storage si nécessaire

### 2. Structure Firestore

Collections à créer:

#### `profiles`
```javascript
{
  id: string,
  email: string,
  full_name: string,
  role: 'client' | 'admin',
  phone: string,
  address: object,
  created_at: timestamp,
  updated_at: timestamp
}
```

#### `categories`
```javascript
{
  id: string,
  name: string,
  slug: string,
  description: string,
  image_url: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

#### `products`
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  original_price: number,
  category_id: string,
  sub_category: string,
  image_url: string,
  stock: number,
  sizes: array,
  colors: array,
  featured: boolean,
  active: boolean,
  created_at: timestamp,
  updated_at: timestamp
}
```

#### `orders`
```javascript
{
  id: string,
  user_id: string,
  customer_name: string,
  customer_email: string,
  customer_phone: string,
  customer_address: object,
  status: string,
  payment_status: string,
  payment_method: string,
  total_amount: number,
  notes: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

#### `order_items`
```javascript
{
  id: string,
  order_id: string,
  product_id: string,
  quantity: number,
  unit_price: number,
  selected_size: string,
  selected_color: string,
  created_at: timestamp
}
```

#### `notifications`
```javascript
{
  id: string,
  user_id: string,
  type: 'order' | 'product' | 'system' | 'promotion',
  title: string,
  message: string,
  is_read: boolean,
  link: string,
  created_at: timestamp
}
```

### 3. Règles Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Profiles
    match /profiles/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Categories (lecture publique, écriture admin)
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Products (lecture publique, écriture admin)
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders
    match /orders/{orderId} {
      allow read: if request.auth != null && (resource.data.user_id == request.auth.uid || get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Order Items
    match /order_items/{itemId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Notifications
    match /notifications/{notificationId} {
      allow read: if request.auth != null && (resource.data.user_id == request.auth.uid || get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && get(/databases/$(database)/documents/profiles/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 4. Règles Storage

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /categories/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Mode développement

L'application détecte automatiquement si Firebase est configuré:
- Si les variables d'environnement Firebase ne sont pas configurées, l'app fonctionne en mode développement
- En mode dev, un compte admin simulé est utilisé:
  - Email: `admin@jnsignature.com`
  - Mot de passe: `admin123`

## Migration des données

Pour migrer les données existantes de Supabase vers Firebase:

1. Exporter les données depuis Supabase (SQL ou API)
2. Formater les données pour Firestore
3. Utiliser le script d'import Firebase ou l'interface Firebase Console
4. Vérifier l'intégrité des données

## Notes importantes

1. **Timestamps**: Firebase Firestore utilise des Timestamps au lieu de strings ISO pour les dates
2. **Relations**: Les relations entre collections se font via des IDs référencés (pas de jointures SQL)
3. **Requêtes**: Les requêtes Firestore sont différentes de SQL (utiliser `where`, `orderBy`, etc.)
4. **Sécurité**: Configurer les règles Firestore pour protéger les données

## Prochaines étapes

1. Configurer votre projet Firebase
2. Mettre à jour les variables d'environnement
3. Créer les collections Firestore
4. Configurer les règles de sécurité
5. Migrer les données existantes
6. Tester l'application

## Support

Pour toute question sur la migration, consultez:
- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation Firestore](https://firebase.google.com/docs/firestore)
- [Documentation Firebase Auth](https://firebase.google.com/docs/auth)
