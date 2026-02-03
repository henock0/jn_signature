// context/AuthContext.tsx - Version Firebase
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db, Profile } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Compte admin par défaut pour le développement
const DEFAULT_ADMIN = {
  id: 'admin-default-id',
  email: 'admin@jnsignature.com',
  role: 'admin' as const,
  full_name: 'Administrateur JN Signature'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si on est en mode développement (pas de Firebase configuré)
  const isDevMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
                     process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'votre_api_key_firebase';

  useEffect(() => {
    if (isDevMode) {
      // Mode développement : simuler une session admin
      const simulatedUser = {
        uid: DEFAULT_ADMIN.id,
        email: DEFAULT_ADMIN.email,
        displayName: DEFAULT_ADMIN.full_name
      } as User;

      const simulatedProfile = {
        id: DEFAULT_ADMIN.id,
        email: DEFAULT_ADMIN.email,
        full_name: DEFAULT_ADMIN.full_name,
        role: DEFAULT_ADMIN.role,
        phone: null,
        address: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as Profile;

      setUser(simulatedUser);
      setProfile(simulatedProfile);
      setIsLoading(false);
    } else {
      // Mode production : utiliser Firebase Auth
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        
        if (firebaseUser) {
          await fetchProfile(firebaseUser.uid);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [isDevMode]);

  const fetchProfile = async (userId: string) => {
    try {
      const profileDoc = await getDoc(doc(db, 'profiles', userId));
      
      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as Profile);
      } else {
        console.log('Profile not found for user:', userId);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isDevMode) {
      // Mode développement : authentification simulée
      if (email === DEFAULT_ADMIN.email && password === 'admin123') {
        const simulatedUser = {
          uid: DEFAULT_ADMIN.id,
          email: DEFAULT_ADMIN.email,
          displayName: DEFAULT_ADMIN.full_name
        } as User;

        const simulatedProfile = {
          id: DEFAULT_ADMIN.id,
          email: DEFAULT_ADMIN.email,
          full_name: DEFAULT_ADMIN.full_name,
          role: DEFAULT_ADMIN.role,
          phone: null,
          address: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Profile;

        setUser(simulatedUser);
        setProfile(simulatedProfile);
        return { error: null };
      } else {
        return { error: { message: 'Identifiants incorrects' } };
      }
    } else {
      // Mode production : utiliser Firebase Auth
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return { error: null };
      } catch (error: any) {
        console.error('Error signing in:', error);
        return { error: { message: error.message } };
      }
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (isDevMode) {
      return { error: { message: 'Inscription désactivée en mode développement' } };
    }

    try {
      // Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Mettre à jour le displayName
      await updateProfile(user, {
        displayName: fullName
      });

      // Créer le profil dans Firestore
      const newProfile: Profile = {
        id: user.uid,
        email: user.email!,
        full_name: fullName,
        role: 'client',
        phone: null,
        address: null,
        created_at: Timestamp.now().toDate().toISOString(),
        updated_at: Timestamp.now().toDate().toISOString()
      };

      await setDoc(doc(db, 'profiles', user.uid), newProfile);

      return { error: null };
    } catch (error: any) {
      console.error('Error signing up:', error);
      return { error: { message: error.message } };
    }
  };

  const signOut = async () => {
    if (isDevMode) {
      // Mode développement : déconnexion simulée
      setUser(null);
      setProfile(null);
    } else {
      // Mode production : utiliser Firebase Auth
      try {
        await firebaseSignOut(auth);
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
  };

  const isAdmin = profile?.role === 'admin' || (isDevMode && user?.email === DEFAULT_ADMIN.email);

  const value = {
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
