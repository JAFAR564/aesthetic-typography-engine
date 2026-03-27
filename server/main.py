from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API client
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment")

client = genai.Client(api_key=api_key)

app = FastAPI(title="Aesthetic Typography Engine API")

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EnhanceRequest(BaseModel):
    text: str
    tone: str

# Tone rules based on the original blueprint
TONE_RULES = {
    "Regal Arrogance": "Speak with deliberate slowness. Every word is intentional. Playful superiority with chilling seriousness underneath. Never rush.",
    "Minimalist": "Strip every word that does not earn its place. Short sentences. Cold precision. No flourish.",
    "Chaotic": "Interrupt yourself. Use em-dashes. Contradict. Energy spills everywhere — controlled, barely.",
    "Professional": "Clear. Authoritative. Warm but firm. No slang. No ambiguity.",
    "Dark Narrator": "Third-person omniscient. Slow dread. Beautiful but heavy prose. Every sentence foreshadows.",
    "Soft Power": "Polite but immovable. Kindness as a weapon. The reader complies without knowing why.",
}

PROMPT_TEMPLATE = """
You are an elite tone rewriter for text-based roleplay and content creation.

Rewrite the following text to match this tone: "{tone}"

Tone rules:
{tone_rules}

Global rules:
- Do NOT invent new events or characters.
- Do NOT puppeteer other characters.
- Return ONLY the rewritten text. No preamble, no explanation, no quotes around the output.

Text to rewrite:
{text}
""".strip()

@app.post("/api/enhance")
@app.post("/enhance")
async def enhance(req: EnhanceRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text is required.")
    
    tone_rules = TONE_RULES.get(req.tone, "Match the requested tone as closely as possible.")
    prompt = PROMPT_TEMPLATE.format(tone=req.tone, tone_rules=tone_rules, text=req.text)
    
    try:
        # Using the latest Gemini 3.1 Flash-Lite model (as of March 2026)
        # Optimized with smaller output token limit and high-speed config
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite-preview",
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                max_output_tokens=800,
                temperature=0.7,
            )
        )
        
        if not response.text:
            raise HTTPException(status_code=500, detail="AI returned empty response")
            
        return {"result": response.text}
    except Exception as e:
        # Logging error locally (user can see it in terminal)
        print(f"Error calling Gemini: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
@app.get("/health")
async def health():
    return {"status": "ok"}
