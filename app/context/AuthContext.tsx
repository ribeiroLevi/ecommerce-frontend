"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthUser, getMe, logout as logoutRequest } from "../services/api";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  /*
   * Atualiza manualmente a sessão.
   *
   * Usado principalmente depois do login para buscar
   * novamente os dados do usuário através do /auth/me.
   */
  async function refreshSession() {
    setLoading(true);

    try {
      const authenticatedUser = await getMe();

      setUser(authenticatedUser);
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  /*
   * Encerra a sessão no backend e remove o usuário
   * do estado global da aplicação.
   */
  async function logout() {
    try {
      await logoutRequest();

      setUser(null);
    } catch (error) {
      console.error("Erro ao encerrar sessão:", error);

      throw error;
    }
  }

  /*
   * Verifica se já existe uma sessão quando
   * a aplicação é carregada.
   */
  useEffect(() => {
    let active = true;

    getMe()
      .then((authenticatedUser) => {
        if (!active) return;

        setUser(authenticatedUser);
      })
      .catch((error) => {
        if (!active) return;

        console.error("Erro ao verificar sessão:", error);

        setUser(null);
      })
      .finally(() => {
        if (!active) return;

        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}
