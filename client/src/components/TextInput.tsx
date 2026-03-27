import React from 'react'
import { TONE_PRESETS } from '../lib/toneTemplates'

interface TextInputProps {
  text: string
  setText: (text: string) => void
  tone: string
  setTone: (tone: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export const TextInput: React.FC<TextInputProps> = ({
  text,
  setText,
  tone,
  setTone,
  onSubmit,
  isLoading
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <label htmlFor="text-input" className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          Source Text
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to enhance..."
          className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-md p-4 text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors font-sans resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex flex-col gap-2 flex-grow">
          <label htmlFor="tone-select" className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Tone Preset
          </label>
          <select
            id="tone-select"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors"
          >
            {TONE_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} — {p.description}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !text.trim()}
          className="px-8 py-2 bg-white text-black font-bold rounded-md hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all uppercase tracking-tighter"
        >
          {isLoading ? 'Enhancing...' : 'Enhance'}
        </button>
      </div>
    </div>
  )
}
