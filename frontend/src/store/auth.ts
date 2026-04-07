import { create } from "zustand";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getToken,
  getUser,
  fetchCurrentUser,
  type AuthUser,
} from "@/lib/auth-client";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<boolean>;
  logout: () => void;
  loadUser: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    const result = await apiLogin(email, password);
    if (result.success && result.user) {
      set({ user: result.user, token: getToken(), isLoading: false, error: null });
      return true;
    }
    set({ isLoading: false, error: result.message || "Login failed" });
    return false;
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    const result = await apiRegister(data);
    if (result.success && result.user) {
      set({ user: result.user, token: getToken(), isLoading: false, error: null });
      return true;
    }
    set({ isLoading: false, error: result.message || "Registration failed" });
    return false;
  },

  logout: () => {
    set({ user: null, token: null, error: null });
    apiLogout();
  },

  loadUser: () => {
    const token = getToken();
    const user = getUser();
    if (token && user) {
      set({ user, token });
      // Verify token is still valid in background
      fetchCurrentUser().then((freshUser) => {
        if (freshUser) {
          set({ user: freshUser });
        } else {
          set({ user: null, token: null });
        }
      });
    }
  },

  clearError: () => set({ error: null }),
}));
