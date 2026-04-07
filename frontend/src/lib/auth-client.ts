const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: AuthUser;
  };
  message?: string;
}

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("auth_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

function storeAuth(token: string, user: AuthUser) {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
  setCookie("auth_token", token);
}

function clearAuth() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  deleteCookie("auth_token");
}

export async function login(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; message?: string }> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json: AuthResponse = await res.json();

  if (!res.ok || !json.success || !json.data) {
    return { success: false, message: json.message || "Login failed" };
  }

  storeAuth(json.data.token, json.data.user);
  return { success: true, user: json.data.user };
}

export async function register(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ success: boolean; user?: AuthUser; message?: string }> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json: AuthResponse = await res.json();

  if (!res.ok || !json.success || !json.data) {
    return { success: false, message: json.message || "Registration failed" };
  }

  storeAuth(json.data.token, json.data.user);
  return { success: true, user: json.data.user };
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      clearAuth();
      return null;
    }

    const json = await res.json();
    if (json.success && json.data) {
      const user = json.data as AuthUser;
      localStorage.setItem("auth_user", JSON.stringify(user));
      return user;
    }

    clearAuth();
    return null;
  } catch {
    return null;
  }
}

export function logout() {
  clearAuth();
  window.location.href = "/login";
}
