import React, { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

interface OutputDisplayProps {
  output: string
  error: string | null
  isLoading: boolean
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  output,
  error,
  isLoading
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (error) {
    return (
      <div className="w-full mt-8 p-4 bg-red-950/20 border border-red-900 rounded-md text-red-400 font-mono text-sm">
        <p className="flex items-center gap-2">
          <span className="font-bold uppercase">[Error]</span> {error}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full mt-8 flex flex-col gap-2">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <Terminal size={12} /> Decorated Output
        </span>
        {output && (
          <button
            onClick={copyToClipboard}
            className="text-xs font-mono uppercase text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            {copied ? (
              <>
                <Check size={12} className="text-green-500" /> Copied
              </>
            ) : (
              <>
                <Copy size={12} /> Copy
              </>
            )}
          </button>
        )}
      </div>

      <div className="relative group">
        <pre className={`w-full min-h-[120px] bg-zinc-950 border border-zinc-800 rounded-md p-6 font-mono text-zinc-200 text-sm overflow-x-auto selection:bg-zinc-700 transition-all ${
          isLoading ? 'opacity-50 animate-pulse' : 'opacity-100'
        }`}>
          {isLoading ? 'Synthesizing...' : output || 'Output will appear here...'}
        </pre>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
