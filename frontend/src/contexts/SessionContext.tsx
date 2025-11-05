// src/contexts/SessionContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { getOrCreateUserProfile } from "../services/auth";
import type { User } from "../types/user";

interface SessionContextType {
  user: User | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType>({ user: null, loading: true });

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const u = await getOrCreateUserProfile();
          setUser(u);
        }
      } catch (err) {
        console.error("Session init failed:", err);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const u = await getOrCreateUserProfile();
        setUser(u);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <SessionContext.Provider value={{ user, loading }}>{children}</SessionContext.Provider>;
};