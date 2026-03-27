import React from 'react'
import { DecorationStyle, CustomDecoration } from '../lib/decorator'

interface StyleToggleProps {
  style: DecorationStyle
  setStyle: (style: DecorationStyle) => void
  custom: CustomDecoration
  setCustom: (custom: CustomDecoration) => void
}

export const StyleToggle: React.FC<StyleToggleProps> = ({
  style,
  setStyle,
  custom,
  setCustom
}) => {
  const styles: DecorationStyle[] = ['dark-vector', 'kaomoji', 'regal', 'chaos', 'minimal', 'custom']

  return (
    <div className="flex flex-col gap-4 w-full border-t border-zinc-900 pt-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          Decoration Style
        </label>
        <div className="flex flex-wrap gap-2">
          {styles.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-1 text-xs font-mono uppercase border rounded-md transition-all ${
                style === s
                  ? 'bg-zinc-200 text-black border-zinc-200'
                  : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {style === 'custom' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-zinc-600">Top Border</span>
            <input
              type="text"
              value={custom.topBorder}
              onChange={(e) => setCustom({ ...custom, topBorder: e.target.value })}
              className="bg-zinc-950 border border-zinc-800 rounded-md p-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-700"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-zinc-600">Bottom Border</span>
            <input
              type="text"
              value={custom.bottomBorder}
              onChange={(e) => setCustom({ ...custom, bottomBorder: e.target.value })}
              className="bg-zinc-950 border border-zinc-800 rounded-md p-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-700"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-zinc-600">Line Prefix</span>
            <input
              type="text"
              value={custom.linePrefix}
              onChange={(e) => setCustom({ ...custom, linePrefix: e.target.value })}
              className="bg-zinc-950 border border-zinc-800 rounded-md p-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-700"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase text-zinc-600">Line Suffix</span>
            <input
              type="text"
              value={custom.lineSuffix}
              onChange={(e) => setCustom({ ...custom, lineSuffix: e.target.value })}
              className="bg-zinc-950 border border-zinc-800 rounded-md p-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-700"
            />
          </div>
        </div>
      )}
    </div>
  )
}
