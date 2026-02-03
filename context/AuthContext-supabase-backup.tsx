// context/AuthContext.tsx - Version avec authentification simulée
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si on est en mode développement (pas de Supabase configuré)
  const isDevMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'votre_url_supabase_ici';

  useEffect(() => {
    if (isDevMode) {
      // Mode développement : simuler une session admin
      const simulatedUser = {
        id: DEFAULT_ADMIN.id,
        email: DEFAULT_ADMIN.email,
        user_metadata: { full_name: DEFAULT_ADMIN.full_name }
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
      // Mode production : utiliser Supabase
      const getSession = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchProfile(session.user.id);
          }
        } catch (error) {
          console.error('Error getting session:', error);
        } finally {
          setIsLoading(false);
        }
      };

      getSession();

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }
          
          setIsLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    }
  }, [isDevMode]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isDevMode) {
      // Mode développement : authentification simulée
      if (email === DEFAULT_ADMIN.email && password === 'admin123') {
        const simulatedUser = {
          id: DEFAULT_ADMIN.id,
          email: DEFAULT_ADMIN.email,
          user_metadata: { full_name: DEFAULT_ADMIN.full_name }
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
      // Mode production : utiliser Supabase
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { error };
      } catch (error) {
        return { error };
      }
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    if (isDevMode) {
      // Mode développement : déconnexion simulée
      setUser(null);
      setProfile(null);
      setSession(null);
    } else {
      // Mode production : utiliser Supabase
      try {
        await supabase.auth.signOut();
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
  };

  const isAdmin = profile?.role === 'admin' || (isDevMode && user?.email === DEFAULT_ADMIN.email);

  const value = {
    user,
    profile,
    session,
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