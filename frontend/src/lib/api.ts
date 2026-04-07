const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function apiGet(path: string) {
  const res = await fetch(`${API_URL}${path}`);
  return res.json();
}

export async function apiPost(path: string, data: unknown) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('telal_token') : null;
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  return res;
}
