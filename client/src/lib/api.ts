// API_URL should match the backend server port (default 8000)
// Using an environment variable or hardcoded default for local development
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

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
