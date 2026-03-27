// API_URL should match the backend server port (default 8000)
// Using a relative path for production (Vercel) and a fallback for local dev
const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.PROD ? "/api" : "http://localhost:8000");

export async function enhanceText(text: string, tone: string): Promise<string> {
  try {
    const res = await fetch(`${API_URL}/enhance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, tone }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: "Unknown API error" }));
      throw new Error(errorData.detail || `API error: ${res.status}`);
    }

    const data = await res.json();
    return data.result as string;
  } catch (err) {
    console.error("Failed to enhance text:", err);
    throw err;
  }
}
