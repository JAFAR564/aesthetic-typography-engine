import { useState, useMemo } from 'react'
import { TextInput } from './components/TextInput'
import { StyleToggle } from './components/StyleToggle'
import { OutputDisplay } from './components/OutputDisplay'
import { DecorationStyle, CustomDecoration, decorate } from './lib/decorator'
import { enhanceText } from './lib/api'
import { TONE_PRESETS } from './lib/toneTemplates'
import { Sparkles } from 'lucide-react'

function App() {
  const [text, setText] = useState('')
  const [tone, setTone] = useState(TONE_PRESETS[0].id)
  const [style, setStyle] = useState<DecorationStyle>('dark-vector')
  const [custom, setCustom] = useState<CustomDecoration>({
    topBorder: '=-=-=-=-=-=-=-=-=-=-=-=',
    bottomBorder: '=-=-=-=-=-=-=-=-=-=-=-=',
    linePrefix: '> ',
    lineSuffix: ' <'
  })
  
  const [aiResult, setAiResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEnhance = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await enhanceText(text, tone)
      setAiResult(result)
    } catch (err: any) {
      setError(err.message || 'Failed to enhance text. Is the backend running?')
    } finally {
      setIsLoading(false)
    }
  }

  const decoratedOutput = useMemo(() => {
    if (!aiResult) return ''
    return decorate(aiResult, style, custom)
  }, [aiResult, style, custom])

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-3xl mb-12 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-white" size={32} />
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Aesthetic Engine</h1>
        </div>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">
          AI Tone Enhancement & Unicode Decoration
        </p>
      </header>

      <main className="w-full max-w-3xl flex flex-col gap-8">
        <section className="bg-zinc-950 border border-zinc-900 rounded-md p-6 shadow-2xl">
          <TextInput
            text={text}
            setText={setText}
            tone={tone}
            setTone={setTone}
            onSubmit={handleEnhance}
            isLoading={isLoading}
          />
        </section>

        <section className="bg-zinc-950 border border-zinc-900 rounded-md p-6 shadow-2xl flex flex-col gap-6">
          <StyleToggle
            style={style}
            setStyle={setStyle}
            custom={custom}
            setCustom={setCustom}
          />
          
          <OutputDisplay
            output={decoratedOutput}
            error={error}
            isLoading={isLoading}
          />
        </section>
      </main>

      <footer className="mt-16 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
        Aesthetic Typography Engine — v1.0.0 — March 2026
      </footer>
    </div>
  )
}

export default App

